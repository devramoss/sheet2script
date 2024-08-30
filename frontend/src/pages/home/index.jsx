import React from "react";
import Header from "../../components/Header/index.jsx";
import "./style.css";
import {Container, Button, Box, Typography} from "@mui/material";
import background from "../../assets/background_home.jpg";

const Home = () => {
    return (
        <>
            <Header />
            <Box>
                <Box>
                    <Typography variant="h2">GERE SCRIPTS</Typography >
                    <Typography variant="h2" id="sql">SQL</Typography>
                    <Typography variant="h2">EM SEGUNDOS</Typography >
                </Box>
                <Button type="submit" id="botaoGerar">Gerar SQL</Button>
                <img src={background} alt="background" id="background"/>
                <Box>
                    <Typography variant="h2">
                        Otimize a criação de queries<br/> usando o Sheet2Script
                    </Typography>
                </Box>
           </Box>
        </>
    )
}

export default Home;