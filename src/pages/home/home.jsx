import { useState, useEffect } from "react";
import logo from "../../assets/img/U.png";
import Swal from "sweetalert2";
import { inicioSesion } from "../../services/api";
import "./home.css";
import axios from "axios";

function Home({ isLoggedIn, setIsLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFilesToDelete, setSelectedFilesToDelete] = useState([]);

  const token = sessionStorage.getItem("token");

  const deleteFiles = () => {
    if (selectedFilesToDelete.length > 0) {
      const fileIdsToDelete = selectedFilesToDelete.map((file) => file.id_file);

      axios
        .delete("http://localhost:8080/archivos/eliminarArchivos", {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: { fileIds: fileIdsToDelete },
        })
        .then((response) => {
          console.log(response.data);
          const updatedFiles = files.filter(
            (file) => !fileIdsToDelete.includes(file.id_file)
          );
          setFiles(updatedFiles);
          setSelectedFilesToDelete([]);
        })
        .catch((error) => {
          console.error("Error al eliminar archivos: ", error);
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const handleFileSelect = (e) => {
    if (isLoggedIn && e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setSelectedFilesToDelete(selectedFiles);
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
          Authorization: "Bearer " + token,
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
            const { token } = response.data;
            setUserName(correo);
            Swal.fire({
              icon: "success",
              title: "Inicio de sesión exitoso",
              text: response.data.message,
            });
            sessionStorage.setItem("token", token);

            setIsLoggedIn(true);
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
            Authorization: "Bearer " + token,
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

  const handleFileDelete = (file) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar el archivo ${file.nombre}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/archivos/${file.id_file}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            console.log(response.data);
            const updatedFiles = files.filter(
              (f) => f.id_file !== file.id_file
            );
            setFiles(updatedFiles);
            Swal.fire(
              "¡Eliminado!",
              "El archivo ha sido eliminado.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error al eliminar el archivo: ", error);
            Swal.fire("Error", "No se pudo eliminar el archivo.", "error");
          });
      }
    });
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
        <div className="container-informacion">
          <div className="container-principal">
            <p className="titulo-bienvenida">
              Bienvenido a nuestra plataforma de guías y manuales de usuario.
            </p>

            <div className="container-archivos">
              <h1 className="archivos-titulo">Archivos</h1>
              <table>
                <thead>
                  <tr>
                    <th>Archivo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.id_file}>
                      <td>{file.nombre}</td>
                      <td>
                        <button onClick={() => handleFileDownload(file)}>
                          Descargar
                        </button>{" "}
                        <a
                          href={bytesToPDF(file.archivo, `${file.nombre}.pdf`)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ver
                        </a>{" "}
                        <button
                          className="Eliminar"
                          onClick={() => handleFileDelete(file)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isLoggedIn && (
              <div>
                {" "}
                <div className="buttons-container">
                  <input
                    type="file"
                    className="main-button"
                    onChange={handleUploadFiles}
                    multiple
                  />
                  <div className="button-Cargar">
                    <button className="Cargar" onClick={sendFiles}>
                      Cargar archivos
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="footer">
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
