import './assets/FormularioRegistrarEquipo.css'
import axios from "../components/api/conexionApi";
import {  useState } from 'react';
import './assets/Titulo.css'
import validate from './utils/Validaciones';
//import  './assets/registroParticipantes.css'
import SuccessMessage from './ModalRegistroExitoso';
import ErrorMessage from './ModalErrorRegistro';
import ModalSalir from './ModalParaSalir';



//const numero=2;
const FormularioRegistrarEquipo = (numero) => {
//modales---------------

const [mostrarModalSalir, setMostrarModalSalir] = useState(false);
  const handleInicioClick = () => {
    setMostrarModalSalir(true);
  };
  const handleCloseModalSalir = () => {
    setMostrarModalSalir(false);
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




  const [mensajeError, setMensajeError] = useState({
    nombreError: '',
    apellidoError: '',
    correoError: '',
    nombreEquipoError: '',
    descripcionEquipoError: '',
    idEntrenadorError: '',
    
  });


  //para equipo---------------------------------------------------------------------------------
  const [equipoData, setEquipoData] = useState({
    nombreEquipo: '',
    descripcionEquipo: '',
    idEntrenador: '',
    idEvento:'',
  });

  //handle equipo
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

//para entrenador ---------------------------------------------------------------------------------
const [EntrenadorCI,setEntrenadorCI] = useState({
  ciEntrenador:''
});
const handleCIEntrenadorChange = (e) => {
  const { name, value } = e.target;
  console.log("este es el ci sucio:",value)
  
    const res=validate.validarCI(value);
    //======================++++++++++++++++++++++++++++++console.log("el evento:",{evento})
   
    setMensajeError((mensajeError) => ({ ...mensajeError, idEntrenadorError: res }));
    if(res===""){      
      setEntrenadorCI((EntrenadorCI) => ({ ...EntrenadorCI, ciEntrenador: value }));
    }else{
      const dato=validate.devolverCI(value);
      console.log("este es el ci limpio:",dato)
      setEntrenadorCI((EntrenadorCI) => ({ ...EntrenadorCI, ciEntrenador: dato }));
    }
  };

//------------------------------------------------------------------------
  const [entrenadorData, setEntrenadorData] = useState({
    nombreEntrenador: '',
    apellidoEntrenador: '',
    correoEntrenador: '',
  });
  const handleEntrenadorChange = (e) => {
    const { name, value } = e.target;
    switch(name){
      case 'nombreEntrenador':
        const res=validate.validarNombre(value);
        setMensajeError((mensajeError) => ({ ...mensajeError, nombreError: res }));
        if(res===""){
         // const dato=validate.devolverNombre(value);
          setEntrenadorData((entrenadorData) => ({ ...entrenadorData, [name]: value }));
        }else{
          const dato=validate.devolverNombre(value);
          setEntrenadorData((entrenadorData) => ({ ...entrenadorData, [name]: dato }));

        }
      break;
      case 'apellidoEntrenador':
        const apellido=validate.validarNombre(value);
        setMensajeError((mensajeError) => ({ ...mensajeError, apellidoError: apellido }));
        if(apellido!==""){
          const apellidoDato=validate.devolverNombre(value);
          setEntrenadorData((entrenadorData) => ({ ...entrenadorData, [name]: apellidoDato }));
        }else{
          setEntrenadorData((entrenadorData) => ({ ...entrenadorData, [name]: value }));
        }

      break;
      case 'correoEntrenador':
        const correo=validate.validarCorreo(value);
        setMensajeError((mensajeError) => ({ ...mensajeError, correoError: correo }));
        if(correo!==""){
          const datoCorreo=validate.devolverCorreo(value);
          setEntrenadorData((entrenadorData) => ({ ...entrenadorData, [name]: datoCorreo }));
        }else{
          setEntrenadorData((entrenadorData) => ({ ...entrenadorData, [name]: value }));
        }
      break;
      default:
        setEntrenadorData((entrenadorData) => ({ ...entrenadorData, [name]: value }));
      break;
    }    
  };

//submit equipo 
const handleSubmitEquipo = (e) => {
  setMensajeError((mensajeError) => ({ ...mensajeError, nombreEquipoError: validate.validarCampoVacio(equipoData.nombreEquipo) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, idEntrenadorError: validate.validarCampoVacio(EntrenadorCI.ciEntrenador) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, nombreError: validate.validarCampoVacio(entrenadorData.nombreEntrenador) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, apellidoError: validate.validarCampoVacio(entrenadorData.apellidoEntrenador) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, correoError: validate.validarCampoVacio(entrenadorData.correoEntrenador) }));


  e.preventDefault();
  //guardar entrenador ---------------------------
    const formEntrenador={
    idEntrenador:EntrenadorCI.ciEntrenador,
    nombreEntrenador: entrenadorData.nombreEntrenador,
    apellidoEntrenador:entrenadorData.apellidoEntrenador,
    correoEntrenador:entrenadorData.correoEntrenador
    }
    axios.post('./storeEntrenador', formEntrenador)
      .then((b) => {
        console.log('guardar equipo ', formEntrenador); 
         //guardar EQUIPO
         console.log('guardar equipo ', numero);
        const formEquipo={
        nombreEquipo: equipoData.nombreEquipo,
        descripcionEquipo: equipoData.descripcionEquipo,
        idEntrenador: EntrenadorCI.ciEntrenador,
        idEvento:numero.numero,
        
        }
        console.log('guardar equipo ', formEquipo); 
        console.log('id eventp ', numero);
        console.log('guardar antes  ', formEquipo.idEvento); 
      
            axios.post('./storeEquipo', formEquipo)
            .then((a) => {
            console.log('guardar equipo ', a);   
            console.log('guardar equipo ', formEquipo);   
            
            setEquipoData({
              nombreEquipo: '',
              descripcionEquipo: '',
              idEntrenador: '',
              idEvento:''
            });
            setEntrenadorCI({
              ciEntrenador:''
            });
            setEntrenadorData({
              nombreEntrenador: '',
              apellidoEntrenador: '',
              correoEntrenador: '',
            })

          })      
          .catch((error) => {          
          console.error('Error al guardar equipo ', error);      
            }); 
      setRegistroExitoso(true)
      })
      .catch((error) => {          
      console.error('Error al guardar entrenaodr ', error);  
      setShowErrorModal(true);      
    });         
   
  };
 


  return (
    <div className= 'contenedor-form '>
    <form onSubmit={handleSubmitEquipo}>
      <h1 className='titulo-1'>Registra los datos de tu equipo</h1>
      <br/>
      <p>Es importante que llene los datos para su equipo correctamente, dado que una vez quede registrado no podra realizar modificaciones. Gracias y buena suerte.</p>
      <br/>
      
      
      <label className='obligatorio' htmlFor="nombreEquipo">
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
      <p>Ingresar los datos del representante o entrenador del equipo</p>
      <label className='obligatorio' htmlFor="idEntrenador">
        CI:  
        </label>
        <input
          
          name="ciEntrenador"
          value={EntrenadorCI.ciEntrenador}
          placeholder="Ingresa tu numero de identificacion"
          onChange={handleCIEntrenadorChange}
        />
      <p style={{ color: 'red' }}>{mensajeError.idEntrenadorError}</p>
      <br />
      
      <label className='obligatorio' htmlFor="nombreEntrenador">
        Nombre:
        </label>
        <input
          
          name="nombreEntrenador"
          value={entrenadorData.nombreEntrenador}
          placeholder="Ingresa tu nombre"
          onChange={handleEntrenadorChange}
        />
        <p style={{ color: 'red' }}>{mensajeError.nombreError}</p>
      
      <br />
      <label className='obligatorio' htmlFor="apellidoEntrenador">
        Apellido:
        </label>
        <input
          
          name="apellidoEntrenador"
          value={entrenadorData.apellidoEntrenador}
          placeholder="Ingresa tus apellidos"
          onChange={handleEntrenadorChange}
        />
      <p style={{ color: 'red' }}>{mensajeError.apellidoError}</p>
      <br />
      <label className='obligatorio' htmlFor="corrreoEntrenador">
        Correo:
        </label>
        <input
          
          name="correoEntrenador"
          value={entrenadorData.correoEntrenador}
          placeholder="example@gmail.com"
          onChange={handleEntrenadorChange}
        />
      <p style={{ color: 'red' }}>{mensajeError.correoError}</p>
      <br/>
      <br/>
      
      <div className='button-container'>
          <button className="blue-button" type="button" onClick={() => handleInicioClick()}>Salir</button>
          <button className="blue-button" type="submit">Registrar</button>
       </div>      
    </form>
    
    {registroExitoso && <SuccessMessage message="¡Registro exitoso!" />}
      {showErrorModal && (
        <ErrorMessage message="Ha ocurrido un error al realizar el registro, intentelo nuevamente" onClose={closeErrorModal} />
      )}
      {mostrarModalSalir && (
        <ModalSalir message="¿Quiere abandonar el registro?" onClose={handleCloseModalSalir} />
      )}
    </div>
  );
};
export default FormularioRegistrarEquipo;
