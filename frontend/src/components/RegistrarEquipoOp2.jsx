import './assets/FormularioRegistrarEquipo.css'
import axios from "../components/api/conexionApi";
import { useEffect, useState } from 'react';
import './assets/Titulo.css'
import validate from './utils/Validaciones';
//import  './assets/registroParticipantes.css'
import SuccessMessage from './ModalRegistroExitosoEquipo';
import ErrorMessage from './ModalErrorRegistro';
import ModalSalir from './ModalParaSalirEquipoDel';
import VacioEntrePartiError from './ModalCampoVacioEntrenadorParticipante';

import ModalParticipantes from './ModalRegistrarParticipanteToEquipo'
import ModalEntrenadores from './ModalRegistroEntrenadores'

import './assets/formRegistrarEquipo2.css'
//const numero=2;

const FormularioRegistrarEquipo = ({numero, varIdEquipo, numEntre, numParti}) => {
//modales---------------
//Modal participante---------------------------------------------------------------------------------------
const [showPartcipantesToEquipoModal, setShowPartcipantesToEquipoModal] = useState(false);

const closeParticipantesModal = () => {
  setShowPartcipantesToEquipoModal(false);
};

const openParticipantesModal = () => { 
  setShowPartcipantesToEquipoModal(true);
};

//Modal Entrenadores-----------------------------------------------------------------------------------
const [showEntrenadoresToEquipoModal, setShowEntrenadoresToEquipoModal] = useState(false);

const closeEntrenadoresModal = () => {
  setShowEntrenadoresToEquipoModal(false);
};

const openEntrenadoresModal = () => { 
  setShowEntrenadoresToEquipoModal(true);
};

//Modal Salir-----------------------------------------------------------------------------
const [mostrarModalSalir, setMostrarModalSalir] = useState(false);
  const handleInicioClick = () => {
    setMostrarModalSalir(true);
  };
  const handleCloseModalSalir = () => {
    setMostrarModalSalir(false);
  };

  //Modal vacio entrnador y participante -----------------------------------------------------------------------

  const [showVacioEntrePartiError, setVacioEntrePartiError] = useState(false);

  const closeVacioEntrePartiError= () => {
    setVacioEntrePartiError(false);
  };
//------------------------------------------------------------------------------------------------
const actualizarEntrenadores = () => {
  axios.get(`obtenerEntrenadoresPorEquipo/${varIdEquipo}`)
    .then(response => {
      setEntrenadores(response.data.entrenadores);
    })
    .catch(error => {
      console.error('Error al recuperar Entrenadores:', error);
    });
};

const actualizarParticipantes = () => {
  axios.get(`obtenerParticipantesYPersonasPorEquipo/${varIdEquipo}`)
    .then(response => {
      setParticipantes(response.data.participantes);
    })
    .catch(error => {
      console.error('Error al recuperar participantes:', error);
    });
};
 //mensaje modal error
  const [showErrorModal, setShowErrorModal] = useState(false);

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };
  //modal error

//mensajeModal exito
const [registroExitoso, setRegistroExitoso] = useState(false);
//fin modal exito-----------------------------------------------------------

//==================================================================================
  const [mensajeError, setMensajeError] = useState({
    nombreError: '',
    apellidoError: '',
    correoError: '',
    nombreEquipoError: '',
    descripcionEquipoError: '',
    idEntrenadorError: '',
    
  });

//participante------------------------------------------------------------
const [participantes, setParticipantes] = useState([]);
useEffect(() => {
    axios.get(`obtenerParticipantesYPersonasPorEquipo/${varIdEquipo}`)
      .then(response => {
        setParticipantes(response.data.participantes);
      })
      .catch(error => {
        console.error('Error al recuperar participantes:', error);
      });
  }, [varIdEquipo]); 


  //Eliminar Participantes---------------------------------------------------------------------------------
  const eliminarParticipantes = (index,id ) => {
        const nuevosParticipantes = [...participantes];
        nuevosParticipantes.splice(index, 1);
        setParticipantes(nuevosParticipantes);  
        eliminarParticipantesBD(id);   
  };
  const eliminarParticipantesBD = (id) => {
    axios.delete(`./eliminarParticipanteYPersona/${varIdEquipo}/${id}`)
    .then(response => {
    console.log(response.data.message);
    })
    .catch(error => {
    console.error('Error al eliminar el Entrenador:', error);
    });
};

