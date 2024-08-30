import React from "react";
import Header from "../../components/Header/index.jsx";
import "./style.css";
import { Container, Button, Box, Typography} from "@mui/material";
import { Field, Formik, Form } from "formik";

const conversor = () => {
    return (
        <>
            <Header />
            <Box>
                <Container>
                    <Typography variant="h2">
                        Converta facilmente sua<br />planilha em código SQL
                    </Typography >
                    <Formik initialValues={{
                        arquivo: null
                    }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                    >
                        {(formik) => (
                            <Form onSubmit={formik.handleSubmit}>
                                <Field name="arquivo" required type="file" id="inputFile" accept=".xlsx" />
                                <Button id="botaoGerar">
                                    Enviar
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Box>
        </>
    );
}

export default conversor;