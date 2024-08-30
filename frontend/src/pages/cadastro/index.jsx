import React from "react";
import Header from "../../components/Header/index.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import "./style.css";
import * as Yup from "yup";

const schema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório").min(2, "Digite seu nome completo"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    senha: Yup.string().required("Campo obrigatório").min(6, "A senha deve ter no mínimo 6 caracteres").max(8, "A senha deve ter no máximo 8 caracteres"),
});

const Cadastro = () => {
    return (
        <>
            <Header />
            <Container>
                <Formik
                    initialValues={{
                        nome: '',
                        email: '',
                        senha: '',
                    }}
                    validationSchema={schema}
                    onSubmit={(values) => {
                        console.log(values)
                    }}
                >
                    {formik => (
                        <Form onSubmit={formik.handleSubmit}>
                            <Typography id="titulo">
                                Criar uma nova conta
                            </Typography>

                            <a href="#" id="login">
                                Entre para continuar
                            </a>

                            <Box>
                                <Field name="nome" type="text" as={TextField} label="Nome" className="inputs" />
                                <ErrorMessage component="span" name="nome" className="error" />
                            </Box>
                            <Box>
                                <Field name="email" type="email" as={TextField} label="E-mail" className="inputs" />
                                <ErrorMessage component="span" name="email" className="error" />
                            </Box>
                            <Box>
                                <Field name="senha" type="password" as={TextField} label="Senha" className="inputs" />
                                <ErrorMessage component="span" name="senha" className="error" />
                            </Box>
                            <Button type="submit" id="botaoEnviar">Cadastrar</Button>
                        </Form>
                    )}

                </Formik>
            </Container>
        </>
    )
}

export default Cadastro