//Entrendores-----------------------------------------------------------------------------
  const [Entrenadores, setEntrenadores] = useState([]);
  useEffect(() => {
    axios.get(`obtenerEntrenadoresPorEquipo/${varIdEquipo}`)
      .then(response => {
        setEntrenadores(response.data.entrenadores);
      })
      .catch(error => {
        console.error('Error al recuperar Entrenadores:', error);
      });
  }, [varIdEquipo]); 

//Eliminar Entrenadores----------------------------------------------------------------------------------
const eliminarEntrenadores = (index, id) => {
  console.log("index es  ",index)
  const nuevosEntrenadores = [...Entrenadores];
  nuevosEntrenadores.splice(index, 1);
  setEntrenadores(nuevosEntrenadores);
  eliminarEntrenadoresBD(id);

};

const eliminarEntrenadoresBD = (id) => {
  axios.delete(`./destroyEntrenador/${id}`)
  .then(response => {
  console.log(response.data.message);
  })
  .catch(error => {
  console.error('Error al eliminar el Entrenador:', error);
  });
};
//------------------------------------------------------------------------------------------------------

  //para equipo---------------------------------------------------------------------------------
  const [equipoData, setEquipoData] = useState({
    nombreEquipo:'',
    descripcionEquipo:'',
    idEvento:numero,
  });
  //------------------------------------------------------------------------------------------------------

  //handle equipo---------------------------------------------------------------
  const handleEquipoChange = (e) => {
    console.log("el id del equipo es",varIdEquipo);
    console.log("el id del evento es",numero);
    const { name, value } = e.target;
    switch(name){
      case 'nombreEquipo':
        const nombreRes=validate.validarEquipo(value);
        setMensajeError((mensajeError) => ({ ...mensajeError, nombreEquipoError: nombreRes }));
        if(nombreRes===""){
          
          setEquipoData((equipoData) => ({ ...equipoData, [name]: value }));
        }
      break;
      case 'descripcionEquipo':
      if(value.length >50){
        setMensajeError((mensajeError)=>({...mensajeError, descripcionEquipoError:"Ud. ha excedido el numero de caracteres"}));
      }else{
        setEquipoData((equipoData) => ({ ...equipoData, [name]: value }));
      }
      break;
      
      default:
        setEquipoData((equipoData) => ({ ...equipoData, [name]: value }));
      break;
    }    
  };

