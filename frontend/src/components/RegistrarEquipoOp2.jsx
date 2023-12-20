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

import ModalPersonaEncontrada from './ModalPersonaEncontrada'
import iso3166 from 'iso-3166-1-alpha-2';
const paises = iso3166.getCodes();

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

const [formData, setFormData] = useState({
  idPersona: '',
  nombrePersona: '',
  apellidoPersona: '',
  genero: '',
  pais: 'BO',
  correo:'',
});


//para el error
const [mensajeError, setMensajeError] = useState({
  ciParticipanteError:'',
  nombreParticipanteError:'',
  ApellidoParticipanteError:'',
  generoParticipanteError:'',
  paisParticipanteError:'',
  correoParticipanteError:'',
  nombreEquipoError: '',
    descripcionEquipoError: '',
 
});
//---------------------------------------------------------------------------
const [inputDisabled, setInputDisabled] = useState(false);

const bloquearInput = () => {
  setInputDisabled(true);
};

const [mensajeErrorModal, setMensajeErrorModal] = useState("");

//-------------------------------------------------------

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
const closeExitorModal = () => {
  setRegistroExitoso(false);
};
//fin modal exito-----------------------------------------------------------

//==================================================================================

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
    axios.get(`encontrarIdEntrenadoresPorEquipos/${varIdEquipo}`)
      .then(response => {
        setEntrenadores(response.data.entrenadores);
      })
      .catch(error => {
        console.error('Error al recuperar Entrenadores:', error);
      });
  }, [varIdEquipo]); 

//Eliminar Entrenadores----------------------------------------------------------------------------------
const eliminarEntrenadores = (index, id,eq) => {
 // console.log("index es  ",index)
  const nuevosEntrenadores = [...Entrenadores];
  nuevosEntrenadores.splice(index, 1);
  setEntrenadores(nuevosEntrenadores);
  eliminarEntrenadoresBD(id,eq);

};

