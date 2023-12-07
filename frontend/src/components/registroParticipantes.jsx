import React, { useState } from 'react';
import axios from './api/conexionApi';
import './assets/registroParticipantes.css';
import SuccessMessage from './ModalRegistroExitoso';
import ErrorMessage from './ModalErrorRegistro';
import ErrorMessage2 from './ModalIngresarDatosCorrectos';

import ModalSalir from './ModalParaSalir';
import validate from './utils/Validaciones';

//import Validaciones from "./utils/Validaciones";
//const evento=1;
const errorCaracteresNoPermitidos='Esta intentando ingresar un caracter no permitido';
const errorOchoCaracteres='Este campo no puede superar los 8 caracteres';
const errorTreintaCaracteres='Este campo no puede superar los 30 caracteres';
const errorSieteCaracteres='Este campo no puede ser menor a los 7 caracteres';
const errorSoloNumeros='Solo se permiten caracteres numéricos';
const errorSeleccioneUnaOpcion='Seleccione al menos una opción';
const errorCorreo='Ingrese un correo válido en el formato example@dominio.com';
const errorCincuentaCaracteres='El correo solopermite 50 caracteres';
const errorMinOchoCaracteres = 'Este campo no puede ser menor a los 8 caracteres';

const FormularioRegistroParticipantes = (evento) => {
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


  const [showErrorModal2, setShowErrorModal2] = useState(false);

  const closeErrorModal2 = () => {
    setShowErrorModal2(false);
  };
  //modal error

//mensajeModal exito
const [registroExitoso, setRegistroExitoso] = useState(false);
//fin modal exito

  const [formData, setFormData] = useState({
    idPersona: '',
    nombrePersona: '',
    apellidoPersona: '',
    genero: '',
    telefonoPersona: ''
  });
  const [correoData, setCorreoData] = useState({
    correoC:'',
    //estadoNotificacion:'',
    //idPersona: ''
    
  });
 //para el error
 const [nombreError, setNombreError] = useState("");
 
  const [apellidoError, setApellidoError] = useState("");
  const [generoError, setGeneroError] = useState("");
  const [correoError, setCorreoError] = useState("");
  const [idPersonaError, setIdPersonaError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [mensajeError, setMensajeError] = useState({
    ciParticipanteError:'',
    nombreParticipanteError:'',
    ApellidoParticipanteError:'',
    generoParticipanteError:'',
    telefonoParticipanteError:'',
    correoParticipanteError:'',
   
  });
  const handleChangeCorreo = (e) => {
    const { name, value } = e.target;
    const correo=validate.validarCorreo(value);
    if(correo!==""){
      const datoCorreo=validate.devolverCorreo(value);
      setCorreoData((correoData) => ({ ...correoData, [name]: datoCorreo }));
      setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: correo }));
    }else{
      setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: "" }));

        setCorreoData((correoData) => ({ ...correoData, [name]: value }));
    }
}
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
            }else{
              const ciNew=validate.devolverCI(value);
                setFormData({
                  ...formData,
                  [name]: ciNew,})
            }
            break;
      

      case 'telefonoPersona':
        const telefonoRes=validate.validarTelefono(value);
        setMensajeError((mensajeError) => ({ ...mensajeError, telefonoParticipanteError: telefonoRes }));
        if(telefonoRes===""){
           setFormData({
            ...formData,
            [name]: value,
        })
      }else{
        const telefonoNew=validate.devolverTelefono(value);
         setFormData({
            ...formData,
            [name]: telefonoNew,
        })
      }
        break;

      default:
        setFormData({
          ...formData,
          [name]: value,
        });
    }
};
 
 
  const handleSubmit = (e) => {
    //ERRORES
    
    setMensajeError((mensajeError) => ({ ...mensajeError, nombreParticipanteError: validate.validarCampoVacio(formData.nombrePersona) }));
    setMensajeError((mensajeError) => ({ ...mensajeError, ApellidoParticipanteError: validate.validarCampoVacio(formData.apellidoPersona) }));
    setMensajeError((mensajeError) => ({ ...mensajeError, ciParticipanteError: validate.validarCampoVacio(formData.idPersona) }));
    setMensajeError((mensajeError) => ({ ...mensajeError, generoParticipanteError: validate.validarCampoVacio(formData.genero) }));
    setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: validate.validarCampoVacio(correoData.correoC) }));
  
const v1=validate.validarNombre(formData.nombrePersona);
const v2=validate.validarNombre(formData.apellidoPersona);
const v3=validate.validarCI(formData.idPersona);
const v4=validate.validarTelefono(formData.telefonoPersona);
const v5=validate.validarCorreo(correoData.correoC);
const v6=validate.validarGenero(formData.genero);

//ERRORES




