import './home.css';
import { useState, useEffect } from 'react';
import logo from '../../assets/img/U.png';

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <div className='container'>
      <header className='header'>
        <img src={logo} alt="titulo" />
        <img src={logo} alt="logoU" className='logoU' />        
        {/* desplegable o boton para iniciar sesión de usuario */}
        <button className='button-top-right' onClick={() => alert('Botón clickeado')}>INGRESAR</button>
      </header>
      {isLoading ? (
        <div className="loading-overlay loading">
          <img src={logo} alt="" />
          <h2>Universidad de Cundinamarca</h2>
        </div>
      ) : (
        <div className='container-main'>
          <div className="main">
            <h1>GUIAS Y MANUALES DE USUARIO</h1>
            <p>Bienvenido a nuestra plataforma de guías y manuales de usuario.</p>
            <div className="buttons-container">
              <button className="main-button">Ver </button>
              <button className="main-button">Subir </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;