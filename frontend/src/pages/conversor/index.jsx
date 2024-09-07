import React, { useState} from 'react'; 
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Header from '../../components/Header/index.jsx';
import { Container, Button, Box, Typography, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import "./style.css";


const Conversor = () => {
    const [sqlCommands, setSqlCommands] = useState([]);
    const [colunas, setColunas] = useState([]);
    const [fileData, setFileData] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);
    const location = useLocation();
    const comandoSelecionado = location.state?.comando || "insert";

    const handleFileUpload = (file, tableName) => {
        const reader = new FileReader(); 

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result); 
            const workbook = XLSX.read(data, { type: 'array' }); // Lê o arquivo e converte para um objeto do tipo workbook
            const sheetName = workbook.SheetNames[0]; // Pega o nome da primeira aba
            const worksheet = workbook.Sheets[sheetName]; // Pega a primeira aba(planilha)
            const json = XLSX.utils.sheet_to_json(worksheet); // Converte a planilha em um objeto JSON

            if (json.length > 0) {
                const colunasDetectadas = Object.keys(json[0]); // Pega as chaves do primeiro registro
    
                setColunas(colunasDetectadas);
                setFileData(json);
                setFileUploaded(true);

                let commands = [];

                if (comandoSelecionado === "insert") {
                    commands = json.map(row => {
                        // Mapeia os valores de cada coluna e adiciona aspas simples
                        const valores = colunasDetectadas.map(coluna => `'${row[coluna] || ''}'`);
                        
                        return `INSERT INTO ${tableName} (${colunasDetectadas.join(', ')}) VALUES (${valores.join(', ')});`;
                    });
                }
                else if (comandoSelecionado === "update") {
                    commands = json.map(row => {
                        // Mapeia as colunas e valores para o comando UPDATE
                        const setClause = colunasDetectadas.map(coluna => `${coluna} = '${row[coluna] || ''}'`).join(', ');
                        const idValue = row.id || row.ID || ''; // Verifica se existe uma coluna chamada 'id' ou 'ID' no registro

                        if (idValue) {
                            return `UPDATE ${tableName} SET ${setClause} WHERE id = '${idValue}';`;
                        }
                        else {
                            console.error("ID vazio ou inválido para o registro:", row);
                            return null;
                        }
                    }).filter(command => command !== null);
                }
                setSqlCommands(commands);
            } else {
                setSqlCommands([]);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <>
            <Header />
            <Box>
                <Container className="container-conversor">
                    <Typography variant="h2" className="titulo">
                        Converta facilmente sua<br />planilha em código SQL
                    </Typography>
                    <Formik
                        initialValues={{
                            arquivo: null,
                            tabela: '', // Adicionando campo para o nome da tabela
                            colunaDelete: ''
                        }}
                        onSubmit={(values) => {
                            if (values.arquivo && values.tabela) {
                                handleFileUpload(values.arquivo, values.tabela); // Passa o nome da tabela
                            }
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit}>
                                <TextField
                                    id="nomeTabela"
                                    name="tabela"
                                    label="Nome da Tabela"
                                    value={formik.values.tabela}
                                    onChange={formik.handleChange}
                                    required
                                    sx={{ mb: 2 }}
                                />
                                <input
                                    type="file"
                                    id="inputFile"
                                    name="arquivo"
                                    accept=".xlsx"
                                    onChange={(event) => {
                                        formik.setFieldValue("arquivo", event.currentTarget.files[0]);
                                    }}
                                    className="input-arquivo"
                                    required
                                />
                                <Button type="submit" id="botaoGerar" className="botao-enviar">
                                    Carregar Arquivo
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    {fileUploaded && comandoSelecionado === "delete" && (
                        <Formik
                            initialValues={{
                                colunaDelete: ''
                            }}
                            onSubmit={(values) => {
                                const selectedColumn = values.colunaDelete;
                                if (selectedColumn) {
                                    const deleteCommands = fileData.map(row => {
                                        const valor = row[selectedColumn];
                                        if (valor) {
                                            return `DELETE FROM ${formik.values.tabela} WHERE ${selectedColumn} = '${valor}';`;
                                        } else {
                                            console.error(`Valor vazio ou inválido na coluna ${selectedColumn} para o registro:`, row);
                                            return null;
                                        }
                                    }).filter(command => command !== null);
                                    setSqlCommands(deleteCommands);
                                }
                            }}
                        >
                            {(formik) => (
                                <Form onSubmit={formik.handleSubmit}>
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                        Selecione a coluna para o critério de exclusão:
                                    </Typography>
                                    <Field as="select" name="colunaDelete" required>
                                        <option value="">Selecione a coluna</option>
                                        {colunas.map((coluna) => (
                                            <option key={coluna} value={coluna}>
                                                {coluna}
                                            </option>
                                        ))}
                                    </Field>
                                    <Button type="submit" id="botaoGerar" className="botao-enviar" sx={{ mt: 2 }}>
                                        Gerar Comandos DELETE
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    )}

                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6">Comandos SQL gerados:</Typography>
                        {sqlCommands.length > 0 ? (
                            <TextField
                                fullWidth
                                multiline
                                rows={10}
                                value={sqlCommands.join('\n')}
                                variant="outlined"
                                InputProps={{ readOnly: true }}
                                className="campo-sql"
                                sx={{ mt: 2 }}
                            />
                        ) : (
                            <Typography variant="body1">Nenhum comando SQL gerado.</Typography>
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Conversor;
