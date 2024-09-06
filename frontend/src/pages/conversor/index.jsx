import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Header from '../../components/Header/index.jsx';
import "./style.css";
import { Container, Button, Box, Typography, TextField } from "@mui/material";
import { Formik, Form } from "formik";

const Conversor = () => {
    const [sqlCommands, setSqlCommands] = useState([]);

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0]; // Pega a primeira planilha
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);

            console.log("Dados da planilha (JSON):", json);

            if (json.length > 0) {
                // Obtém os nomes das colunas
                const colunas = Object.keys(json[0]);
                console.log("Colunas detectadas:", colunas);

                // Gera os comandos SQL
                const commands = json.map(row => {
                    const valores = colunas.map(coluna => {
                        return `'${row[coluna] || ''}'`;
                    });

                    return `INSERT INTO tabela (${colunas.join(', ')}) VALUES (${valores.join(', ')});`;
                });

                console.log("Comandos SQL gerados:", commands);
                setSqlCommands(commands);
            } else {
                console.log("A planilha está vazia.");
                setSqlCommands([]);
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <>
            <Header />
            <Box>
                <Container>
                    <Typography variant="h2">
                        Converta facilmente sua<br />planilha em código SQL
                    </Typography>
                    <Formik
                        initialValues={{
                            arquivo: null
                        }}
                        onSubmit={(values) => {
                            if (values.arquivo) {
                                handleFileUpload(values.arquivo);
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
                                    required
                                />
                                <Button type="submit" id="botaoGerar">
                                    Gerar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    {/* Exibe os comandos SQL gerados */}
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
