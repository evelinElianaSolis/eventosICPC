import React, {  } from 'react';
import './assets/ModalParaSalir.css';
import axios from './api/conexionApi';
import { useNavigate } from 'react-router-dom';
const ModalSalir = ({ message, idEquipo,onClose }) => {
    const Navigate = useNavigate();
  const handleSiClick = () => {
    axios.get(`buscarEquipo/${idEquipo}`)
    .then(response => {
        axios.delete(`./destroyEquipo/${idEquipo}`)
        .then(response => {
        console.log(response.data.message);
        })
        .catch(error => {
        console.error('Error al eliminar el equipo:', error);
        });
    })
    .catch((error) => {
        console.error('Error al buscar equipo ', error);
    });
    onClose();
    //window.location.href = '../pages/Home.jsx';
    Navigate("/EventosRegistrarEquipo");
    
  };

  const handleNoClick = () => {
    // Cerrar solo el modal, no abandonar el registro
    onClose();
  };


  return (
    <div className='modal-container' >
      <div className='modal-content error'>
        <div className='message'>{message}</div>
        <div className='btn-options'>
          <button onClick={handleSiClick}>Sí</button>
          <button onClick={handleNoClick}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalSalir;
