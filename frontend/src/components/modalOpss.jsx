import React, {  } from 'react';
import './assets/FormCrearEvento.css';

const ModalSalir = ({ message, onClose}) => {

  return (
    <div className='modal-container' >
      <div className='modalCrearEvento5'>
      <div className="FondoModal4">
                <h2 className="CrearEvento">
                    Verifica los datos
                </h2>
          </div>
          <div className="FondoModal4-1">
          <img src="https://cdn-icons-png.flaticon.com/512/5741/5741824.png" className='iconoOps' alt="" />
                
            <div className='TextoModal-1'>                
                <h2 >{message}</h2>
            </div>
            
            <div className="ConfbuttonRequisitos-1">
              <button className="buttonRequisitos2" type="button" onClick={onClose}>
                Volver a la Creacion
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSalir;
