import React from "react";
import Header from "../../components/Header/index.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import "./style.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    senha: Yup.string().required("Campo obrigatório"),
});

const Login = () => {
    const navigate = useNavigate(); // Hook para redirecionar o usuário após o login

    return (
        <>
            <Header />
            <Container>
            <Formik initialValues={{
                email: '',
                senha: '',
            }}
                validationSchema={schema}
                onSubmit={async ({ email, senha }) => {
                    try {
                        const response = await fetch('http://localhost:3000/login', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email, senha }),
                        });
                
                        const data = await response.json();
                
                        if (response.ok) {
                            console.log("Login bem-sucedido!", data.token);
                            localStorage.setItem('token', data.token); // Armazena o token no localStorage
                            navigate('/conversor'); 
                        } else {
                            console.error("Erro ao realizar login:", data.mensagem);
                        }
                    } catch (error) {
                        console.error("Erro na requisição:", error);
                    }
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