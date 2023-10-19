
import "./home.css";
import { useState, useEffect } from "react";
import logo from "../../assets/img/U.png";
import Swal from 'sweetalert2';
import centerImage from "../../assets/img/UDEC.png"; 


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

  function login() {
    Swal.fire({
      title: 'Bienvenidos',
      html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
      <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
      confirmButtonText: 'Iniciar sesión',
      focusConfirm: false,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector('#login').value
        const password = Swal.getPopup().querySelector('#password').value
        if (!login || !password) {
          Swal.showValidationMessage(`Ingrese usuario y contraseña `)
        }
        return { login: login, password: password }
      }
    }).then((result) => {
      Swal.fire(`
        Usuario: ${result.value.login}
        Contraseña: ${result.value.password}
      `.trim())
    })
  }

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="titulo" className="nombreU"/>
        <img src={logo} alt="logoU" className="logoU" />
        <button className="ingresar-button" onClick={() => login()}>
          Ingresar
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
            <img src={centerImage} alt="Imagen en el centro" className="center-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
