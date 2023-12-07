import React, { useState } from 'react';
import './assets/ModalRegistroParticipantes.css';
import axios from './api/conexionApi';
import ErrorMessage from './ModalErrorRegistro';
import validate from './utils/Validaciones';
import ErrorMessage2 from './ModalIngresarDatosCorrectos';


//------------------------------------------------------------------------------------------------------
const FormularioRegistroEntrenador= ({ evento,idEquipoE,equipo,  onCloseSelf, onOpenSecondaryModal, onCloseParent,onUpdateParent }) => {
    //----------------------------------------------------------------------------------------------
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
    //--------------------------------------------------------------------------------------
    
 
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
    idEntrenador:'',
    nombreEntrenador:'',
    apellidoEntrenador:'',
    correoEntrenador:'',
    idEquipo:idEquipoE
  });
 
 //para el error

  const [mensajeError, setMensajeError] = useState({
    ciEntrenadorError:'',
    nombreEntrenadorError:'',
    apellidoEntrenadorError:'',
    correoEntrenadorError:'',  
    idEquipo:'' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
      switch (name) {
      case 'nombreEntrenador':
        const nombreRes=validate.validarNombre(value);
        setMensajeError((mensajeError) => ({ ...mensajeError, nombreEntrenadorError: nombreRes }));
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
          case 'apellidoEntrenador':
            const apellidoRes=validate.validarNombre(value);
            setMensajeError((mensajeError) => ({ ...mensajeError, apellidoEntrenadorError: apellidoRes }));
            if(apellidoRes===""){
              const apellidoNew=validate.devolverNombre(value);
              setFormData({
                ...formData,
                [name]: apellidoNew,
            })
          }

            break;
            case 'idEntrenador':
              const ciRes=validate.validarCI(value);
              setMensajeError((mensajeError) => ({ ...mensajeError, ciEntrenadorError: ciRes }));
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
      

            case 'correoEntrenador':
                const telefonoRes=validate.validarCorreo(value);
                setMensajeError((mensajeError) => ({ ...mensajeError, correoEntrenadorError: telefonoRes }));
                if(telefonoRes===""){
                setFormData({
                    ...formData,
                    [name]: value,
                })
            }else{
                const telefonoNew=validate.devolverCorreo(value);
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
};const handleSubmit = async (e) => {
  e.preventDefault();

  // Log form data for debugging
  console.log('Form Data:', formData);
    setMensajeError((mensajeError) => ({ ...mensajeError, nombreEntrenadorError: validate.validarCampoVacio(formData.nombreEntrenador) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, apellidoEntrenadorError: validate.validarCampoVacio(formData.apellidoEntrenador) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, ciEntrenadorError: validate.validarCampoVacio(formData.idEntrenador) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, correoEntrenadorError: validate.validarCampoVacio(formData.correoEntrenador) }));

//ERRORES

const v1=validate.validarNombre(formData.nombreEntrenador);
const v2=validate.validarNombre(formData.apellidoEntrenador);
const v3=validate.validarCI(formData.idEntrenador);
const v4=validate.validarCorreo(formData.correoEntrenador);

if (v1 !== "" || v2 !== "" || v3 !== "" || v4 !== "" ) {
  e.preventDefault();
  setShowErrorModal2(true);

    }else{
e.preventDefault();
console.log("equipo guardado", nombreEquipo);
console.log("equipo guardado", descripcionEquipo);
console.log("equipo guardado", idEvento);
    //ver si equipo existe
    axios.get(`buscarEquipo/${idEquipoE}`)
        .then(response => {
                            axios.post('./storeEntrenador', formData)
                            .then((a) => {
                              setFormData({
                                idEntrenador:'',
                                nombreEntrenador:'',
                                apellidoEntrenador:'',
                                correoEntrenador:'',
                              })
                                setRegistroExitoso(true);

                            })
                            .catch((error) => {
                                setShowErrorModal(true);

                            });

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
                axios.post('./storeEntrenador', formData)
                .then((a) => {
                  setFormData({
                    idEntrenador:'',
                    nombreEntrenador:'',
                    apellidoEntrenador:'',
                    correoEntrenador:'',
                  })
                    setRegistroExitoso(true);
                })
                .catch((error) => {
                    setShowErrorModal(true);
                });
              })
              .catch((error) => {
                  console.error('Error al guardar equipo ', error);
              });

          } else {
            console.error("Error al recuperar id del ultimo equipo:", error);
          }
        });   
    }   
  };


  return (
    <div className='modal-container-MRPE'>
      <div className='modal-content-MRPE MRPE'>
        
      <div className='contenedor-formulario-ToE-MRPE'>
    <br/>
      <h1 className='centrar-titulo'>Formulario de inscripcion entrenador</h1>
      <br/>
    
          
      <div>
        <label className="subtitulo required"  htmlFor="nombreEntrenador">Nombre:</label>
        <input
          type="text"
          id="nombreEntrenador"
          name="nombreEntrenador"
          value={formData.nombreEntrenador}
          placeholder="Ingresa tu nombre"
          onChange={handleChange}
        />
         <p style={{ color: 'red' }}>{mensajeError.nombreEntrenadorError}</p>
      </div>
      <br/>
      <div>
        <label className="subtitulo required" htmlFor="apellidoEntrenador">Apellido:</label>
        <input
          type="text"
          id="apellidoEntrenador"
          name="apellidoEntrenador"
          value={formData.apellidoEntrenador}
          placeholder="Ingresa tus apellidos"
          onChange={handleChange}          
        />
         <p style={{ color: 'red' }}>{mensajeError.apellidoEntrenadorError}</p>
      </div>
      <br/>
      <div>
        <label className="subtitulo required" htmlFor="idEntrenador">CI: </label>
        <input
          type="text"
          id="idEntrenador"
          name="idEntrenador"
          value={formData.idEntrenador}
          placeholder="Ingresa tu numero de identificacion"
          onChange={handleChange}          
        />
         <p style={{ color: 'red' }}>{mensajeError.ciEntrenadorError}</p>
      </div>
      <br/>
  
      <div>
        <label className="subtitulo required" htmlFor="correoEntrenador">Correo:</label>
        <input
          type="text"
          id="correoEntrenador"
          name="correoEntrenador"
          value={formData.correoEntrenador}
          placeholder="example@gmail.com"
          onChange={handleChange}
        />
         <p style={{ color: 'red' }}>{mensajeError.correoEntrenadorError}</p>
      </div>
      <br/>
       <div className='button-container-ToE-MRPE '>
          <button className=".blue-button-ToE-MRPE" type="button" onClick={handleSecondaryModalOpen}>Cancelar</button>
          <button className=".blue-button-ToE-MRPE" type="button" onClick={handleSubmit}>Registrar </button>
       </div>     
       <br/>
       <br/>


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
         
    </div>
      </div>
    </div>
  );
};
export default FormularioRegistroEntrenador;