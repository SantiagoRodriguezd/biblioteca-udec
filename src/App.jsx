import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); 
  }, []);

  return (
    <div className='container'>      
      {isLoading ? (
        <div className="loading-overlay">
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

export default App;
