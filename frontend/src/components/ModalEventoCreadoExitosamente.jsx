import React, {  } from 'react';
import './assets/FormCrearEvento.css';

const handleSiClick = () => {
    window.location.href = '/Home';
  };


const ModalCreacionEvento = ({ message, onClose}) => {

  return (
    <div className='modal-container' >
      <div className='modalCrearEvento4'>
      <div className="FondoModal4">
            <h2 className="CrearEvento">{message}</h2>
          </div>
          <div className="FondoModal4">
            <div className='TextoModal'>
                <h2 className="CrearEvento1">Evento creado con éxito</h2>
            </div>
            
          <div className="ConfbuttonRequisitos">
              <div className="buttonRequisitos2" type="button" onClick={handleSiClick}>
                Aceptar
              </div>
            </div>
        </div>
      </div>
    </div>
    
  );
};

export default ModalCreacionEvento;
