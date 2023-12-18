import React, { useState } from 'react';
import './assets/ModalRegistroParticipantes.css';
import axios from './api/conexionApi';
import ErrorMessage from './ModalErrorRegistro';
import validate from './utils/Validaciones';
import ErrorMessage2 from './ModalIngresarDatosCorrectos';
import iso3166 from 'iso-3166-1-alpha-2';
import ModalAutocompletar from './ModalAutocompletar';
const paises = iso3166.getCodes();


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
  const [showModalAutocompletar, setShowModalAutocompletar] = useState(false);

  const closeShowModalAutocompletar = () => {
    setShowModalAutocompletar(false);
  };
//mensajeModal exito
const [registroExitoso, setRegistroExitoso] = useState(false);

//fin modal exito
const [inputDisabled, setInputDisabled] = useState(false);

const bloquearInput = () => {
  setInputDisabled(true);
};
const [mensajeErrorModal, setMensajeErrorModal] = useState("");

/*  const [formData2, setFormData2] = useState({
    idEntrenador:'',
    nombreEntrenador:'',
    apellidoEntrenador:'',
    correoEntrenador:'',
    idEquipo:idEquipoE
  });*/
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
    ciEntrenadorError:'',
    nombreEntrenadorError:'',
    apellidoEntrenadorError:'',
    correoEntrenadorError:'', 
    generoEntrenadorError:'', 
    paisEntrenadorError:'' 
  });

  // --------------------------------------------------guardar correo -----------------------------
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
//---------------------------------------------------------------------------------------
 

//-----------------------------------------------------------------------------------------------
//const [isModalOpenPersona, setIsModalOpenPersona] = useState(false);
  const [personData, setPersonData] = useState(null);
   
    //const cerrarModalPersona = () => {
    //  setIsModalOpenPersona(false);
   // };
   

    const cambiarDatoModalPersona = () => {
      setFormData({
        idPersona: personData.idPersona,
        nombrePersona: personData.nombrePersona,
        apellidoPersona: personData.apellidoPersona,
        genero: personData.genero,
        pais: personData.pais,
        correo: personData.correo,
      });

      setMensajeError((mensajeError) => ({ ...mensajeError, nombreEntrenadorError: '' }));
setMensajeError((mensajeError) => ({ ...mensajeError, apellidoEntrenadorError: '' }));
setMensajeError((mensajeError) => ({ ...mensajeError, ciEntrenadorError: ''}));
setMensajeError((mensajeError) => ({ ...mensajeError, generoEntrenadorError:'' }));
setMensajeError((mensajeError) => ({ ...mensajeError, correoEntrenadorError: '' }));

          setShowModalAutocompletar(false);
          bloquearInput();
        };
//-----------------------Buscar person-----------------------------------------------------------

const buscarPersona = async (elpais,cipersonsa)=>{
  try{     
    const response = await axios.get(`./buscarPorId/${elpais}/${cipersonsa}`);
     if(!response.data.persona){
      console.log("no hay coincidencias",elpais)
      
     }else{
      setPersonData(response.data.persona);
      setShowModalAutocompletar(true);
      console.log("si hay coincidencias",personData);
      console.log("es truuue?", showModalAutocompletar);
      console.log("Estados actualizados:", personData, showModalAutocompletar);

     }
     console.log("si hay coincidencias",personData);
     console.log("es truuue?", showModalAutocompletar);
} catch (error) { 
  console.error("hubo un error al buscar persona",personData);

}
}

