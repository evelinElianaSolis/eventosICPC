import React from 'react';
import './assets/ModalSeleccionRegistro.css';
//import RegistrarseEquipo from './FormularioRegistrarParticipantesToEquipo';
import RegistrarseEquipo from '../pages/RegistrarEquipo';
import { NavLink } from 'react-router-dom';

const seleccionRegistro = ({ EventoId, onClose }) => {

  const handleRegistrarGrupoClick = () => {
    onClose();
   // <NavLink to="/RegistrarEquipo"> </NavLink>
 window.location.href =  `/RegistrarEquipo/${EventoId}`;
  //<RegistrarseEquipo unevento={`${EventoId}`}/>
  };
  const handleRegistrarseEquipoClick = () => {
   onClose();
   window.location.href = `/RegistroParticipanteToEquipo/${EventoId}`;
   //<NavLink to="/RegistroParticipanteToEquipo"> </NavLink>
    //window.location.href = `/registrarParicipantesEquipo?${EventoId}`;
  };
return (
    <div className='modal-container'>
      <div className='modal-content'>
      <span className="cerrar" onClick={onClose}>&times;</span>
       <h1 >Selecciona la accion que deseas</h1>
        <div className='boton-ok'>
          
        <button onClick={handleRegistrarGrupoClick}>Registrar el nombre del equipo</button>
      </div>
      <div className='boton-ok'>
          <button onClick={handleRegistrarseEquipoClick}>Registrarse a un equipo</button>
        
        </div>
        
      </div>
    </div>
  );
};
export default seleccionRegistro;