import { useState, useEffect } from "react";
import logo from "../../assets/img/U.png";
import Swal from "sweetalert2";
import { inicioSesion } from "../../services/api";
import "./home.css";
import axios from "axios";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      return selectedFiles;
    }
    return [];
  };

  const uploadFiles = (selectedFiles) => {
    if (selectedFiles && selectedFiles.length > 0) {
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("archivo", file);
        formData.append("tipo", file.type);
        formData.append("nombre", file.name);
      });
      let config = {
        method: "post",
        url: "http://localhost:8080/archivos/crearArchivo",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIkMmEkMTIkc05ZaU1vcTV3SlFjTHpZZEpIbHkzZTFta2c0SHJzLm9PdER0UXlwN2lTeTA3Znk3emY1S0siLCJleHAiOjE2OTkwNDM5ODN9.OD650QQFq--CB-O9T_LG2l5wVkoCFAehnjUiJPeFXcw",
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
          // Manejar el error si ocurre algún problema durante la carga
        });
    }
  };

  const handleUploadFiles = (e) => {
    const selectedFiles = handleFileSelect(e);
  };

  const sendFiles = () => {
    const inputElement = document.querySelector('input[type="file"]');
    if (inputElement && inputElement.files.length > 0) {
      const selectedFiles = Array.from(inputElement.files);
      uploadFiles(selectedFiles);
    }
  };

  const login = () => {
    Swal.fire({
      title: "Bienvenidos",
      html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
      <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
      confirmButtonText: "Iniciar sesión",
      focusConfirm: false,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector("#login").value;
        const password = Swal.getPopup().querySelector("#password").value;
        if (!login || !password) {
          Swal.showValidationMessage(`Ingrese usuario y contraseña `);
        }
        return { correo: login, password: password };
      },
    }).then((result) => {
      if (result && result.value) {
        const { correo, password } = result.value;
        inicioSesion({ correo, password })
          .then((response) => {
            // Maneja la respuesta de la API

            const { token } = response.data;
            setUserName(correo); // Guardar el nombre de usuario
            setIsLoggedIn(true);
            Swal.fire({
              icon: "success",
              title: "Inicio de sesión exitoso",
              text: response.data.message,
            });
            sessionStorage.setItem("token", token);
            setIsLoggedIn(true); // Actualizar el estado de isLoggedIn a true después del inicio de sesión
          })
          .catch((error) => {
            // Maneja los errores de la API
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error en el inicio de sesión",
            });
          });
      } else {
        // Manejo en caso de que result o result.value sean undefined
        console.error("El objeto result o result.value es undefined.");
      }
    });
  };

  function bytesToPDF(bytes) {
    const binary = atob(bytes);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    const blob = new Blob([new Uint8Array(array)], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/archivos/all", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIkMmEkMTIkc05ZaU1vcTV3SlFjTHpZZEpIbHkzZTFta2c0SHJzLm9PdER0UXlwN2lTeTA3Znk3emY1S0siLCJleHAiOjE2OTkwNDM5ODN9.OD650QQFq--CB-O9T_LG2l5wVkoCFAehnjUiJPeFXcw",
          },
          responseType: "json",
        });
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleFileDownload = (file) => {
    const url = bytesToPDF(file.archivo, `${file.nombre}.pdf`);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${file.nombre}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
    sessionStorage.removeItem("token");
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="titulo" className="logoU" />
        <h2 className="titulo-udec">GUIAS Y MANUALES DE USUARIO</h2>
        {isLoggedIn ? (
          <div className="usuario-info">
            <p className="usuario-nombre">Bienvenido, {userName}</p>
            <button className="salir-button" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <button className="ingresar-button" onClick={() => login()}>
            Ingresar
          </button>
        )}
      </header>
      {isLoading ? (
        <div className="loading-overlay loading">
          <img src={logo} alt="" />
          <h2>Universidad de Cundinamarca</h2>
        </div>
      ) : (
        <div className="container-main">
          <div className="main">
            <p className="titulo-bienvenida">
              Bienvenido a nuestra plataforma de guías y manuales de usuario.
            </p>

            <div className="container-archivos">
              <h1 className="archivos-titulo">Archivos</h1>
              <ul>
                {files.map((file) => (
                  <li key={file.id_file}>
                    {file.nombre} -{" "}
                    <button onClick={() => handleFileDownload(file)}>
                      Descargar
                    </button>{" "}
                    -{" "}
                    <a
                      href={bytesToPDF(file.archivo, `${file.nombre}.pdf`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ver
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {isLoggedIn && (
              <div>
                {" "}
                <div className="buttons-container">
                  <input
                    type="file"
                    className="main-button button-upload"
                    onChange={handleUploadFiles}
                    multiple
                  />
                </div>
                <div>
                  <button className="" onClick={sendFiles}>
                    {" "}
                    enviar archivos
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="bottom-banner">
        Universidad de Cundinamarca <br />
        Siglo 21
        <br />
        Oficina de Sistemas de Información
        <br />
        2023
      </div>
    </div>
  );
}

export default Home;
