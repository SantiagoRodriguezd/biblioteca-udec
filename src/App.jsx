// En tu archivo de rutas principal (App.js o donde definas las rutas)
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import VerDocumentos from './VerDocumentos'; // Componente para mostrar documentos
import SubirDocumento from './SubirDocumento'; // Componente para cargar documentos

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/ver-documentos" component={VerDocumentos} />
        <Route path="/subir-documento" component={SubirDocumento} />
      </Switch>
    </Router>
  );
}

export default App;