const eliminarEntrenadoresBD = (id,eq) => {
  axios.delete(`./destroyEntrenador/${id}/${eq}`)
  .then(response => {
  //console.log(response.data.message);
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


  //-==================================
  const handleChangeCorreo = (e) => {
    const { name, value } = e.target;
    const mail=validate.validarCorreo(value);
    if(mail!==""){
      const datoCorreo=validate.devolverCorreo(value);
      setFormData({
        ...formData,
        [name]: datoCorreo,
    })
      setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: mail }));
    }else{
      setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: "" }));

      setFormData({
        ...formData,
        [name]: value,
    })    }
}
//=================
const handleChangePC = (e) => {
  const pai = e.target.value;
  if(!formData.idPersona){
      setMensajeError((mensajeError) => ({ ...mensajeError, ciParticipanteError: `Este campo no puede estar vacío.`}));
        setFormData({
        ...formData,
        pais: pai || 'BO', 
      });
  }else{      
      setFormData({
        ...formData,
        pais: pai || 'BO',
      });
      buscarPersona(pai, formData.idPersona);
      console.log("el pais id es ",formData.idPersona)
 
}
};
//--------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
const [isModalOpenPersona, setIsModalOpenPersona] = useState(false);
  const [personData, setPersonData] = useState(null);
   
    const cerrarModalPersona = () => {
      setIsModalOpenPersona(false);
    };
   

    const cambiarDatoModalPersona = () => {
      setFormData({
        idPersona: personData.idPersona,
        nombrePersona: personData.nombrePersona,
        apellidoPersona: personData.apellidoPersona,
        genero: personData.genero,
        pais: personData.pais,
        correo: personData.correo,
      });

      setMensajeError((mensajeError) => ({ ...mensajeError, nombreParticipanteError:'' }));
setMensajeError((mensajeError) => ({ ...mensajeError, ApellidoParticipanteError: ''}));
setMensajeError((mensajeError) => ({ ...mensajeError, ciParticipanteError: ''}));
setMensajeError((mensajeError) => ({ ...mensajeError, generoParticipanteError:''}));
setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: '' }));
setMensajeError((mensajeError) => ({ ...mensajeError, nombreEquipoError: '' }));
setIsModalOpenPersona(false);
bloquearInput();

};
//----------------------------------------------------------------
const buscarPersona = async (elpais,cipersonsa)=>{
  try{     
    const response = await axios.get(`./buscarPorId/${elpais}/${cipersonsa}`);
     if(!response.data.persona){
      console.log("no hay coincidencias",elpais)
      
     }else{
      setPersonData(response.data.persona);
      setIsModalOpenPersona(true);
      console.log("si hay coincidencias",personData);
      console.log("es truuue?", isModalOpenPersona);
      console.log("Estados actualizados:", personData, isModalOpenPersona);

     }
     console.log("si hay coincidencias",personData);
     console.log("es truuue?", isModalOpenPersona);
} catch (error) { 
  console.error("hubo un error al buscar persona",personData);

}
}
useEffect(() => {
  if (isModalOpenPersona && personData) {
    console.log("Datos actualizados en el modal:", personData);
    // Puedes realizar acciones adicionales aquí después de la actualización del estado.
  }
}, [isModalOpenPersona, personData]);
//---------------------------------------
const handleChange = (e) => {
  const { name, value } = e.target;
  switch (name) {
    case 'nombrePersona':
      const nombreRes=validate.validarNombre(value);
      setMensajeError((mensajeError) => ({ ...mensajeError, nombreParticipanteError: nombreRes }));
      if(nombreRes===""){
        setFormData({
          ...formData,
          [name]: value,
      })
    } else{
      const nombreNew=validate.devolverNombre(value);
      setFormData({
        ...formData,
        [name]: nombreNew,
    })
    }      
      break;
        case 'apellidoPersona':
          const apellidoRes=validate.validarNombre(value);
          setMensajeError((mensajeError) => ({ ...mensajeError, ApellidoParticipanteError: apellidoRes }));
          if(apellidoRes===""){
            const apellidoNew=validate.devolverNombre(value);
            setFormData({
              ...formData,
              [name]: apellidoNew,
          })
        }
          break;
          case 'idPersona':
            const ciRes=validate.validarCI(value);
            setMensajeError((mensajeError) => ({ ...mensajeError, ciParticipanteError: ciRes }));
            if(ciRes===""){
              setFormData({
                ...formData,
                [name]: value,
            })
            buscarPersona(formData.pais, value);

          }else{
            const ciNew=validate.devolverCI(value);
              setFormData({
                ...formData,
                [name]: ciNew,})
                buscarPersona(formData.pais, ciNew);

          }
          break;
  

    default:
      setFormData({
        ...formData,
        [name]: value,
      });
  }
};

  //handle equipo---------------------------------------------------------------
  const handleEquipoChange = (e) => {
    
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
  e.preventDefault();
    if(personData) {
      //procesoSubm();
      verifyNameGroup();
    }else{
  //ERRORES
 //console.log("en el submit");
setMensajeError((mensajeError) => ({ ...mensajeError, nombreParticipanteError: validate.validarCampoVacio(formData.nombrePersona) }));
setMensajeError((mensajeError) => ({ ...mensajeError, ApellidoParticipanteError: validate.validarCampoVacio(formData.apellidoPersona) }));
setMensajeError((mensajeError) => ({ ...mensajeError, ciParticipanteError: validate.validarCampoVacio(formData.idPersona) }));
setMensajeError((mensajeError) => ({ ...mensajeError, generoParticipanteError: validate.validarCampoVacio(formData.genero) }));
setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: validate.validarCampoVacio(formData.correo) }));
setMensajeError((mensajeError) => ({ ...mensajeError, nombreEquipoError: validate.validarCampoVacio(equipoData.nombreEquipo) }));

//ERRORES
const v1=validate.validarNombre(formData.nombrePersona);
const v2=validate.validarNombre(formData.apellidoPersona);
const v3=validate.validarCI(formData.idPersona);
const v5=validate.validarCorreo(formData.correo);
const v6=validate.validarGenero(formData.genero);

