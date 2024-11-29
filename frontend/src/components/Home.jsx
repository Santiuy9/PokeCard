import React, { useContext } from 'react';
import { useNavigate  } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './css/Home.css'

const Home = () => {
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="content-card">
        {isAuthenticated ? (
          <>
            <h1>Bienvenido de nuevo al Juego de Cartas Pokémon</h1>
            <p>¡Estás autenticado! ¿Listo para jugar?</p>
            <div className="button-container">
              <button onClick={() => navigate('/modo-historia')} className="btn btn-blue">
                Modo Historia
              </button>
              <button onClick={() => navigate('/multijugador')} className="btn btn-green">
                Multijugador
              </button>
              <button onClick={() => navigate('/edit-deck')} className="btn btn-purple">
                Editar Deck
              </button>
              <button onClick={() => navigate('/configuraciones')} className="btn btn-gray">
                Configuraciones
              </button>
              <button onClick={() => navigate('/add-card')}>
                Agregar Carta (Devs)
              </button>
              <button onClick={logout} className="btn btn-red">
                Cerrar Sesión
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>Bienvenido al Juego de Cartas Pokémon</h1>
            <p>Selecciona una opción para comenzar:</p>
            <div className="button-container">
              <button onClick={() => navigate('/register')} className="btn btn-green">
                Registrarse
              </button>
              <button onClick={() => navigate('/login')} className="btn btn-blue">
                Iniciar sesión
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;