/* eslint-disable no-unused-vars */
import "./home.css";
import { useState, useEffect } from "react";
import logo from "../../assets/img/U.png";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [filesToUpload, setFilesToUpload] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const handleViewFile = () => {
    alert("Ver archivo específico");
  };

  const handleUploadFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFilesToUpload(selectedFiles);
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="titulo" />
        <img src={logo} alt="logoU" className="logoU" />
        <button
          className="button-top-right"
          onClick={() => alert("Botón clickeado")}
        >
          INGRESAR
        </button>
      </header>
      {isLoading ? (
        <div className="loading-overlay loading">
          <img src={logo} alt="" />
          <h2>Universidad de Cundinamarca</h2>
        </div>
      ) : (
        <div className="container-main">
          <div className="main">
            <h1>GUIAS Y MANUALES DE USUARIO</h1>
            <p>
              Bienvenido a nuestra plataforma de guías y manuales de usuario.
            </p>
            <div className="buttons-container">
              <button className="main-button" onClick={handleViewFile}>
                Ver
              </button>
              <input
                type="file"
                className="main-button button-upload"
                onChange={handleUploadFiles}
                multiple
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
