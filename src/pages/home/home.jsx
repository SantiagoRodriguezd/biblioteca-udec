import "./home.css";
import { useState, useEffect } from "react";
import logo from "../../assets/img/U.png";
import Swal from "sweetalert2";
import { inicioSesion } from "../../services/api";
import pdfImage from "../../assets/pdf.png";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [filesToUpload, setFilesToUpload] = useState([]);

  const books = [
    {
      title: "Libro 1",
      pdf: "../../Files/EJEMPLO 1.pdf",
      image: pdfImage,
    },
    {
      title: "Libro 2",
      pdf: "../../Files/EJEMPLO 2.pdf",
      image: pdfImage,
    },
    {
      title: "Libro 3",
      pdf: "../../Files/EJEMPLO 3.pdf",
      image: pdfImage,
    },
    // Agrega detalles para los otros libros aquí
  ];
  const getFileNameFromPath = (path) => {
    const parts = path.split("/");
    return parts[parts.length - 1];
  };

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
        return { email: login, password: password };
      },
    }).then((result) => {
      const { email, password } = result.value;
      inicioSesion({ email, password })
        .then((response) => {
          // Maneja la respuesta de la API
          console.log(response.data);
          Swal.fire({
            icon: "success",
            title: "Inicio de sesión exitoso",
            text: response.data.message,
          });
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
    });
  };

  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="titulo" className="nombreU" />
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
            <div className="contaianer-books">
              {books.map((book, index) => (
                <div className="book" key={index}>
                  <img src={book.image} alt="" className="imagen-libros" />
                  <h3 className="book-title">
                    {getFileNameFromPath(book.pdf)}
                  </h3>
                  <button className="open-pdf" data-pdf={book.pdf}>
                    Abrir Libro
                  </button>
                </div>
              ))}
            </div>
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
            {/* <img src={centerImage} alt="Imagen en el centro" className="center-image" /> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