if (v1 !== "" || v2 !== "" || v3 !== "" || v4 !== "" || v5 !== "" || v6 !== "") {
  e.preventDefault();
  setShowErrorModal2(true);

    }else{
    

      e.preventDefault();
      axios.post('./storePersona', formData)
        .then((a) => {
          console.log("ellllll datooo essss", evento)
         console.log('Datos guardados correctamente', formData.idPersona);
         const formCorreo = {
          correoC: correoData.correoC,   
          estadoNotificacion: true,
          idPersona: formData.idPersona
         };
         axios.post('./correos', formCorreo)
            .then((c)=>{
              console.log('correo guardado', correoData.correoC);
              const formParticipante = {
                idParticipante: formData.idPersona,   
                idEvento: evento.evento,
              
              };
  
              console.log('Datos editados', formParticipante.idParticipante);
  
                axios.post('./storeParticipante', formParticipante)
                .then((b)=>{
                      console.log('Datos de participante guardados correctamente', formParticipante.idParticipante);
                      
                      setFormData({
                        idPersona: '',
                        nombrePersona: '',
                        apellidoPersona: '',
                        genero: '',
                        telefonoPersona: ''
                      });
                      setCorreoData({
                        correoC:''
                      });
                      
                })
                .catch((error) => {          
                  console.error('Error al guardar participante ', error);
                  
                });         
              })
             .catch((error) => {       
              console.error('Error al guardar los datos del correo', error);
              });
        //alert("Datos guardados exitosamente.");
        setRegistroExitoso(true);
        
      })
      .catch((error) => {       
        console.error('Error al guardar los datos de persona', error);
        setShowErrorModal(true);
        });
        
  
    }
  }

  return (
    <div className='contenedor-form '>
    <br/>
      <h1 className='centrar-titulo'>Formulario de Registro de Participante</h1>
      <br/>
    <form onSubmit={handleSubmit}>
            
      <div>
        <label class="subtitulo required"  htmlFor="nombrePersona">Nombre:</label>
        <input
          type="text"
          id="nombrePersona"
          name="nombrePersona"
          value={formData.nombrePersona}
          placeholder="Ingresa tu nombre"
          onChange={handleChange}
        />
         <p style={{ color: 'red' }}>{mensajeError.nombreParticipanteError}</p>
      </div>
      <br/>
      <div>
        <label class="subtitulo required" htmlFor="apellidoPersona">Apellido:</label>
        <input
          type="text"
          id="apellidoPersona"
          name="apellidoPersona"
          value={formData.apellidoPersona}
          placeholder="Ingresa tus apellidos"
          onChange={handleChange}          
        />
         <p style={{ color: 'red' }}>{mensajeError.ApellidoParticipanteError}</p>
      </div>
      <br/>
      <div>
        <label class="subtitulo required" htmlFor="idPersona">CI: </label>
        <input
          type="text"
          id="idPersona"
          name="idPersona"
          value={formData.idPersona}
          placeholder="Ingresa tu numero de identificacion"
          onChange={handleChange}          
        />
         <p style={{ color: 'red' }}>{mensajeError.ciParticipanteError}</p>
      </div>
      <br/>
      <div>
        <label class="subtitulo required" htmlFor="genero">Género:</label>
        <select
          id="genero"
          name="genero"
          value={formData.genero}
          placeholder="Selecciona una opcion"
          onChange={handleChange}
        >
          <option value="">   </option>
          <option value="F">Femenino</option>
          <option value="M">Masculino</option>
        </select>
        <p style={{ color: 'red' }}>{mensajeError.generoParticipanteError}</p>
      </div>
      <br/>
      <div>
        <label className='subtitulo' htmlFor="telefonoPersona">Teléfono:</label>
        <input
          type="text"
          id="telefonoPersona"
          name="telefonoPersona"
          value={formData.telefonoPersona}
          placeholder="60004533"
          onChange={handleChange}
        />
         <p style={{ color: 'red' }}>{mensajeError.telefonoParticipanteError}</p>
      </div>
      <br/>
      <div>
        <label class="subtitulo required" htmlFor="correoC">Correo:</label>
        <input
          type="text"
          id="correoC"
          name="correoC"
          value={correoData.correoC}
          placeholder="example@gmail.com"
          onChange={handleChangeCorreo}
        />
         <p style={{ color: 'red' }}>{mensajeError.correoParticipanteError}</p>
      </div>
      <br/>
       <div className='button-container-RP'>
          <button className="blue-button-RP" type="button" onClick={() => handleInicioClick()}>Salir</button>
          <button className="blue-button-RP" type="submit">Registrar</button>
       </div>
  </form>

      {registroExitoso && <SuccessMessage message="¡Registro exitoso!" />}
      {showErrorModal && (
        <ErrorMessage message="Ha ocurrido un error al realizar el registro, intentelo nuevamente" onClose={closeErrorModal} />
      )}
      {showErrorModal2 && (
        <ErrorMessage2 message="Por favor revisa que los datos ingresados sean correctos" onClose={closeErrorModal2} />
      )}
      {mostrarModalSalir && (
        <ModalSalir message="¿Quiere abandonar el registro?" onClose={handleCloseModalSalir} salida={"EventosRegistroParticipantes"}/>
      )}
    </div>
  );
}
export default FormularioRegistroParticipantes;
