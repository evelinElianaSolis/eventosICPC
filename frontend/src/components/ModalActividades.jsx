import React, { useState } from 'react';
import axios from 'axios';
import Alert from'./Alert';
import '../components/assets/FormCrearEvento.css';
import ModalCreacionEvento from './ModalCreacionAT.jsx';






const ModalActividad = ({


  mostrar,        
  cerrar,         
  actividad1,         
  fechaInicio1,        
  fechaFin1,         
  horaInicio,         
  ubicacion1,         
  modalidad1,         
  descripcionActividad1,        
  setActividad,        
  setFechaInicio1,        
  setFechaFin1,         
  setHoraInicio,       
  setUbicacion1,        
  setModalidad1,        
  setDescripcionActividad1,        
  agregarActividad,        
  
}) => {

  const [actividad, setActividad1] = useState('');
  const [fechaInicio, setFechaInicio] = useState('null');
  const [fechaFin, setFechaFin] = useState('null');
  const [ubicacion, setUbicacion] = useState(""); 
  const [horaEvento, setHoraEvento] = useState('00:00');
  const [descripcionActividad, setDescripcionActividad] = useState(""); 
  const [modalidad, setModalidad] = useState('-- seleccione --');

  const [actividadError, setActividadError] = useState(false);
  const [horaEventoError, setHoraEventoError] = useState(false);
  const [Error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fechaInicioError, setFechaInicioError] = useState(false);
  const [fechaFinError, setFechaFinError] = useState(false);
  const [modalidadError, setModalidadError] = useState(false);
  const [ubicacionError, setUbicacionError] = useState(false);
  const [descripcionActividadError, setDescripcionActividadError] = useState(false); 

  const [mostrarModalSalir, setMostrarModalSalir] = useState(false);
  
  const handleButtonCancelarCE = () => {  setMostrarModalSalir(false); agregarActividad(); cerrar();
    setHoraEvento('00:00');
    setDescripcionActividad(""); 
    setModalidad('-- seleccione --');
    setUbicacion(""); 
    setFechaFin('null');
    setFechaInicio('null');
    setActividad1('');
  
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    
    try {
      const response = await axios.get('http://localhost:8000/api/obtenerUltimoIdEvento');
      const ultimoId = response.data.ultimoId;
      const eventId = ultimoId;

      if(actividad == ""){
        setError(false);
      }else{
      await axios.post('http://localhost:8000/api/postActividad', {
        nombreActividad:actividad,
        descripcionActividad:descripcionActividadError,
        modalidad:modalidad,
        fechaInicioActividad:fechaInicio,
        fechaFinActividad:fechaFin,
        horaInicioActividad:horaEvento,
        ubicacionActividad:ubicacion,
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
      <div className="ventana-emergente3">
        {(mostrarModalSalir) && (
        <ModalCreacionEvento message="Crear Actividad" onClose={handleButtonCancelarCE} />
          
        )}
        {(mostrarModalSalir != true) && (
          <div>
        <div className="modalCrearEvento3">
          <div className="FondoModal1">
            <h2 className="CrearEvento">Añadir actividad</h2>
          </div>

          <div className="FondoModal2">
            <div className='SegundaFila'>
                <div className='NombreActividad'>
                    <div className="Campovacio">
                    <label htmlFor="nombreActividad">Nombre de la actividad:</label>
                    <div className="ColorCampoVacio">*</div>
                    </div>
                    <input
                    type="text"
                    id="nombreActividad"
                    value={actividad}
                    placeholder="Nombre de la actividad"
                    onChange={(e) => {
                      setActividad(e.target.value);
                      setActividad1(e.target.value);
                    }}
                    
                    onBlur={() => (setActividadError(actividad.trim() === ""),setError(actividad.trim() === ""))}
                    className={actividadError ? "campo-vacio" : ""}
                    required
                    />
                    {(actividad.length > 30)&& <div className="ErrorForm">máximo 30 caracteres alfanuméricos</div>}
                </div>
                <div className="HoraInicio">
                    <label htmlFor="horaInicio">Hora Inicio:</label>
                    <input
                    type="time"
                    id="horaInicio"
                    value={horaEvento}
                    onChange={(e) => setHoraEvento(e.target.value)}
                    onBlur={() => (setHoraEventoError(horaEvento.trim() === "00:00"), setError(horaEvento.trim() === "00:00"))}
                     className={horaEventoError ? "campo-vacio" : "00:00"}
                    />
                </div>
            </div>


            <div className="Fecha">
        <div className="FechaInicio">
          <div className="Campovacio">
            <label htmlFor="fecha-inicio">Fecha inicio:</label>
            <div className="ColorCampoVacio">*</div>
          </div>
          <input
            className={`FechaDesing ${fechaInicioError ? "campo-vacio" : 'null'}`}
            type="date"
            id="fecha-inicio"
            name="fecha-inicio"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            onBlur={() => (setFechaInicioError(fechaInicio.trim() === 'null'), setError(fechaInicio.trim() === "null"))}
            required
          />
          {(fechaInicio == "" )&& <div className="ErrorForm">Fecha invalida</div>}

        </div>
        <div className="FechaFinal">
          <div className="Campovacio">
            <label htmlFor="fecha-fin">Fecha fin:</label>
            <div className="ColorCampoVacio">*</div>
          </div>         
          <input
            className={`FechaDesing ${fechaFinError ? "campo-vacio" : "null"}`}
            type="date"
            id="fecha-fin"
            name="fecha-fin"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            onBlur={() => (setFechaFinError(fechaFin.trim() === "null"), setError(fechaFin.trim() === "null"))}
            required
          />
          {(fechaFin == "" )&& <div className="ErrorForm">Fecha invalida</div>}
        </div>
      </div>


            <div className="SegundaFila">

            <div className="composer-form">
                <div className="Ubicacion">
                  <div className='Campovacio'>
                    <label htmlFor="ubicacion">Ubicación:</label>
                    <div className="ColorCampoVacio">*</div>
                  </div>
                    <input
                      type="text"
                      id="ubicacion"
                      name="ubicacion"
                      placeholder="Ubicación"
                      value={ubicacion}
                      onChange={(e) => setUbicacion(e.target.value)}
                      onBlur={() => (setUbicacionError(ubicacion.trim() === ""), setError(ubicacion.trim() === "") )}
                      className={ubicacionError ? "campo-vacio" : ""}
                      required
                      
                    />{(ubicacion.length > 60)&& <div className="ErrorForm">máximo 60 caracteres alfanuméricos</div>}
                </div>
                </div>

                <div className="Modalidad">
          <div className='Campovacio'>
            <label htmlFor="modalidad">Modalidad: </label>
            <div className="ColorCampoVacio">*</div>
          </div>
          <select
            id="modalidad"
            name="modalidad"
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
            onBlur={() => (setModalidadError(modalidad.trim() === "-- seleccione --"), setError(modalidad.trim() === "-- seleccione --"))}
            className={modalidadError ? "campo-vacio" : "-- seleccione --"}
            required
          >
            <option value=" ">-- seleccione --</option>
            <option value="Virtual">Virtual</option>
            <option value="Presencial">Presencial</option>
            <option value="Hibrida">Hibrida</option>
          </select>
        </div>
            </div>

            <div className="DescripcionActividad">
              <label htmlFor="descripcionActividad">Descripción de la actividad:</label>
              <textarea
                id="descripcionActividad"
                value={descripcionActividad}
                placeholder="Descripción"
                onChange={(e) => setDescripcionActividad(e.target.value)}
              ></textarea>
            </div>

          
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
        </div>)}
      </div>
    )
  );
};

export default ModalActividad;
