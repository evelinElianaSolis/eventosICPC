import React, { useState } from 'react';
import './assets/ModalRegistroParticipantes.css';
import axios from './api/conexionApi';
import ErrorMessage from './ModalErrorRegistro';
import validate from './utils/Validaciones';
import ErrorMessage2 from './ModalIngresarDatosCorrectos';


const FormularioRegistroParticipantes = ({ evento,idEquipoE,equipo,  onCloseSelf, onOpenSecondaryModal, onCloseParent, onUpdateParent }) => {
//----------------------------------------------------------------------------
const { nombreEquipo, descripcionEquipo, idEvento } = equipo;


const [isSecondaryModalOpen, setSecondaryModalOpen] = useState(false);


const handleSelfClose = () => {
    setSecondaryModalOpen(false);
  
};

const handleSecondaryModalOpen = () => {
  setSecondaryModalOpen(true);
  onOpenSecondaryModal(); // Notifica al modal padre sobre la apertura del modal secundario
};

const handleSecondaryModalClose = () => {
  setSecondaryModalOpen(false);
  onCloseSelf(); // Cierra el modal hijo cuando se cierra el modal secundario
};

const handleSecondaryModalCloseOk = () => {
  setSecondaryModalOpen(false);
  onCloseSelf();
  onUpdateParent();
};
//------------------------------------------------------------------------------

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
   console.log("en el submit");
    setMensajeError((mensajeError) => ({ ...mensajeError, nombreParticipanteError: validate.validarCampoVacio(formData.nombrePersona) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, ApellidoParticipanteError: validate.validarCampoVacio(formData.apellidoPersona) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, ciParticipanteError: validate.validarCampoVacio(formData.idPersona) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, generoParticipanteError: validate.validarCampoVacio(formData.genero) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: validate.validarCampoVacio(correoData.correoC) }));

//ERRORES
const v1=validate.validarNombre(formData.nombrePersona);
const v2=validate.validarNombre(formData.apellidoPersona);
const v3=validate.validarCI(formData.idPersona);
const v4=validate.validarTelefono(formData.telefonoPersona);
const v5=validate.validarCorreo(correoData.correoC);
const v6=validate.validarGenero(formData.genero);

if (v1 !== "" || v2 !== "" || v3 !== "" || v4 !== "" || v5 !== "" || v6 !== "") {
  e.preventDefault();
  setShowErrorModal2(true);

    }else{
    e.preventDefault();
    axios.get(`buscarEquipo/${idEquipoE}`)
        .then(response => {

          
            guardarParticipante();
           
          })
    .catch(error => {
       if (error.response.data.message === "Equipo no encontrado") {
          console.log("Equipo no encontrado. Ingresar un nuevo equipo...");
          const NewEquipo = {
          idEquipo: idEquipoE,
          nombreEquipo: nombreEquipo || "default",
          descripcionEquipo: descripcionEquipo,
          idEvento: idEvento,
          };
        axios.post('./storeEquipo', NewEquipo)
        .then((resp) => {
         console.log("equipo guardado");
                    //----------------------------------------------------------------------------
                    guardarParticipante();
                    //------------------------------------------------------------------------------
          })
          .catch((error) => {
          console.error('Error al guardar equipo ', error);
          });
    
          } else {
          console.error("Error al recuperar id del equipo:", error);
          }
          });           
      };
    
      const guardarParticipante = () => {
        axios.post('./storePersona', formData)
              .then((a) => {                
               console.log('Datos guardados correctamente', formData.idPersona);
               const formCorreo = {
                correoC: correoData.correoC,   
                estadoNotificacion: true,
                idPersona: formData.idPersona
               };
               axios.post('./correos', formCorreo)
                  .then((c)=>{
                        const formParticipante = {
                      idParticipante: formData.idPersona,   
                      idEvento: evento,
                      idEquipo:idEquipoE,
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
    };


  return (
    <div className='modal-container-MRPE'>
      <div className='modal-content-MRPE MRPE'>
        
      <div className='contenedor-formulario-ToE-MRPE'>
    <br/>
      <h1 className='centrar-titulo'>Formulario de inscripcion Participante</h1>
      <br/>
             
      <div>
        <label className="subtitulo required"  htmlFor="nombrePersona">Nombre:</label>
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
        <label className="subtitulo required" htmlFor="apellidoPersona">Apellido:</label>
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
        <label className="subtitulo required" htmlFor="idPersona">CI: </label>
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
  
      <br/>
      <div>
        <label className="subtitulo required" htmlFor="genero">Género:</label>
        <select
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
        >
          <option value="">   </option>
          <option value="F">Femenino</option>
          <option value="M">Masculino</option>
        </select>
        <p style={{ color: 'red' }}>{mensajeError.generoParticipanteError}</p>
      </div>
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
        <label className="subtitulo required" htmlFor="correoC">Correo:</label>
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
       <div className='button-container-ToE-MRPE '>
          <button className=".blue-button-ToE-MRPE" type="button" onClick={handleSecondaryModalOpen}>Cancelar</button>
          <button className=".blue-button-ToE-MRPE" type="button" onClick={handleSubmit}>Registrar</button>
       </div>

       {isSecondaryModalOpen && (
          <div className='modal-container' >
          <div className='modal-content error'>
            <div className='message'>{"¿Quiere abandonar el registro?"}</div>
            <div className='btn-options'>
              <button onClick={handleSecondaryModalClose}>Sí</button>
              <button onClick={handleSelfClose}>No</button>
            </div>
          </div>
        </div>
           
      )}

{registroExitoso  &&           
          ( <div className='modal-container'>
           <div className='modal-content exito' >            
             <div className='message'>{"¡Registro exitoso!"}</div>
             <div className='btn-ok'>
               <button onClick={handleSecondaryModalCloseOk}>OK</button>
             </div>
           </div>
         </div>)
}
      {showErrorModal && (
        <ErrorMessage message="Ha ocurrido un error al realizar el registro, intentelo nuevamente" onClose={closeErrorModal} />
      )}
        {showErrorModal2 && (
        <ErrorMessage2 message="Por favor revisa que los datos ingresados sean correctos" onClose={closeErrorModal2} />
      )}
       <br/>
       <br/>


     
    
    </div>
      </div>
    </div>
  );
};
export default FormularioRegistroParticipantes;

///=============================

