import React, {  } from 'react';
import './assets/ModalParaSalir.css';
const ModalSalir = ({ message, onClose}) => {
  const handleSiClick = () => {
    onClose();
    //window.location.href = '../pages/Home.jsx';
 window.history.back();
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