// modal.jsx
/*import React from 'react';
import './assets/ModalRegistroExitoso.css';

const Modal = ({ texto, showModal, onClose }) => {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <p id="textoModal">{texto}</p>
        <button className="btn-ok" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default Modal;
*/
import React, {  } from 'react';
import './assets/ModalRegistroExitoso.css'
import { useNavigate } from 'react-router-dom';


const SuccessMessage = ({ message}) => {
const navigate= useNavigate();
    const handleOkClick = () => {
        navigate('/EventosRegistroParticipantes');
      };
  return (
  <div className='modal-container'>
    <div className='modal-content exito' >     
      <div className='message'>{message}</div>      
      <div className='btn-ok'>
      <button onClick={handleOkClick}>OK</button>
      </div>
    </div>
  </div>
  );
};
export default SuccessMessage;