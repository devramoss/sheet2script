import React from "react";
import Header from "../../components/Header/index.jsx";
import "./style.css";
import { Container, Button, Box, Typography} from "@mui/material";
import { Field, Formik, Form } from "formik";

const EscolherComando = () => {
    return (
        <>
            <Header />

                <Container>
                    <Typography variant="h2">
                        SELECIONE O<br/> COMANDO SQL DESEJADO:
                    </Typography >
                    <Formik initialValues={{
                        comando: null
                    }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit}>
                                <Field as="select" name="comando" required type="select" id="inputComando">
                                    <option value="insert">INSERT</option>
                                    <option value="update">UPDATE</option>
                                    <option value="delete">DELETE</option>
                                </Field>
                                <Button id="botaoGerar" type="submit">
                                    Enviar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>

        </>
    );          
}

export default EscolherComando;