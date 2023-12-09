import React, { useState } from 'react';
import axios from 'axios';
import Alert from'./Alert';
import ModalCreacionEvento from './ModalCreacionRG.jsx';

const ModalRegla = ({ mostrar, cerrar, nombre, descripcion1 , setDescripcion1, setNombre, agregarRegla }) => {




  const [nombreRegla, setNombreRegla] = useState('');
  const [nombreError, setNombreError] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [descripcionError, setDescripcionError] = useState(false);
  const [Error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [mostrarModalSalir, setMostrarModalSalir] = useState(false);
  
  const handleButtonCancelarCE = () => {  setMostrarModalSalir(false); agregarRegla(); cerrar(); 
    setNombreRegla("");
    setDescripcion("");
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    

    
    try {

      const response = await axios.get('http://localhost:8000/api/obtenerUltimoIdEvento');
      const ultimoId = response.data.ultimoId;
      const eventId = ultimoId;
      if(nombreRegla == ""){
        setError(false);
      }else{
      await axios.post('http://localhost:8000/api/postRegla', {
        nombreRegla: nombreRegla,
        descripcionRegla:descripcion,
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
        <ModalCreacionEvento message="Regla agregada" onClose={handleButtonCancelarCE} />
          
        )}
        {(mostrarModalSalir != true) && (
          <div>
        <div className="modalCrearEvento">
          <div className="FondoModal1">
            <h2 className="CrearEvento">Añadir regla</h2>
          </div>

          <div className="FondoModal2">
            <div className='Campovacio'>
              <label htmlFor="nombreRegla">Nombre de regla:</label>
              <div className="ColorCampoVacio">*</div>
            </div>
            <input
              type="text"
              id="nombreRegla"
              value={nombreRegla}
              placeholder='Nombre'
              onChange={(e) => {
                setNombre(e.target.value);
                setNombreRegla(e.target.value);
              }}
              onBlur={() => (setNombreError(nombreRegla.trim() === ""), setError(nombreRegla.trim() === ""))}
              className={nombreError ? "campo-vacio" : ""}
            />
            {(nombreRegla.length > 40)&& <div className="ErrorForm">máximo 40 caracteres alfanuméricos</div>}

        <div className='Campovacio'> 
            <label htmlFor="descripcionReqglas">Descripcion:</label>
          </div>
          <textarea
            id="descripcionReglas"
            value={descripcion}
            placeholder='Descripcion'
            onChange={(e) => setDescripcion(e.target.value)}
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

export default ModalRegla;