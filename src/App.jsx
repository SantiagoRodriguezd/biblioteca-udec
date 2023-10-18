import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
// import VerDocumentos from './pages/'; // Componente para mostrar documentos
// import SubirDocumento from './SubirDocumento'; // Componente para cargar documentos

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
      </Routes>
      {/* <Route path="/ver-documentos" component={VerDocumentos} />
        <Route path="/subir-documento" component={SubirDocumento} /> */}
    </BrowserRouter>
  );
}

export default App;