//---------------------------------------------------
//submit equipo 
const handleSubmitEquipo = (e) => {
  if (Entrenadores.length === 0 || participantes.length === 0) {
    console.log('Error: Trainers or participants are empty');
    setVacioEntrePartiError(true);
    setMensajeError((mensajeError) => ({ ...mensajeError, nombreEquipoError: validate.validarCampoVacio(equipoData.nombreEquipo) }));
    e.preventDefault();
  }else{
  //-----------------------------------------------
  setMensajeError((mensajeError) => ({ ...mensajeError, nombreEquipoError: validate.validarCampoVacio(equipoData.nombreEquipo) }));
  e.preventDefault();
  const formEquipo={
    nombreEquipo: equipoData.nombreEquipo,
    descripcionEquipo: equipoData.descripcionEquipo,
    idEvento:numero,
  }
console.log("el equipo a actualizar es", formEquipo)
axios.get(`buscarEquipo/${varIdEquipo}`)
    .then(response => {

              axios.put(`./actualizarEquipo/${varIdEquipo}`, formEquipo)
            .then(response =>  {
              console.log(response.data.message)  
              setRegistroExitoso(true)                 
                setEquipoData({
                  nombreEquipo: '',
                  descripcionEquipo: '',
                  idEvento:''
                });
         
          })      
          .catch((error) => {          
          console.error('Error al guardar equipo ', error);   
          setShowErrorModal(true);   
            }); 
          })
          .catch((error) => {
              console.error('Error al buscar equipo ', error);
              setVacioEntrePartiError(true);
          });
        }    
         
  };
 //------------------------------------------------------------------------------------------------------
 

  return (
    
    <div className= 'contenedor-form-RPE '>
    <form onSubmit={handleSubmitEquipo}>
      <h1 className='titulo-1'>Formulario para registrar equipo</h1>
      <br/>
      <p>Es importante que llene los datos para su equipo correctamente, dado que una vez quede registrado no podra realizar modificaciones. Gracias y buena suerte.</p>
      <br/>
      
      <label className='obligatorio-RPE' htmlFor="nombreEquipo">
        Nombre del Equipo:
        </label>
        <input
          name="nombreEquipo"
          value={equipoData.nombreEquipo}
          placeholder="Ingresa el nombre de tu equipo"
          onChange={handleEquipoChange}
        />
        <p style={{ color: 'red' }}>{mensajeError.nombreEquipoError}</p>
     
      <br />
      <label>
        Descripción del Equipo:
        </label>
        <input
          name="descripcionEquipo"
          value={equipoData.descripcionEquipo}
          onChange={handleEquipoChange}
        />
      <p style={{ color: 'red' }}>{mensajeError.descripcionEquipoError}</p>  
      
      
      <br />
      <p>Ingresar los datos del entrenador del equipo</p>
     
      <label>
       Añadir Entrenadores 
        </label>
        {/* Renderización de requisitos */}
        <div className="RPE-container">
        <div className="RPE-distribution">
          {Entrenadores.length > 0 &&
            Entrenadores.map((entrenador, index) => (
              <div key={index} className="RPE-container">
                <input  type="text" 
                placeholder="Entrenadores del evento"
                 value={entrenador.nombreEntrenador} 
                 readOnly />
                <button type="button" onClick={() => eliminarEntrenadores(index, entrenador.idEntrenador)} className="BotRequisitos-RPE">
                  <img src="https://cdn-icons-png.flaticon.com/512/6722/6722986.png" alt="" className="iconoEliminar-RPE"/>
                </button>
              </div>
            ))}
          <div className="RPE-container">
          
          </div>
        </div>
      </div>
      <div className='button-container-RPE'>
      {Entrenadores.length < numEntre && (
        <button className="buttonRequisitos1-RPE" type="button" onClick={() => openEntrenadoresModal()}>
          + 
        </button>
)}
      </div>
      {showEntrenadoresToEquipoModal && (
        <ModalEntrenadores 
        evento={numero} 
        idEquipoE={varIdEquipo} 
        equipo={equipoData}
        onCloseSelf={closeEntrenadoresModal}
        onOpenSecondaryModal={openEntrenadoresModal}
        onCloseParent={closeEntrenadoresModal}
        onUpdateParent={actualizarEntrenadores} 
        />
      )}



      <label>
       Añadir participantes
        </label>
        <div className="RPE-container">
        <div className="RPE-distribution">
          {participantes.length > 0 &&
            participantes.map((participante, index) => (
              <div key={index} className="RPE-container">
                <input  type="text" 
                placeholder="participantes del equipo"
                 value={participante.persona.nombrePersona} 
                 readOnly />
                <button type="button" onClick={() => eliminarParticipantes(index,participante.persona.idPersona)} className="BotRequisitos-RPE">
                  <img src="https://cdn-icons-png.flaticon.com/512/6722/6722986.png" alt="" className="iconoEliminar-RPE"/>
                </button>
              </div>
            ))}
          <div className="RPE-container">
          
          </div>
        </div>
      </div>
      <div className='button-container-RPE'>
      {participantes.length < numParti && (
        <button className="buttonRequisitos1-RPE" type="button" onClick={() => openParticipantesModal()}>
          + 
        </button>
      )}
      </div>
      {showPartcipantesToEquipoModal && (
  <ModalParticipantes 
    evento={numero}
    idEquipoE={varIdEquipo}
    equipo={equipoData}
    onCloseSelf={closeParticipantesModal}
    onOpenSecondaryModal={openParticipantesModal}
    onCloseParent={closeParticipantesModal}
    onUpdateParent={actualizarParticipantes} 
  />
)}
      
      <div className='button-container-RPE'>
          <button className="blue-button-RPE" type="button" onClick={() => handleInicioClick()}>Salir</button>
          <button className="blue-button-RPE" type="submit">Registrar</button>
       </div>      
      
   
    {registroExitoso && <SuccessMessage message="¡Registro exitoso!"/>}
      {showErrorModal && (
        <ErrorMessage message="Ha ocurrido un error al realizar el registro, intentelo nuevamente" idEquipo={varIdEquipo} onClose={closeErrorModal} />
      )}
        {showVacioEntrePartiError && (
        <VacioEntrePartiError message={`Por favor Registra a los miembros de su equipo, con ${numEntre} entrenadores y ${numParti} participantes`}  onClose={closeVacioEntrePartiError} />
      )}
      {mostrarModalSalir && (
        <ModalSalir message="¿Quiere abandonar el registro?" onClose={handleCloseModalSalir} />
      )}
   </form> 
    </div>
 
  );
};
export default FormularioRegistrarEquipo;