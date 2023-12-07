// ModalComponent.js
import React from 'react';
import '../components/assets/ModalCalendario.css'



const ModalCampoObligatorio = ({ id, onClose }) => {
    const handleOkClick = (id) => {    
        window.location.href = `./VerInformacionEvento?${id}`;
    }

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Genial, se ha registrado correctamente</p>
        <button onClick={() =>handleOkClick(id)}>OK</button>
        
      </div>
    </div>
  );
};

export default ModalCampoObligatorio;
