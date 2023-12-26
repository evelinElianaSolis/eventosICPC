
import React from 'react';
import './assets/navbar.css';
import { NavLink, } from 'react-router-dom';

const Menu = () => {
  return (
  <nav className="navbar">
      
      
      <NavLink to={'/Home'} className="navbar-item" activeclassname="active" >
        <img src="   https://cdn-icons-png.flaticon.com/512/13271/13271154.png " alt="Usuario" />
        <div>
          <p className='navbar-title'>Visualizar eventos creados</p>
          <div className="line"></div>
        </div>
      </NavLink>
      
      <NavLink to={"/CrearTipoEvento"} className="navbar-item" activeclassname="active">
      <img src="      https://cdn-icons-png.flaticon.com/512/2051/2051945.png  " alt="Usuario" />
      <div>
        <p className='navbar-title'>Crear tipo de evento
        </p>
        <div className="line"></div>
      </div>
      </NavLink>
      
      <NavLink to={"/ConfigurarEvento"} className="navbar-item" activeclassname="active">
      <img src="      https://cdn-icons-png.flaticon.com/512/780/780575.png  " alt="Usuario" />
      <div>
        <p className='navbar-title'>Crear Evento
        </p>
        <div className="line"></div>
      </div>
      </NavLink>

      <NavLink to={"/EventosEditarEvento"} className="navbar-item" activeclassname="active">
      <img src="      https://cdn-icons-png.flaticon.com/512/13191/13191252.png " alt="Usuario" />
      <div>
        <p className='navbar-title'>Editar un evento
        </p>
        <div className="line"></div>
      </div>
      </NavLink>   
      
        <NavLink to={"/EventosRegistroParticipantes"} className="navbar-item" activeclassname="active">
      <img src="         https://cdn-icons-png.flaticon.com/512/5134/5134051.png   " alt="Usuario" />
      <div>
        <p className='navbar-title'>Registrar Participantes <br/>a un evento 
        </p>
        <div className="line"></div>
      </div>
      </NavLink>

      <NavLink to={"/EventosRegistrarEquipo"} className="navbar-item" activeclassname="active">
  <img src="   https://cdn-icons-png.flaticon.com/512/6823/6823086.png " alt="Usuario" />
  <div className='lineablock'>
    <p className='navbar-title'>Registrar equipo <br/>a un evento</p>
    <div className="line"></div>
  </div>
</NavLink>



<NavLink to={"/EventosParaNotificar"} className="navbar-item" activeclassname="active">
  <img src="   https://cdn-icons-png.flaticon.com/512/925/925040.png " alt="Usuario" />
  <div>
    <p className='navbar-title'>Enviar notificación</p>
    <div className="line"></div>
  </div>
</NavLink>


  </nav>
  );
};

export default Menu;



