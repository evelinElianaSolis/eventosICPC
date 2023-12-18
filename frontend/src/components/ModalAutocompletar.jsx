import React, {  } from 'react';
import './assets/ModalParaSalir.css';
const ModalAutocompletar = ({ onClose, handleYes, nombre, apellido, correo}) => {
  const handleSiClick = () => {
    handleYes();
    //window.location.href = '../pages/Home.jsx';
    };

  const handleNoClick = () => {
    // Cerrar solo el modal, no abandonar el registro
    onClose();
  };


  return (
    <div className='modal-container' >
      <div className='modal-content error'>
        <div >
         <br/>   
         <br/>   
         <br/>   

            <p>{`Para autocompletar los campos, verifique que los datos sean correctos:`}</p>
            <p>{`    Nombre y apellidos: ${nombre}  ${apellido}  `}</p>
            <p>{`  Correo:${correo}`}</p></div>
        <div className='btn-options'>
          <button onClick={handleSiClick}>Sí</button>
          <button onClick={handleNoClick}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ModalAutocompletar;