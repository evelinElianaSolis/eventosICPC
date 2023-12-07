import React, { useState } from 'react';
import axios from 'axios';
import Alert from'./Alert';
import ModalCreacionEvento from './ModalCreacion.jsx';

const ModalRequisito = ({ mostrar, cerrar, nombre, descripcion, setNombre, setDescripcion, agregarRequisito }) => {



  const [nombreRequisito, setNombreRequisito] = useState('');
  const [nombreRequisitoError, setNombreRequisitoError] = useState(false);
  const [descripcionRequisito, setDescripcionRequisito] = useState('');
  const [descripcionRequisitoError, setDescripcionRequisitoError] = useState(false);
  const [Error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [mostrarModalSalir, setMostrarModalSalir] = useState(false);
  
  const handleButtonCancelarCE = () => {  setMostrarModalSalir(false); agregarRequisito(); cerrar();
    setNombreRequisito("");
    setDescripcionRequisito("");
  
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    

    
    try {
      const response = await axios.get('http://localhost:8000/api/obtenerUltimoIdEvento');
      const ultimoId = response.data.ultimoId;
      const eventId = ultimoId;
      if(nombreRequisito == ""){
        
        setError(false);
      }else{
        
      await axios.post('http://localhost:8000/api/postRequisito', {
        nombreRequisito: nombreRequisito,
        descripcionRequisito:descripcionRequisito,
        idEvento:eventId
      });
      console.log('Evento creado con éxito');
      setModalVisible(true);
      
      setMostrarModalSalir(true);
      
    }
    } catch (error) {
      if (error.response) {
        
        console.error('Respuesta del servidor con error:', error.response);
        console.error('Código de estado HTTP:', error.response.status);
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
      } else {
        console.error('Error durante la configuración de la solicitud:', error.message);
      }

      setModalVisible(false);
      
    }
  };

  return (
    mostrar && (
      
      <div className="ventana-emergente">
        {(mostrarModalSalir) && (
        <ModalCreacionEvento message="Crear Requisito" onClose={handleButtonCancelarCE} />
          
        )}
        {(mostrarModalSalir != true) && (
          <div>
        <ModalCreacionEvento message="Crear Requisito" onClose={handleButtonCancelarCE} />
        
      
        <div className="modalCrearEvento">
          <div className="FondoModal1">
            <h2 className="CrearEvento">Añadir requisito</h2> 
          </div>

        <div className="FondoModal2">
          <div className='Campovacio'>
            <label htmlFor="nombreRequisito">Nombre de requisito:</label>
            <div className="ColorCampoVacio">*</div>
          </div>
          <input
            type="text"
            id="nombreRequisito"
            value={nombreRequisito}
            placeholder='Nombre'
            onChange={(e) => {
              setNombre(e.target.value);
              setNombreRequisito(e.target.value);
            }}
            onBlur={() => (setNombreRequisitoError(nombreRequisito.trim() === ""), setError(nombreRequisito.trim() === ""))}
              className={nombreRequisitoError ? "campo-vacio" : ""}
          />
          {(nombreRequisito.length > 40)&& <div className="ErrorForm">máximo 40 caracteres alfanuméricos</div>}
        
          <div className='Campovacio'> 
            <label htmlFor="descripcionRequisito">Descripción:</label>
          </div>
          <textarea
            id="descripcionRequisito"
            value={descripcionRequisito}
            placeholder='Descripcion'
            onChange={(e) => setDescripcionRequisito(e.target.value)}
            
            required
          ></textarea>
          {(Error && <Alert/>)}


        <div className="ConfbuttonRequisitos">
          <button className="buttonRequisitos" type="button" onClick={cerrar}>
            Cancelar
          </button>
          <button className="buttonRequisitos" type="button" onClick={handleSubmit}>
            Agregar
          </button>
        </div>
        </div>
        </div>
        </div>
        )}
      </div>
      
    )
  );
};

export default ModalRequisito;