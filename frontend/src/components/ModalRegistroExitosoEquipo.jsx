import React, {  } from 'react';
import './assets/ModalRegistroExitoso.css'
import { useNavigate } from 'react-router-dom';


const SuccessMessage = ({ message}) => {
const navigate= useNavigate();
    const handleOkClick = () => {
        navigate('/EventosRegistrarEquipo');
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