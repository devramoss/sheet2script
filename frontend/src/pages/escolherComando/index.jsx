import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Typography } from "@mui/material";
import { Field, Formik, Form } from "formik";
import Header from "../../components/Header/index.jsx";
import "./style.css";  // Certifique-se de que o CSS seja importado corretamente

const EscolherComando = () => {
    // useNavigate para navegar da página comandos para a página conversor
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Container className="container-comando">
                <Typography variant="h2" className="titulo">
                    SELECIONE O<br /> COMANDO SQL DESEJADO:
                </Typography>
                <Formik
                    initialValues={{
                        comando: "insert" // Valor padrão para select
                    }}
                    onSubmit={(values) => {
                        // Passando qual comando SQL foi selecionado para a página de conversão
                        navigate("/conversor", { state: { comando: values.comando } });

                        // Exibindo o tipo de comando selecionado no console
                        console.log("Comando selecionado:", values.comando);
                    }}
                >
                    {(formik) => (
                        <Form onSubmit={formik.handleSubmit}>
                            <Field as="select" name="comando" id="inputComando" className="input-comando">
                                <option value="insert">
                                    INSERT
                                </option>
                                <option value="update">
                                    UPDATE
                                </option>
                                <option value="delete">
                                    DELETE
                                </option>
                            </Field>
                            <Button id="botaoGerar" type="submit" className="botao-enviar">
                                Enviar
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </>
    );
};

export default EscolherComando;