///--------------------------------------------------
const handleChangePC = (e) => {
  const pai = e.target.value;
  if(!formData.idPersona){
      setMensajeError((mensajeError) => ({ ...mensajeError, ciEntrenadorError: `Este campo no puede estar vacío.`}));
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
//-----------------------------------------------------------------------------------

const handleChange = (e) => {
    const { name, value } = e.target;
      switch (name) {
      case 'nombrePersona':
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
          case 'apellidoPersona':
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
            case 'idPersona':
              const ciRes=validate.validarCI(value);
              setMensajeError((mensajeError) => ({ ...mensajeError, ciEntrenadorError: ciRes }));
              if(ciRes===""){
                setFormData({
                  ...formData,
                  [name]: value,
              })
              buscarPersona(formData.pais,value);
                }else{
                const ciNew=validate.devolverCI(value);
                    setFormData({
                    ...formData,
                    [name]: ciNew,})
                    buscarPersona(formData.pais,ciNew);

                }
                break;
      

            case 'correo':
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
};


const handleSubmit = (e) => {
  e.preventDefault();
    if(personData) {
      axios.get(`buscarEquipo/${idEquipoE}`)
      .then(response => {        
          guardarEntrenador();
          console.log("Equipo  encontrado.");

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
        console.log(NewEquipo);
      axios.post('./storeEquipo', NewEquipo)
      .then((resp) => {
       console.log("equipo guardado");
                  //----------------------------------------------------------------------------
                  guardarEntrenador();
                  //------------------------------------------------------------------------------
        })
        .catch((error) => {
        console.error('Error al guardar equipo ', error);
        });
      } else {
        console.error("Error al recuperar id del equipo:", error);
        }
      });
    }else{
  //ERRORES
 console.log("en el submit");
setMensajeError((mensajeError) => ({ ...mensajeError, nombreEntrenadorError: validate.validarCampoVacio(formData.nombrePersona) }));
setMensajeError((mensajeError) => ({ ...mensajeError, apellidoEntrenadorError: validate.validarCampoVacio(formData.apellidoPersona) }));
setMensajeError((mensajeError) => ({ ...mensajeError, ciEntrenadorError: validate.validarCampoVacio(formData.idPersona) }));
setMensajeError((mensajeError) => ({ ...mensajeError, generoEntrenadorError: validate.validarCampoVacio(formData.genero) }));
setMensajeError((mensajeError) => ({ ...mensajeError, correoEntrenadorError: validate.validarCampoVacio(formData.correo) }));

//ERRORES
const v1=validate.validarNombre(formData.nombrePersona);
const v2=validate.validarNombre(formData.apellidoPersona);
const v3=validate.validarCI(formData.idPersona);
const v5=validate.validarCorreo(formData.correo);
const v6=validate.validarGenero(formData.genero);

if (v1 !== "" || v2 !== "" || v3 !== "" || v5 !== "" || v6 !== "") {
  setInputDisabled(false);
console.log("es aqui el problema"); 
 setShowErrorModal2(true);

  }else{
 // e.preventDefault();
  setInputDisabled(false);

  axios.get(`buscarEquipo/${idEquipoE}`)
      .then(response => {        
          guardarEntrenador();
          console.log("Equipo  encontrado.");

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
        console.log(NewEquipo);
      axios.post('./storeEquipo', NewEquipo)
      .then((resp) => {
       console.log("equipo guardado");
                  //----------------------------------------------------------------------------
                  guardarEntrenador();
                  //------------------------------------------------------------------------------
        })
        .catch((error) => {
        console.error('Error al guardar equipo ', error);
        });
  
        } else {
        console.error("Error al recuperar id del equipo:", error);
        }
        }); 
      }          
    };
};

const postEntrenador = () => {
  const formEntrenador = {
    idPersona: formData.idPersona,   
    idEquipo:idEquipoE,
  };

  console.log('Datos editados', formEntrenador.idPersona);
  console.log('Datos editados', formEntrenador.idEquipo);

    axios.post('./storeEntrenador', formEntrenador)
    .then((b)=>{
          console.log('Datos de participante guardados correctamente', formEntrenador.idPersona);
          
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
  
        console.error('Error al guardar los datos del entren', error);
        setMensajeErrorModal("Este entrenador ya esta registrado en este equipo")
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
//alert("Datos guardados exitosamente.");

}
    const guardarEntrenador = () => {
      axios.post('./storePersona', formData)
            .then((a) => {                
             console.log('Datos guardados correctamente', formData.idPersona);
            postEntrenador();
        
          })
          .catch((error) => {  
            if (error.response && error.response.status === 400) {
              console.error(error.response.data.message);
             postEntrenador();
          } else {
              // Maneja otros errores
              setMensajeErrorModal("Ha ocurrido un error al realizar el registro, intentelo nuevamente")
    
              console.error('Error en la solicitud:', error.message);
              console.error('Error al guardar los datos de persona', error);
              setShowErrorModal(true);
              setInputDisabled(false);

    
          }  
    

            });
            
          
  };




  return (
    <div className='modal-container-MRPE'>
      <div className='modal-content-MRPE MRPE'>
        
      <div className='contenedor-formulario-ToE-MRPE'>
    <br/>
      <h1 className='centrar-titulo'>Formulario de inscripcion entrenador</h1>
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

  {  showModalAutocompletar && (
    <ModalAutocompletar
    onClose={closeShowModalAutocompletar}
    handleYes={cambiarDatoModalPersona}
    nombre={personData.nombrePersona}
    apellido={personData.apellidoPersona}
    correo={personData.correo}
    />
  )}
          
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
         <p style={{ color: 'red' }}>{mensajeError.nombreEntrenadorError}</p>
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
         <p style={{ color: 'red' }}>{mensajeError.apellidoEntrenadorError}</p>
      </div>
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
        <p style={{ color: 'red' }}>{mensajeError.generoEntrenadorError}</p>
      </div>
      

      <div className='form-group3'>
        <label className="subtitulo required" htmlFor="correo">Correo:</label>
        <input
          type="text"
          id="correo"
          name="correo"
          value={formData.correo}
          placeholder="example@gmail.com"
          onChange={handleChange}
          disabled={inputDisabled}

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
        <ErrorMessage message={mensajeErrorModal} 
        onClose={closeErrorModal} />
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