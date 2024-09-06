import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/login/'
import Cadastro from './pages/cadastro/'
import Conversor from './pages/conversor/'
import EscolherComando from './pages/escolherComando/'
import Home from './pages/home/'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/conversor" element={<Conversor />} />
        <Route path="/escolher-comando" element={<EscolherComando />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
