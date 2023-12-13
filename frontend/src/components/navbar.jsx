
import React from 'react';
import './assets/navbar.css';
import { NavLink, } from 'react-router-dom';

const Menu = () => {
  return (
  <nav className="navbar">
      
      
      <NavLink to={'/Home'} className="navbar-item" activeclassname="active" >
        <img src="https://cdn-icons-png.flaticon.com/512/8280/8280362.png" alt="Usuario" />
        <div>
          <p className='navbar-title'>Todos los eventos</p>
          <div className="line"></div>
        </div>
      </NavLink>
    
      
      <NavLink to={"/ConfigurarEvento"} className="navbar-item" activeclassname="active">
      <img src="   https://cdn-icons-png.flaticon.com/512/10746/10746540.png " alt="Usuario" />
      <div>
        <p className='navbar-title'>Crear Evento
        </p>
        <div className="line"></div>
      </div>
      </NavLink>

      <NavLink to={"/CrearTipoEvento"} className="navbar-item" activeclassname="active">
      <img src="   https://cdn-icons-png.flaticon.com/512/9790/9790435.png " alt="Usuario" />
      <div>
        <p className='navbar-title'>Crear Tipo Evento
        </p>
        <div className="line"></div>
      </div>
      </NavLink>

      <NavLink to={"/EventosRegistroParticipantes"} className="navbar-item" activeclassname="active">
      <img src="   https://cdn-icons-png.flaticon.com/512/9790/9790435.png " alt="Usuario" />
      <div>
        <p className='navbar-title'>Registrar Participantes a un evento 
        </p>
        <div className="line"></div>
      </div>
      </NavLink>

      <NavLink to={"/EventosRegistrarEquipo"} className="navbar-item" activeclassname="active">
  <img src="https://cdn-icons-png.flaticon.com/512/9790/9790435.png" alt="Usuario" />
  <div>
    <p className='navbar-title'>Registrar equipo a un evento</p>
    <div className="line"></div>
  </div>
</NavLink>

<NavLink to={"/EventosEditarEvento"} className="navbar-item" activeclassname="active">
  <img src="https://cdn-icons-png.flaticon.com/512/9790/9790435.png" alt="Usuario" />
  <div>
    <p className='navbar-title'>Editar Evento</p>
    <div className="line"></div>
  </div>
</NavLink>

<NavLink to={"/EventosNotificaciones"} className="navbar-item" activeclassname="active">
  <img src="https://cdn-icons-png.flaticon.com/512/9790/9790435.png" alt="Usuario" />
  <div>
    <p className='navbar-title'>Editar Evento</p>
    <div className="line"></div>
  </div>
</NavLink>


  </nav>
  );
};

export default Menu;