if (v1 !== "" || v2 !== "" || v3 !== "" || v5 !== "" || v6 !== "") {
  
//console.log("es aqui el problema"); 
setMensajeErrorModal("Ha ocurrido un error al realizar el registro, intentelo nuevamente")

setShowErrorModal(true);  
  }else{
 //procesoSubm();
 verifyNameGroup();   
         
  };
    }
  };
  ///
  const procesoSubm = () => {
  if (!Entrenadores || !participantes || Entrenadores.length === 0 || participantes.length === 0) {
//    console.log('Error: Trainers or participants are empty');
    setVacioEntrePartiError(true);
    setMensajeError((mensajeError) => ({ ...mensajeError, nombreEquipoError: validate.validarCampoVacio(equipoData.nombreEquipo) }));
    
  }else{
  //-----------------------------------------------
  setInputDisabled(false);
  setMensajeError((mensajeError) => ({ ...mensajeError, nombreEquipoError: validate.validarCampoVacio(equipoData.nombreEquipo) }));
  const formEquipo={
    nombreEquipo: equipoData.nombreEquipo,
    descripcionEquipo: equipoData.descripcionEquipo,
    idEvento:numero,
  }
//console.log("el equipo a actualizar es", formEquipo)
axios.get(`buscarEquipo/${varIdEquipo}`)
    .then(response => {

              axios.put(`./actualizarEquipo/${varIdEquipo}`, formEquipo)
            .then(response =>  {
             // console.log(response.data.message) 
              
              guardarResponsable();

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
              if (error.response.data.message === "Equipo no encontrado") {
             //   console.log("Equipo no encontrado. Ingresar un nuevo equipo...");
                const NewEquipo = {
                idEquipo: {varIdEquipo},
                nombreEquipo: equipoData.nombreEquipo || "default",
                descripcionEquipo: equipoData.descripcionEquipo,
                idEvento: {numero},
                };
              axios.post('./storeEquipo', NewEquipo)
              .then((resp) => {
             //  console.log("equipo guardado");
                          //----------------------------------------------------------------------------
                          guardarResponsable();
                          //------------------------------------------------------------------------------
                })
                .catch((error) => {
                console.error('Error al guardar equipo ', error);
                });
          
                } else {
                console.error("Error al recuperar id del equipo:", error);
                }
           //   setVacioEntrePartiError(true);
          });
        } 
      }
  ////
  
  const verifyNameGroup = () => {
    const NewEquipo = {
      idEquipo: {varIdEquipo},
      nombreEquipo: equipoData.nombreEquipo,
      idEvento: {numero},
      };
    axios.post('./checkEquipoExists', NewEquipo)
    .then((resp) => {
   //  console.log("equipo guardado");
                //----------------------------------------------------------------------------
                setMensajeErrorModal("Ya existe un equipo con este nombre");
                showErrorModal(true);
                //------------------------------------------------------------------------------
      })
      .catch((error) => {
        procesoSubm();
      console.error('Error al guardar equipo ', error);
      });
  }
  const guardarRepresentante = () => {
 
    const formResponsable = {
      idPersona: formData.idPersona,   
      idEquipo:{varIdEquipo},
    };

   // console.log('Datos editados', formResponsable.idPersona);

      axios.post('./storeRepresentante', formResponsable)
      .then((b)=>{
           // console.log('Datos de participante guardados correctamente', formResponsable.idPersona);
            
            setFormData({
              idPersona: '',
              nombrePersona: '',
              apellidoPersona: '',
              genero: '',
              pais: 'BO',
              correo: ''
            });
            setPersonData(null);
            setInputDisabled(false);

            setRegistroExitoso(true);       
            
      })
    
   .catch((error) => {       
    console.error('Error al guardar los datos del correo', error);
    console.error('Error al guardar participante ', error);
    setMensajeErrorModal("Este responsable ya esta registrado en este grupo")
    setInputDisabled(false);
    setFormData({
      idPersona: '',
      nombrePersona: '',
      apellidoPersona: '',
      genero: '',
      pais: 'BO',
      correo:''
    });
    setPersonData(null);

    setShowErrorModal(true);
    });
  }

  //------------------------------------------------------------------------------------------------------
 const guardarResponsable = () => {
        axios.post('./storePersona', formData)
              .then((a) => {                
            //   console.log('Datos guardados correctamente', formData.idPersona);
             guardarRepresentante();
              //alert("Datos guardados exitosamente.");
              
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                console.error(error.response.data.message);
             //  guardarParticipante();
             guardarRepresentante();
            } else {
                // Maneja otros errores
                setMensajeErrorModal("Ha ocurrido un error al realizar el registro, intentelo nuevamente")
      
                console.error('Error en la solicitud:', error.message);
                console.error('Error al guardar los datos de persona', error);
                setShowErrorModal(true);
      
            }        
              console.error('Error al guardar los datos de persona', error);
              setShowErrorModal(true);
              });
           
    };

  return (
    
    <div className= 'contenedor-formulario-form2 '>
    <form onSubmit={handleSubmitEquipo}>
      <h1 className='titulo-1'>Formulario para registrar equipo</h1>
      <br/>
      <p className="subtitle">Ingresar los datos del representante de su equipo.</p>
      <br/>
      
      <div className='form-row'>  
  <div className='form-group'>
  <label className="subtitulo required" htmlFor="pais"> País:</label>
    <select
        id="pais"
        name="pais"
        value={formData.pais}
        onChange={handleChangePC}
        disabled={inputDisabled}

      >
        {paises.map((codigo) => (
          <option
          key={codigo} 
          value={codigo}>
          {iso3166.getCountry(codigo)}
          </option>
        ))}
      </select>
  </div>
  <div className='form-group2'>
        <label className="subtitulo required" htmlFor="idPersona">CI: </label>
        <input
          type="text"
          id="idPersona"
          name="idPersona"
          value={formData.idPersona}
          placeholder="Ingresa tu numero de identificacion"
          onChange={handleChange}    
          disabled={inputDisabled}
      
        />
         <p style={{ color: 'red' }}>{mensajeError.ciParticipanteError}</p>
      </div>
      </div>

   
      <div className='form-group3'>
        <label className="subtitulo required"  htmlFor="nombrePersona">Nombre:</label>
        <input
          type="text"
          id="nombrePersona"
          name="nombrePersona"
          value={formData.nombrePersona}
          placeholder="Ingresa tu nombre"
          onChange={handleChange}
          disabled={inputDisabled}

        />
         <p style={{ color: 'red' }}>{mensajeError.nombreParticipanteError}</p>
      </div>
      <br/>
      <div className='form-group3'>
        <label className="subtitulo required" htmlFor="apellidoPersona">Apellido:</label>
        <input
          type="text"
          id="apellidoPersona"
          name="apellidoPersona"
          value={formData.apellidoPersona}
          placeholder="Ingresa tus apellidos"
          onChange={handleChange} 
          disabled={inputDisabled}
         
        />
         <p style={{ color: 'red' }}>{mensajeError.ApellidoParticipanteError}</p>
      </div>
      <br/>
   
  
      <br/>
      <div className='form-group3'>
        <label className="subtitulo required" htmlFor="genero">Género:</label>
        <select
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          disabled={inputDisabled}

        >
          <option value="">   </option>
          <option value="F">Femenino</option>
          <option value="M">Masculino</option>
        </select>
        <p style={{ color: 'red' }}>{mensajeError.generoParticipanteError}</p>
      </div>
      
      <br/>
      <div className='form-group3'>
        <label className="subtitulo required" htmlFor="correo">Correo:</label>
        <input
          type="text"
          id="correo"
          name="correo"
          value={formData.correo}
          placeholder="example@gmail.com"
          onChange={handleChangeCorreo}
          disabled={inputDisabled}

        />
         <p style={{ color: 'red' }}>{mensajeError.correoParticipanteError}</p>
      </div>
<br/>
<p>Ingresar los datos de su equipo.</p>

<div className='form-group3'>

      <label className="subtitulo required" htmlFor="nombreEquipo">
        Nombre del Equipo:
        </label>
        <input
          name="nombreEquipo"
          value={equipoData.nombreEquipo}
          placeholder="Ingresa el nombre de tu equipo"
          onChange={handleEquipoChange}
        />
        <p style={{ color: 'red' }}>{mensajeError.nombreEquipoError}</p>
        </div>
      <br />
      <div className='form-group3'>

      <label>
        Descripción del Equipo:
        </label>
        <input
          name="descripcionEquipo"
          value={equipoData.descripcionEquipo}
          onChange={handleEquipoChange}
        />
      <p style={{ color: 'red' }}>{mensajeError.descripcionEquipoError}</p>  
      </div>
      
      <br />
      <p className="subtitle">Ingresar los datos del entrenador del equipo</p>
      <div className='form-group3'>
      <div className='form-group3'>
      <label  className="subtitulo required" >
       Añadir Entrenadores 
        </label> </div>
        </div>
        {/* Renderización de requisitos */}
        <div className="RPE-container">
        <div className="RPE-distribution">
          {Entrenadores.length > 0 &&
            Entrenadores.map((entrenador, index) => (
              <div key={index} className="RPE-container">
                <input  type="text" 
                placeholder="Entrenadores del evento"
                 value={entrenador.persona.nombrePersona} 
                 readOnly />
                <button type="button" onClick={() => eliminarEntrenadores(index, entrenador.persona.idPersona,entrenador.idEquipo)} className="BotRequisitos-RPE">
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
   


      <div className='form-group3'>
      <label  className="subtitulo required" >
       Añadir participantes
        </label> </div>
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
      
      
      
      <div className='button-container-RPE'>
          <button className="blue-button-RPE" type="button" onClick={() => handleInicioClick()}>Salir</button>
          <button className="blue-button-RPE" type="submit">Registrar</button>
       </div>      
      
      
   
    {registroExitoso && <SuccessMessage
     message="¡Registro exitoso!"
     onClose={closeExitorModal}/>
    }
      {showErrorModal && (
        <ErrorMessage message={mensajeErrorModal} idEquipo={varIdEquipo} onClose={closeErrorModal} />
      )}
        {showVacioEntrePartiError && (
        <VacioEntrePartiError message={`Por favor Registra a los miembros de su equipo, con ${numEntre} entrenadores y ${numParti} participantes`}  onClose={closeVacioEntrePartiError} />
      )}
      {mostrarModalSalir && (
        <ModalSalir message="¿Quiere abandonar el registro?" onClose={handleCloseModalSalir} />
      )}
   </form> 
   {isModalOpenPersona && (
  <>
    {console.log(personData)}
    <ModalPersonaEncontrada
      onClose={cerrarModalPersona}
      handleYes={cambiarDatoModalPersona}
      correo={personData.correo}
    />
  </>
)}
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
    </div>
 
  );
};
export default FormularioRegistrarEquipo;