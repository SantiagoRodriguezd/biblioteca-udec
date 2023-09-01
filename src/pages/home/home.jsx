import './home.css';
import { useState, useEffect } from 'react';
import logo from '../../assets/react.svg'

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); 
  }, []);

  return (
    <div className='container'>
        <header>
            <img src="" alt="titulo" />
            <img src="" alt="logoU" />
            {/* desplegable para iniciar sesion usuario  */}
            </header>      
      {isLoading ? (
        
        <div className="loading-overlay loading">
            <img src={logo} alt="" />
          <h2>Universidad de Cundinamarca</h2>
        </div>
      ) : (
        
        <div className="main">
          <h1>Hola</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
