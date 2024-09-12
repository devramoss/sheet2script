import React, { useState } from 'react'; 
import { useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Header from '../../components/Header/index.jsx';
import { Container, Button, Box, Typography, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import axios from 'axios'; // Importa axios para fazer solicitações HTTP
import "./style.css";

const Conversor = () => {
    const [sqlCommands, setSqlCommands] = useState([]);
    const [colunas, setColunas] = useState([]);
    const [fileData, setFileData] = useState([]);
    const [fileUploaded, setFileUploaded] = useState(false);
    const location = useLocation();
    const comandoSelecionado = location.state?.comando || "insert";

    const handleFileUpload = async (file, tableName) => {
        if (!file) {
            console.error("Nenhum arquivo selecionado.");
            return;
        }
    
        const reader = new FileReader();
    
        reader.onload = async (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
    
            if (json.length > 0) {
                const colunasDetectadas = Object.keys(json[0]);
                setColunas(colunasDetectadas);
                setFileData(json);
                setFileUploaded(true);
    
                let commands = [];
    
                if (comandoSelecionado === "insert") {
                    commands = json.map(row => {
                        const valores = colunasDetectadas.map(coluna => `'${row[coluna] || ''}'`);
                        return `INSERT INTO ${tableName} (${colunasDetectadas.join(', ')}) VALUES (${valores.join(', ')});`;
                    });
                } else if (comandoSelecionado === "update") {
                    commands = json.map(row => {
                        const setClause = colunasDetectadas.map(coluna => `${coluna} = '${row[coluna] || ''}'`).join(', ');
                        const idValue = row.id || row.ID || '';
                        if (idValue) {
                            return `UPDATE ${tableName} SET ${setClause} WHERE id = '${idValue}';`;
                        } else {
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
    
        // Enviar dados para o servidor
        try {
            const formData = new FormData();
            const token = 'jsdajhhdajshdahdasda8723119091874@@@@'
            formData.append('arquivo', file); // Enviar o arquivo
            formData.append('tableName', tableName); // Enviar o nome da tabela
            
            

            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
                },
            });
    
            console.log('Resposta do servidor:', response.data);
        } catch (error) {
            console.error('Erro ao enviar dados para o servidor:', error);
        }
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
                            tabela: '',
                            colunaDelete: ''
                        }}
                        onSubmit={(values) => {
                            if (values.arquivo && values.tabela) {
                                handleFileUpload(values.arquivo, values.tabela);
                            }
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit}>
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
                                <TextField
                                    id="nomeTabela"
                                    name="tabela"
                                    label="Nome da Tabela"
                                    value={formik.values.tabela}
                                    onChange={formik.handleChange}
                                    required
                                    sx={{ marginBottom: 2, marginTop: 8, width: '460px', marginLeft: '30%'}}
                                />
                                <Button type="submit" variant="contained" color="primary">
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
                                    <Button type="submit" variant="contained" color="primary">
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
