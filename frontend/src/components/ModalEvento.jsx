import React from 'react';
import '../components/assets/ModalCalendario.css'
    const ModalEvento = ({ evento,color, onClose }) => {
        return (
          <div className="modal-calendario" >
            <div className="modal-content-calendario" style={{ backgroundColor: color }}> {/* Agrega una clase para el estilo bohemio */}
              <span className="close-calendario" onClick={onClose}>&times;</span>
              <h2>{evento.nombreActividad}</h2> 
              
              <p><strong>Fecha de inicio:</strong> {evento.fechaInicioActividad}</p>
              <p><strong>Fecha fin:</strong> {evento.fechaFinActividad}</p>
              <p><strong>Hora de inicio:</strong> {evento.horaInicioActividad}</p>
              <p><strong>Modalidad:</strong> {evento.modalidad}</p>
              <p><strong>Ubicacion:</strong> {evento.ubicacionActividad}</p>
              {evento.descripcionActividad !== null && (
  <p>
    <strong>Descripcion:</strong> {evento.descripcionActividad}
  </p>
)}
            </div>
          </div>
        );
      };
export default ModalEvento;
