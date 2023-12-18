import React, { useState } from 'react';
import axios from '../components/api/conexionApi.js';
import '../components/assets/FormCrearEvento.css';
import ModalRequisito from './ModalRequisito';
import ModalRegla from './ModalReglas';
import ModalActividad from './ModalActividades';
import ModalCreacionEvento from './ModalEventoCreadoExitosamente.jsx';
import {uploadFile} from '../Firebase/config.js'




const EventForm = (ultimoId) => {


  // Formuraio
  const [fechaInicio,                 setFechaInicio]           =    useState('null');
  const [fechaFin,                    setFechaFin]              =    useState('null');
  const [participacion,               setParticipacion]         =    useState('0');
  const [numEntrenadores,             setNumEntrenadores]       =    useState('0');
  const [numParticipantes,            setNumParticipantes]      =    useState("");
  const [imagen,                      setImagen]                =    useState("");
  const [file,                        setFile]                  =    useState(null)
  const [horaInicio,                  setHoraInicio]            =    useState(""); 
  const [ubicacion,                   setUbicacion]             =    useState("");
  const [modalidad,                   setModalidad]             =    useState("");
  const [descripcionActividad,        setDescripcionActividad]  =    useState("");
  const [actividad,                   setActividad]             =    useState('');


// Formuraio Array
  const [reglas,                      setReglas]      = useState([]);
  const [requisitos,                  setRequisitos]  = useState([]);
  const [actividades,                 setActividades] = useState([]);


// Vistas Modales
const [mostrarVentanaRequisitos,          setMostrarVentanaRequisitos] =  useState(false);
const [mostrarVentanaReglas,              setMostrarVentanaReglas]     =  useState(false);
const [mostrarVentanaActividad,           setMostrarVentanaActividad]  =  useState(false);
const [MostrarParticipacion,              setMostrarParticipacion]     =  useState(false);
const [mostrarModalSalir,                 setMostrarModalSalir]        =  useState(false);
const [modalVisible,                      setModalVisible]             =  useState(false);

  
//Constantes de Error
  const [numParticipantesError,       setNumParticipantesError] = useState(false);
  const [fechaInicioError,            setFechaInicioError] = useState(false);
  const [fechaFinError,               setFechaFinError] = useState(false);
  const [participacionError,          setParticipacionError] = useState(false);
  const [numparticipacionError,       setnumParticipantesError] = useState(false);
  const [numEntrenadoresError,        setNumEntrenadoresError] = useState(false);
  const [actividadError,              setActividadError] = useState(false);
  
  const [errorActividades,              setActividadesError] = useState(false);



  const [nombreRegla,                 setNombreRegla] = useState('');
  const [descripcionRegla,            setDescripcionRegla] = useState('');
  const [nombreRequisito,             setNombreRequisito] = useState('');
  const [descripcionRequisito,        setDescripcionRequisito] = useState('');
  
 

// Funciones Abrir - Cerrar Modales
  const mostrarVentanaActividadEmergente  = () => {    setMostrarVentanaActividad(true);};
  const cerrarVentanaActividadEmergente   = () => {    setMostrarVentanaActividad(false);};
  const mostrarVentanaReglasEmergente     = () => {    setMostrarVentanaReglas(true);};
  const cerrarVentanaReglasEmergente      = () => {    setMostrarVentanaReglas(false);};
  const mostrarVentanaEmergente           = () => {    setMostrarVentanaRequisitos(true);};
  const cerrarVentanaEmergente            = () => {    setMostrarVentanaRequisitos(false);};

// Funciones redirecciones
  const handleButtonGuardarCE = () => {    window.location.href = '/Home';};
  const handleButtonCancelarCE = () => {
    const nuevaURL = '/ConfigurarEvento/?miBooleano=true';
    window.location.href = nuevaURL;
  };







// Funciones Requisitos
  const agregarRequisito = () => {
    const nuevoRequisito = { nombre: nombreRequisito, descripcion: descripcionRequisito };
    setRequisitos([...requisitos, nuevoRequisito]);
    setNombreRequisito('');
    setDescripcionRequisito('');
    cerrarVentanaEmergente();
  };

  const eliminarRequisito = (index) => {
    const nuevosRequisitos = [...requisitos];
    nuevosRequisitos.splice(index, 1);
    setRequisitos(nuevosRequisitos);
  };



  

// Funciones Reglas
  const agregarRegla = () => {
    const nuevoReglas = { nombre: nombreRegla, descripcion: descripcionRegla };
    setReglas([...reglas, nuevoReglas]);
    setNombreRegla('');
    setDescripcionRegla('');
    cerrarVentanaReglasEmergente();
  };
  
  const eliminarReglas = (index) => {
    const nuevasReglas = [...reglas];
    nuevasReglas.splice(index, 1);
    setReglas(nuevasReglas);
  };

// Funciones Actividades
const agregarActividad = () => {
  const nuevaActividad = { nombre: actividad, };
  setActividades([...actividades, nuevaActividad]);
  setActividad('');
  setFechaInicio('null');
  setFechaFin('null');
  setActividadError(false);
  setFechaInicioError(false);
  setFechaFinError(false);
  cerrarVentanaEmergente();
};

const eliminarActividad = (index) => {
  const nuevasActividades = [...actividades];
  nuevasActividades.splice(index, 1);
  setActividades(nuevasActividades);
};

// Funcion para Imagen
  const handleImagenChange = (e) => {
    const file2 = e.target.files[0];
    if (file2) {
      setImagen(file2);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && reader.result.startsWith("data:image")) {
        } else {
          console.error("El archivo seleccionado no es una imagen válida.");
          setImagen(null);
        }
      };
      reader.readAsDataURL(file2);
    }
  };


  // Funcion Principal
  const handleSubmit = async (e) => {
    



    e.preventDefault();
    
  
    try {
      if (actividades.length === 0) {
        setActividadesError(true);
      }else{
        if(participacion == "Individual"){
          setNumParticipantes("1");
        }

        if(numParticipantes == 0 || imagen == ""){

        }else{
          
          setActividadesError(false);
      const response = await axios.get('http://localhost:8000/api/obtenerUltimoIdEvento');
      const ultimoId = response.data.ultimoId;
      const eventId = ultimoId;
     


      const imagenId = await uploadFile(file);
      

      const nuevoEvento={
        idEvento:eventId,
        participacion: participacion,
        numParticipantes:numParticipantes,
        numEntrenadores:numEntrenadores,
        aficheEvento:imagenId
      }
      await axios.put(`./eventoActualizar/${eventId}`, nuevoEvento);


      console.log('Evento creado con éxito');
      setModalVisible(true);
      setMostrarModalSalir(true);
      }
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
  }







  
  return (
    <form onSubmit={handleSubmit} className="tweet-composer">
      
      <h1 className="CrearEvento">Crear Evento 2/2 </h1>
        <div className="SubirImagen">
        <div className='Campovacio'>
          <label htmlFor="afiche">Afiche del evento:</label>
          <div className="ColorCampoVacio">*</div>
        </div>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={(e) => {
            handleImagenChange(e);
            setFile(e.target.files[0]);
            
          }}
          required 
        />  
        <label htmlFor="image" className="upload-container">
        {imagen ? (
          <img
            id="image-preview"
            src={URL.createObjectURL(imagen)}
            alt="Vista previa"
          />
          
        ):(
          
          <div>
            <div className="upload-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/883/883787.png" alt="Upload Icon" />
            </div>
          <div className="upload-text">Haz clic aquí para subir un Afiche</div>
        </div>
        )}
      </label>
    </div>






    <div className='Campovacio'>
    <label htmlFor="Requisitios">Requisitos:</label>
      </div>
    
      {/* Componente del modal */}
      <div className="AlinicaionModal">
        <ModalRequisito
          mostrar={mostrarVentanaRequisitos}
          cerrar={cerrarVentanaEmergente}
          nombre={nombreRequisito}
          descripcion={descripcionRequisito}
          setNombre={setNombreRequisito}
          setDescripcion={setDescripcionRequisito}
          agregarRequisito={agregarRequisito}
          
        />
      </div>
      
      {/* Renderización de requisitos */}
      <div className="Requisitos">
        <div className="distribucionReque">
          {requisitos.length > 0 &&
            requisitos.map((requisito, index) => (
              <div key={index} className="Requisitos">
                <input type="text" placeholder="Requisitos del evento" value={requisito.nombre} readOnly />
                <button type="button" onClick={() => eliminarRequisito(index)} className="BotRequisitos">
                  <img src="https://cdn-icons-png.flaticon.com/512/6722/6722986.png" alt="" className="iconoEliminar"/>
                </button>
              </div>
            ))}
          <div className="Requisitos">
          
          </div>
        </div>
      </div>
      <div className="ConfbuttonRequisitos">
        <button className="buttonRequisitos1" type="button"  onClick={mostrarVentanaEmergente}>
          +
        </button>
      </div>


  

  <div className='Campovacio'>
    <label htmlFor="Reglas">Reglas:</label>
  </div>

{/* Componente del modal */}
<div className="AlinicaionModal">
  <ModalRegla
    mostrar={mostrarVentanaReglas}
    cerrar={cerrarVentanaReglasEmergente}
    nombre={nombreRegla}
    descripcion={descripcionRegla}
    setDescripcion={setDescripcionRegla}
    setNombre={setNombreRegla}
    agregarRegla={agregarRegla}
  />
</div>

{/* Renderización de reglas */}
<div className="Reglas">
  <div className="distribucionReque">
    {reglas.length > 0 &&
      reglas.map((reglas, index) => (
        <div key={index} className="Requisitos">
          <input type="text" placeholder="Reglas del evento" value={reglas.nombre} readOnly />
          <button type="button" onClick={() => eliminarReglas(index)} className="BotRequisitos">
            <img src="https://cdn-icons-png.flaticon.com/512/6722/6722986.png" alt="" className="iconoEliminar"/>
          </button>
        </div>
      ))}
    <div className="Reglas">
    </div>
  </div>
</div>

<div className="ConfbuttonRequisitos">
  <button className="buttonRequisitos1" type="button" onClick={mostrarVentanaReglasEmergente}>
    +
  </button>
</div>




<div>
      <div className='Campovacio'>
        <label htmlFor="Actividad">Actividad:</label>
        <div className="ColorCampoVacio">*</div>
      </div>

      {/* Componente del modal */}
      <div className="AlinicaionModal">
        <ModalActividad
          mostrar={mostrarVentanaActividad}
          cerrar={cerrarVentanaActividadEmergente}
          actividad={actividad}
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          horaInicio={horaInicio}
          ubicacion={ubicacion}
          modalidad={modalidad}
          descripcionActividad={descripcionActividad}
          setActividad={setActividad}
          setFechaInicio={setFechaInicio}
          setFechaFin={setFechaFin}
          setHoraInicio={setHoraInicio}
          setUbicacion={setUbicacion}
          setModalidad={setModalidad}
          setDescripcionActividad={setDescripcionActividad}
          agregarActividad={agregarActividad}
        />
      </div>

      {/* Renderización de actividades */}
      <div className="Reglas">
        <div className="distribucionReque">
          {actividades.length > 0 &&
            actividades.map((actividades, index) => (
              <div key={index} className="Acividades">
                {/* Mostrar detalles de la actividad */}
                <input type="text" placeholder="Actividad" value={actividades.nombre} readOnly />
                {/* Botón para eliminar la actividad */}
                <button type="button" onClick={() => eliminarActividad(index)} className="BotRequisitos">
                  <img src="https://cdn-icons-png.flaticon.com/512/6722/6722986.png" alt="" className="iconoEliminar" />
                </button>
              </div>
            ))}
          <div className="Reglas"></div>
        </div>
      </div>





      <div className="ConfbuttonRequisitos">
        <button className="buttonRequisitos1" type="button" onClick={mostrarVentanaActividadEmergente}>
          +
        </button>
      </div>
    </div>











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
                onChange={(e) => (setParticipacion(e.target.value), setMostrarParticipacion(false))}
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
                onChange={(e) => (setParticipacion(e.target.value), setMostrarParticipacion(true))}
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

      








     


      <div className="container">
        <div className="other-elements"></div>
        <div>
          <button className="tweet-button" type="submit" onClick={handleButtonCancelarCE}>
            Atras
          </button>
          <button className="tweet-button" type="submit" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>

      {errorActividades &&
        <div className="ErrorForm">Debe ingresar al menos una actividad</div>
      }
      
      
      {imagen == "" &&
        <div className="ErrorForm">Debe ingresar una Imagen</div>
      }


      {(mostrarModalSalir) && (
        <ModalCreacionEvento message="Crear Evento" onClose={handleButtonCancelarCE} />
          
        )}
  </form>
  );
};

export default EventForm;