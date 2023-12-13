import React, { useState } from 'react';
import './assets/ModalRegistroParticipantes.css';
import axios from './api/conexionApi';
import ErrorMessage from './ModalErrorRegistro';
import validate from './utils/Validaciones';
<<<<<<< HEAD
import ErrorMessage2 from './ModalIngresarDatosCorrectos';
import ModalPersonaEncontrada from './ModalPersonaEncontrada'
import iso3166 from 'iso-3166-1-alpha-2';
const paises = iso3166.getCodes();
=======
>>>>>>> be419ebe5aeddb1ba9f350dfd93d831cb0164379


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
  //modal error

//mensajeModal exito
const [registroExitoso, setRegistroExitoso] = useState(false);
//fin modal exito

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
          setIsModalOpenPersona(false);
        };
//-----------------------Buscar person-----------------------------------------------------------

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

console.log("es aqui el problema"); 
 setShowErrorModal2(true);

  }else{
  e.preventDefault();
  axios.get(`buscarEquipo/${idEquipoE}`)
      .then(response => {        
          guardarEntrenador();
    
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
    };
};

    const guardarEntrenador = () => {
      axios.post('./storePersona', formData)
            .then((a) => {                
             console.log('Datos guardados correctamente', formData.idPersona);
            
                  const formEntrenador = {
                    idEntrenador: formData.idPersona,   
                    idEquipo:idEquipoE,
                  };
      
                  console.log('Datos editados', formEntrenador.idParticipante);
      
                    axios.post('./storeEntrenador', formEntrenador)
                    .then((b)=>{
                          console.log('Datos de participante guardados correctamente', formEntrenador.idParticipante);
                          
                          setFormData({
                            idPersona: '',
                            nombrePersona: '',
                            apellidoPersona: '',
                            genero: '',
                            pais: 'BO',
                            correo: ''
                          });
                          setRegistroExitoso(true);       
                          
                    })
                  
                 .catch((error) => {       
                  console.error('Error al guardar los datos del correo', error);
                  });
            //alert("Datos guardados exitosamente.");
            
          })
          .catch((error) => {       
            console.error('Error al guardar los datos de persona', error);
            setShowErrorModal(true);
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
        />
         <p style={{ color: 'red' }}>{mensajeError.ciParticipanteError}</p>
      </div>
      </div>

  {  isModalOpenPersona && (
    <ModalPersonaEncontrada
    onClose={cerrarModalPersona}
    onUpdate={cambiarDatoModalPersona}
    datos={personData.correo}/>
  )}
          
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
         <p style={{ color: 'red' }}>{mensajeError.nombreEntrenadorError}</p>
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
         <p style={{ color: 'red' }}>{mensajeError.apellidoEntrenadorError}</p>
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
         <p style={{ color: 'red' }}>{mensajeError.ciEntrenadorError}</p>
      </div>
      <br/>
  
      <div className='form-group3'>
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
        <label className="subtitulo required" htmlFor="correo">Correo:</label>
        <input
          type="text"
          id="correo"
          name="correo"
          value={formData.correo}
          placeholder="example@gmail.com"
          onChange={handleChange}
        />
         <p style={{ color: 'red' }}>{mensajeError.correoEntrenadorError}</p>
      </div>
      <br/>
       <div className='button-container-ToE-MRPE '>
          <button className=".blue-button-ToE-MRPE" type="button" onClick={handleSecondaryModalOpen}>Salir</button>
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
         
    </div>
      </div>
    </div>
  );
};
export default FormularioRegistroEntrenador;