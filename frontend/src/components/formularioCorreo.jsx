import React, { useState } from 'react';
import axios from './api/conexionApi';

const CorreoForm = () => {
  const [email, setEmail] = useState('');
  const [activarNotificacion, setActivarNotificacion] = useState(false);
  const [idPersona, setIdPersona] = useState(null); // Nuevo estado para idPersona

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setActivarNotificacion(e.target.checked);
  };

  const handleIdPersonaChange = (e) => {
    setIdPersona(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('./correos', {
        correoC: email,
        estadoNotificacion: activarNotificacion,
        idPersona: idPersona, // Agregar el valor del idPersona
      });

      console.log('Correo creado con éxito');
    } catch (error) {
      console.error('Error al crear correo', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Correo:
        <input
          type="email"
          value={email}
          onChange={handleInputChange}
        />
      </label>
      <div>
        <label>
          Activar Notificación:
          <input
            type="checkbox"
            checked={activarNotificacion}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <div>
        <label>
          ID de Persona (Opcional):
          <input
            type="text"
            value={idPersona}
            onChange={handleIdPersonaChange}
          />
        </label>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default CorreoForm;