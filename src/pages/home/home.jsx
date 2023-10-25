import { useState, useEffect } from "react";
import logo from "../../assets/img/U.png";
import Swal from "sweetalert2";
import { inicioSesion } from "../../services/api";
import "./home.css";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const handleUploadFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // eslint-disable-next-line no-undef
    setFilesToUpload(selectedFiles);
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
            console.log(response.data);
            setUserName(correo); // Guardar el nombre de usuario
            setIsLoggedIn(true);
            Swal.fire({
              icon: "success",
              title: "Inicio de sesión exitoso",
              text: response.data.message,
            });
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
  const logout = () => {
    setIsLoggedIn(false);
    setUserName("");
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="titulo" className="logoU" />
        <h2 className="titulo-udec">Universidad de Cundinamarca</h2>
        {isLoggedIn ? ( // Mostrar el nombre de usuario y el botón de cerrar sesión si el usuario ha iniciado sesión
          <div className="user-info">
            <p>Bienvenido, {userName}</p>
            <button className="logout-button" onClick={logout}>
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
            <h1>GUIAS Y MANUALES DE USUARIO</h1>
            <p>
              Bienvenido a nuestra plataforma de guías y manuales de usuario.
            </p>

            {isLoggedIn && ( // Mostrar los botones solo si el usuario ha iniciado sesión
              <div className="buttons-container">
                <input
                  type="file"
                  className="main-button button-upload"
                  onChange={handleUploadFiles}
                  multiple
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
