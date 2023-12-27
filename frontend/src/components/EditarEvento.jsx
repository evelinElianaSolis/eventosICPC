import React, { useState, useEffect } from 'react';
import '../components/assets/EditarEvento.css';
import axios from './api/conexionApi';

import Alert from'./Alert';

import ModalSalir from './ModalCancelarCreacion';
//import Validaciones from './utils/Validaciones';
import Ops from './modalOpss';
const nombreActividadBuscada="Cronograma general";




const EditarEvento = (eventoId) => {
  const [contador,                setContador]  = useState(1);
  const [tituloEvento,                setTituloEvento]  = useState('');
  const [horaEvento,                  setHoraEvento]    = useState('--:--');
  const [fechaInicio,                 setFechaInicio]   = useState('null');
  const [fechaFin,                    setFechaFin]      = useState('null');
  const [ubicacion,                   setUbicacion]     = useState("");
  const [idTipoEvento,                setIdTipoEvento]  = useState('');
  const [modalidad,                   setModalidad]     = useState('-- seleccione --');
  const [descripcion,                 setDescripcion]    = useState('');
  const [participacion,               setParticipacion]         =    useState('');
  const [numEntrenadores,             setNumEntrenadores]       =    useState('');
  const [numParticipantes,            setNumParticipantes]      =    useState("");
  const [fechaInicioError,    setFechaInicioError] =    useState(false);
  const [fechaFinError,       setFechaFinError] =       useState(false);
  const [modalidadError,      setModalidadError] =      useState(false);
  const [idTipoEventoError,   setIdTipoEventoError] =   useState(false);
  const [ubicacionError,      setUbicacionError] =      useState(false);
  const [Error,               setError] =               useState(false);
  const [numParticipantesError,       setNumParticipantesError] = useState(false);
  const [participacionError,          setParticipacionError] = useState(false);
  const [numparticipacionError,       setnumParticipantesError] = useState(false);
  const [numEntrenadoresError,        setNumEntrenadoresError] = useState(false);

  const [MostrarParticipacion,              setMostrarParticipacion]     =  useState(false);
  const [tiposDeEvento, setTiposDeEvento] = useState([]);
  const [mostrarModalSalir,   setMostrarModalSalir] =   useState(false);
  const [mostrarModalOps,   setMostrarModalOps] =   useState(false);
  const [mostrarModalOpsEvento,   setMostrarModalOpsEvento] =   useState(false);
  const [modalVisible,        setModalVisible] =        useState(false);
  const handleInicioClick       = () => {setMostrarModalSalir(true);};  
  const handleButtonCancelarCE  = () => {setMostrarModalSalir(false);};
  const handleOps               = () => {setMostrarModalOps(false);};
  const handleOpsEvento               = () => {setMostrarModalOpsEvento(false);};
  const obtenerEvento = async () => {
    
    try {
      const response = await axios.get(`./obtener-evento/${eventoId.eventoId}`);
      const responseActividad = await axios.get(`./obtener-actividad/${eventoId.eventoId}`); 
      const responseTipo = await axios.get(`./obtener-tipo-evento/${response.data.evento.idTipoEvento}`);
      
    
    console.log(eventoId.eventoId);
    console.log(response.data.evento.idTipoEvento);
      const evento = response.data.evento;
      const Actividad = responseActividad.data.actividad;
      const Tipo = responseTipo.data.tipoEvento;
      
      setTituloEvento(evento.tituloEvento);
      setDescripcion(evento.descripcionEvento);
      setFechaInicio(Actividad.fechaInicioActividad);
      setFechaFin(Actividad.fechaFinActividad);
      setHoraEvento(Actividad.horaInicioActividad);
      setModalidad(Actividad.modalidad);
      setUbicacion(Actividad.ubicacionActividad);
      setIdTipoEvento(Tipo.nombreTipoEvento);
      console.log(tituloEvento);
      } catch (error) {
        console.error('Error al obtener el evento:', error);
      }

  }
  if (contador === 1){
    setContador(2);
    obtenerEvento();
    
  }else{
  
  } 










  const handleSubmit = async (e) => {e.preventDefault();
    
    try {
      
     
      
      

      await axios.post(`/evento/${eventoId.eventoId}`, {
        idEvento: eventoId,
        tituloEvento: tituloEvento,
        participacion:"ninguna",
        numParticipantes:0,
        numEntrenadores:0,
        descripcionEvento: descripcion,
        estadoEvento:true,
        aficheEvento:"N/N",
        idTipoEvento:idTipoEvento,
        idAdministrador:"87654321"
      });
      await axios.post('./postActividad/eventoId', {
        nombreActividad:"Cronograma general",
        descripcionActividad:descripcion,
        modalidad:modalidad,
        fechaInicioActividad:fechaInicio,
        fechaFinActividad:fechaFin,
        horaInicioActividad:horaEvento,
        ubicacionActividad:ubicacion,
        idEvento:eventoId
      });


      console.log('Evento creado con éxito');
    
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



  const handleFechaInicioChange = (e) => {
    const nuevaFecha = e.target.value;
    const fechaActual = new Date().toISOString().split('T')[0];

    // Validar que la nueva fecha no sea anterior a la actual
    if (nuevaFecha < fechaActual) {
      setFechaInicioError(true);
      setFechaFinError(true);
      
    } else {
      setFechaInicioError(false);
      setFechaInicio(nuevaFecha);
      setFechaFin(nuevaFecha);
      setFechaFinError(false);
    }
  };

  const handleFechaFinChange = (e) => {
    const nuevaFecha = e.target.value;
    const fechaActual = new Date().toISOString().split('T')[0];
  
    // Validar que la nueva fecha no sea anterior a la actual
    if (nuevaFecha < fechaActual) {
      setFechaInicioError(true);
      setFechaFinError(true);
    } else {
      setFechaInicioError(false);
      setFechaFin(nuevaFecha);
      setFechaFinError(false);
    }
  };
  

  useEffect(() => {
    const obtenerTiposDeEvento = async () => {
      try {
        const response = await axios.get('./obtener-tipos-de-evento');
        setTiposDeEvento(response.data.tiposDeEvento);
      } catch (error) {
        console.error('Error al obtener tipos de evento:', error);
        // Manejar el error según tus necesidades
      }
    };
    obtenerTiposDeEvento();
  }, []);




    return (
    <div>
      <h2 className="CrearEvento">Editar Evento</h2>
      <form onSubmit={handleSubmit} className="tweet-composer">
      <div className="PrimeraFila">
      <div className="TituloEvento">

        
      <div className='Campovacio'>
    <label htmlFor="tituloEvento">Nombre del evento:</label>
    <div className="ColorCampoVacio">*</div>
  </div>
  <input
    type="text"
    id="tituloEvento"
    name="tituloEvento"
    placeholder="Nombre"
    value={tituloEvento}
    onChange={(e) => {
      const inputValue = e.target.value;
      if (!/^\D*$/.test(inputValue)) {
        return;
      }
      setTituloEvento(inputValue);
    }}
  />
        </div>




        <div className="horaEvento">
        <div className="Campovacio">
          <label htmlFor="horaEvento">Hora de inicio</label>
          <div className="ColorCampoVacio">*</div>
        </div>
        <input
          type="time"
          id="horaEvento"
          name="horaEvento"
          value={horaEvento}
          onChange={(e) => setHoraEvento(e.target.value)}
          required
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
        className={`FechaDesing ${fechaInicioError ? 'campo-vacio' : 'null'}`}
        type="date"
        id="fecha-inicio"
        name="fecha-inicio"
        value={fechaInicio}
        onChange={handleFechaInicioChange}
        onBlur={() => (setFechaInicioError(fechaInicio.trim() === "null"), setError(fechaInicio.trim() === "null"))}
        required
      />
      {(fechaFin < fechaInicio)&& <div className="ErrorForm">Fecha invalida</div>}
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
            onChange={handleFechaFinChange}
            onBlur={() => (setFechaFinError(fechaFin.trim() === "null"), setError(fechaFin.trim() === "null"))}
            required
          />
          
       
        </div>
      </div>


      <div className="SegundaFila">

<div className="composer-form">
    <div className="Ubicacion">
    <div className="Campovacio">
        <label htmlFor="ubicacion">Ubicación</label>
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
            <option value="null">-- seleccione --</option>
            <option value="Virtual">Virtual</option>
            <option value="Presencial">Presencial</option>
            <option value="Hibrida">Hibrida</option>
          </select>
        </div>
    </div>

 

    <div className="Campovacio">
        <label htmlFor="descripcion">Descripción</label>
      </div>
      <textarea
        id="descripcion"
        name="descripcion"
        placeholder="Descripcion del evento"
        rows="4"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      >
        
      </textarea>
      

      {(descripcion.length > 250)&& <div className="ErrorForm">máximo 250 caracteres alfanuméricos</div>}
    

      <div className="Participantes">
        <div>
          <label>Participación</label>
          <div>
            <label>
              <input
                type="radio"
                name="participacion"
                value="Individual"
                checked={participacion === "Individual"}
                onChange={(e) => (setParticipacion("Individual"), setMostrarParticipacion(false))}
                onBlur={() => (setParticipacionError(participacion.trim() === ""), setMostrarParticipacion(false))}
                className={participacionError ? "campo-vacio" : ""}
              />
              Individual
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="participacion"
                value="Grupal"
                checked={participacion === "Grupal"}
                onChange={(e) => (setParticipacion("Grupal"), setMostrarParticipacion(true))}
                onBlur={() => (setParticipacionError(participacion.trim() === ""), setMostrarParticipacion(true))}
                className={participacionError ? "campo-vacio" : ""}
              />
              Grupal
            </label>
          </div>
          
        </div >
        

        
        
        {MostrarParticipacion &&
        <div className='Participantes1'>
       <div>
          <div className="errorInf">
            <label htmlFor="numParticipantes">Número de participantes</label>
            {numParticipantesError && <p>*</p>}
          </div> 
          <input
            type="text"
            id="numParticipantes"
            name="numParticipantes"
            placeholder="Número de participantes"
            value={numParticipantes}
            onChange={(e) => setNumParticipantes(e.target.value)}
            onBlur={() => setnumParticipantesError(numParticipantes.trim() === "")}
            className={numParticipantesError ? "campo-vacio" : ""}
            required
          />
        </div>

        <div>

          <div className="errorInf">
          <label htmlFor="numEntrenadores">Número de entrenadores</label>
          {numEntrenadoresError && <p>*</p>}
          </div> 
          <input
            type="text"
            id="numEntrenadores"
            name="numEntrenadores"
            placeholder="Número de entrenadores"
            value={numEntrenadores}
            onChange={(e) => setNumEntrenadores(e.target.value)}
            onBlur={() => setNumEntrenadoresError(numEntrenadores.trim() === "")}
            className={numEntrenadoresError ? "campo-vacio" : ""}
            required
          />
        </div>
        </div>
      }
      </div>
      

      <div className="composer-form">
          <div className='Campovacio'>
            <label htmlFor="idTipoEvento">Seleccione el tipo de evento:</label>
            <div className="ColorCampoVacio">*</div>
          </div>
          <select
        id="idTipoEvento"
        name="idTipoEvento"
        value={idTipoEvento}
        onChange={(e) => setIdTipoEvento(e.target.value)}
        onBlur={() => (setIdTipoEventoError(idTipoEvento.trim() === '-- seleccione --'), setError(idTipoEvento.trim() === '-- seleccione --'))}
        className={idTipoEventoError ? 'campo-vacio' : ''}
        required
      >

        <option value="-- seleccione --">-- seleccione --</option>
        {tiposDeEvento.map((tipo) => (
          
          <option key={tipo.id} value={tipo.idTipoEvento}>
            {tipo.nombreTipoEvento}
            
          </option>
        ))}
      </select>
        </div>




















        {mostrarModalOpsEvento && 
         <Ops message="Opss el evento ya existe " onClose={handleOpsEvento}/>
        }


        {mostrarModalOps && 
         <Ops message="Opss Ocurrio un Error " onClose={handleOps}/> 
        }
        {mostrarModalSalir && (
        <ModalSalir message="Cancelar creación" onClose={handleButtonCancelarCE} />
        
      )}


     
        <div className="BotonPosicion">
          <button className="tweet-button" type="submit" onClick={handleInicioClick}>
            Cancelar
          </button>
          <button className="tweet-button" type="submit" onClick={handleSubmit}>
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarEvento;



/** 
{ActividadEditado[0].nombreActividad !=="" && ( 
  <div>
    <h2>Actividades del Evento</h2>
    <ul>
      {ActividadEditado.map((actividad, index) => (
        <li key={index}>
          <div>
            <label>
              Nombre de la Actividad:
              <input
                type="text"
                name="nombreActividad"
                value={actividad.nombreActividad}
                onChange={(e) => ""Actividad(e, index)}
              />
            </label>
          </div>
          <div>
            <label>
              Fecha inicio de la actividad:
              <input
                type="text"
                name="fechaInicioActividad"
                value={actividad.fechaInicioActividad}
                onChange={(e) => ""Actividad(e, index)}
              />
            </label>
          </div>
          <div>
            <label>
              Hora inicio de la Actividad:
              <input
                type="text"
                name="horaInicioActividad"
                value={actividad.horaInicioActividad}
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>

          <div>
            <label>
              Ubicacion de la Actividad:
              <input
                type="text"
                name="ubicacionActividad"
                value={actividad.ubicacionActividad}
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>
          <div>
          <label>
             Modalidad de la actividad:
              <input
                type="text"
                name="modalidad"
                value={actividad.modalidad}
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>

          {actividad.nombreActividad !=="" && (

          <div>
          <label>
          Descripcion de la actividad:
              <input
                type="text"
                name="descripcionActividad"
                value={actividad.descripcionActividad}
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>
          )}
          <br />

          <div>
            <label>
              Fecha fin de la actividad:
              <input
                type="text"
                name="fechaFinActividad"
                value={actividad.fechaFinActividad} 
                onChange={(e) => handleInputChangeActividad(e, index)}
              />
            </label>
          </div>
          <br />
        </li>
      ))}
    </ul>
  </div>
)}

{Reglas[0].nombreRegla!=="" && (
  <div>
         <h2>Reglas del Evento</h2>
        <ul>
        {Reglas.map((regla, index) => (
  <li key={index}>
    <div>
      <label>
        Nombre de la Regla:
        <input
          type="text"
          name="nombreRegla"
          value={regla.nombreRegla}
          onChange={(e) => handleInputChangeReglas(e, index)}
        />
      </label>
    </div>

    {regla.descripcionRegla!=="" && (
      <div>
      <label>
        Descripción de la Regla:
        <input
          type="text"
          name="descripcionRegla"
          value={regla.descripcionRegla}
          onChange={(e) => handleInputChangeReglas(e, index)}
        />
      </label>
    </div>)}
    <br />
  </li>
))}       
 </ul>
   </div>
)}
     
     {Requisitos[0].nombreRequisito!== "" && (
  <div>
        <h2>Requisitos del Evento</h2>
        <ul>
        {Requisitos.map((requisito, index) => (
  <li key={index}>
    <div>
      <label>
        Nombre de la Requisito:
        <input
          type="text"
          name="nombreRequisito"
          value={requisito.nombreRequisito}
          onChange={(e) => handleInputChangeRequisitos(e, index)}
        />
      </label>
    </div>
    {requisito.descripcionRequisito!== "" && (
     <div>
      <label>
        Descripción de la Requisito:
        <input
          type="text"
          name="descripcionRequisito"
          value={requisito.descripcionRequisito}
          onChange={(e) => handleInputChangeRequisitos(e, index)}
        />
      </label>
    </div>)}
    <br />
    
  </li>
))}
        </ul> 
         </div>
)}*/