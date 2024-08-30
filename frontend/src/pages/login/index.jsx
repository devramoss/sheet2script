import React from "react";
import Header from "../../components/Header/index.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import "./style.css";
import * as Yup from "yup";

const schema = Yup.object().shape({
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    senha: Yup.string().required("Campo obrigatório"),
});

const Login = () => {
    return (
        <>
            <Header />
            <Container>
            <Formik initialValues={{
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
                            Entre na sua conta
                        </Typography>

                        <a href="#" id="cadastro">
                            Crie uma nova conta
                        </a>

                        <Box>
                            <Field name="email" type="email" as={TextField} label="E-mail" className="inputs" />
                            <ErrorMessage component="span" name="email" className="error" />
                        </Box>
                        <Box>
                            <Field name="senha" type="password" as={TextField} label="Senha" className="inputs" />
                            <ErrorMessage component="span" name="senha" className="error" />
                        </Box>
                        <Button type="submit" id="botaoEnviar">Entrar</Button>
                    </Form>)}
            </Formik>
            </Container>
        </>
    )
}

export default Login;