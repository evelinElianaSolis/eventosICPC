import React, {  } from 'react';
import './assets/FormCrearEvento.css';
import { useNavigate } from 'react-router-dom';
const ModalSalir = ({ message, onClose}) => {
    const Navigate = useNavigate();
  const handleSiClick = () => {
    window.location.href = '/Home';
  };

  return (
    <div className='modal-container' >
      <div className='modalCrearEvento4'>
      <div className="FondoModal4">
            <h2 className="CrearEvento">{message}</h2>
          </div>
          <div className="FondoModal4">
            <div className='TextoModal'>
                <h2 className="CrearEvento1">¿Está seguro que desea cancelar la creación del tipo de evento?</h2>
            </div>
            
          <div className="ConfbuttonRequisitos">
              <button className="buttonRequisitos2" type="button" onClick={onClose}>
                No
              </button>
              <button className="buttonRequisitos2" type="button" onClick={handleSiClick}>
                Sí
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSalir;
