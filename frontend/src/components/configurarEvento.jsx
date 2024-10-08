import React, { useState, useEffect  } from 'react';
import axios from './api/conexionApi';
import '../components/assets/FormCrearEvento.css';
import Alert from'./Alert';
import ModalSalir from './ModalCancelarCreacion';
//import Validaciones from './utils/Validaciones';
import Ops from './modalOpss';
const EventForm =
 () => {

   
  
  const [tituloEvento,  setTituloEvento]  = useState('');
  const [horaEvento,    setHoraEvento]    = useState('--:--');
  const [fechaInicio,   setFechaInicio]   = useState('null');
  const [fechaFin,      setFechaFin]      = useState('null');
  const [ubicacion,     setUbicacion]     = useState("");
  const [idTipoEvento,  setIdTipoEvento]  = useState('');
  const [modalidad,     setModalidad]     = useState('-- seleccione --');
  const [descripcion,   setDescripcion]    = useState('');
  const [tituloEventoError,   setTituloEventoError] =   useState(false);
  const [horaEventoError,     setHoraEventoError] =     useState(false);
  const [fechaInicioError,    setFechaInicioError] =    useState(false);
  const [fechaFinError,       setFechaFinError] =       useState(false);
  const [modalidadError,      setModalidadError] =      useState(false);
  const [idTipoEventoError,   setIdTipoEventoError] =   useState(false);
  const [ubicacionError,      setUbicacionError] =      useState(false);
  //const [descripcionError,    setDescripcionError] =    useState(false);
  const [modalVisible,        setModalVisible] =        useState(false);
  const [Error,               setError] =               useState(false);
  const [mostrarModalSalir,   setMostrarModalSalir] =   useState(false);
  const [mostrarModalOps,   setMostrarModalOps] =   useState(false);
  const [mostrarModalOpsEvento,   setMostrarModalOpsEvento] =   useState(false);
 // const [Bandera,   setBandera] =   useState(false);

  const handleInicioClick       = () => {setMostrarModalSalir(true);};  
  const handleButtonCancelarCE  = () => {setMostrarModalSalir(false);};
  const handleOps               = () => {setMostrarModalOps(false);};
  const handleOpsEvento               = () => {setMostrarModalOpsEvento(false);};

  const urlParams = new URLSearchParams(window.location.search);
  
  const miBooleano = urlParams.get('miBooleano');


  const [tiposDeEvento, setTiposDeEvento] = useState([]);



  useEffect(() => {
    const obtenerTiposDeEvento = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/obtener-tipos-de-evento');
        console.log(response.data.tiposDeEvento); // Imprime la respuesta en la consola
        setTiposDeEvento(response.data.tiposDeEvento);
      } catch (error) {
        console.error('Error al obtener tipos de evento:', error);
        // Manejar el error según tus necesidades
      }
    };
    obtenerTiposDeEvento();
  }, []);





















  const obtenerEvento = async () => {
  try {
    
  const response2 = await axios.get('./obtenerUltimoIdEvento');
  const ultimoId2 = response2.data.ultimoId;
  const response = await axios.get(`./obtener-evento/${ultimoId2}`);
  
  const responseActividad = await axios.get(`./obtener-actividad/${ultimoId2}`); 
  const responseTipo = await axios.get(`./obtener-tipo-evento/${response.data.evento.idTipoEvento}`);
  
if (miBooleano === "true") {


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
    
  } else {
  }
   
  } catch (error) {
    console.error('Error al obtener el evento:', error);
  }
  };


if ('' === tituloEvento){
  obtenerEvento();
  
}else{

} 
 















  const handleFechaInicioChange = (e) => {
    const nuevaFecha = e.target.value;
    const fechaActual = new Date().toISOString().split('T')[0];

    // Validar que la nueva fecha no sea anterior a la actual
    if (nuevaFecha < fechaActual) {
      setFechaInicioError(true);
    } else {
      setFechaInicioError(false);
      setFechaInicio(nuevaFecha);
    }
  };




  const handleSubmit = async (e) => {e.preventDefault();


    try {

      
     
        
      

      const nombExist = await axios.get(`./verificar-nombre-existente/${tituloEvento}`);
      console.log(nombExist.data.existeNombre);
      if( tituloEvento ===""     || 
          horaEvento === "00:00" || 
          fechaInicio === "null" || 
          fechaFin === "null"    || 
          fechaFin < fechaInicio ||
          nombExist.data.existeNombre){
            

            if(nombExist.data.existeNombre){
              setMostrarModalOpsEvento(true)
            }

            if(tituloEvento ===""     || 
            horaEvento === "00:00" || 
            fechaInicio === "null" || 
            fechaFin === "null"    || 
            fechaFin < fechaInicio){
              setMostrarModalOps(true);
              setError(true);
            }
        
      }else{
      const response = await axios.get('./obtenerUltimoIdEvento');
      
      const ultimoId = response.data.ultimoId + 1;
        

      await axios.post('./evento', {
        idEvento: ultimoId,
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
      await axios.post('./postActividad', {
        nombreActividad:"Cronograma general",
        descripcionActividad:descripcion,
        modalidad:modalidad,
        fechaInicioActividad:fechaInicio,
        fechaFinActividad:fechaFin,
        horaInicioActividad:horaEvento,
        ubicacionActividad:ubicacion,
        idEvento:ultimoId
      });


      console.log('Evento creado con éxito');
      setModalVisible(true);
      
      window.location.href =`/CrearEvento/${ultimoId}`;
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
    <form onSubmit={handleSubmit} className="tweet-composer">
      <h1 className="CrearEvento">CREAR EVENTO 1/2</h1>
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
    onBlur={() => (setTituloEventoError(tituloEvento.trim() === ""), setError(tituloEvento.trim() === ""))}
    className={tituloEventoError ? "campo-vacio" : ""}
  />
  
  {(tituloEvento.length > 60) && <div className="ErrorForm">Máximo 60 caracteres</div>}
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
          onBlur={() => (setHoraEventoError(horaEvento.trim() === "--:--"), setError(horaEvento.trim() === "--:--"))}
          className={horaEventoError ? "campo-vacio" : "--:--"}
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
          {(fechaFin < fechaInicio)&& <div className="ErrorForm">Fecha invalida</div>}
       
        </div>
      </div>

      <div className="SegundaFila">
        
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
    

      <div className="container">
        <div className="CreadoExitosamente">
          

          {(Error) && <Alert/>}
          
        </div>
        <div className="BotonPosicion">
          <button className="tweet-button" type="submit" onClick={handleInicioClick}>
            Cancelar
          </button>
          <button className="tweet-button" type="submit" onClick={handleSubmit}>
            Siguiente
          </button>
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
      </div>
  </form>
  );
};

export default EventForm;
