import React, { useState } from 'react';
import axios from './api/conexionApi';
import './assets/registroParticipantes.css';
import SuccessMessage from './ModalRegistroExitoso';
import ErrorMessage from './ModalErrorRegistro';
import ErrorMessage2 from './ModalIngresarDatosCorrectos';
import ModalPersona from './ModalPersonaEncontrada';
import ModalSalir from './ModalParaSalir';
import validate from './utils/Validaciones';
import iso3166 from 'iso-3166-1-alpha-2';

//import Validaciones from "./utils/Validaciones";
//const evento=1;

const paises = iso3166.getCodes();


//---------------------------------------------------------------formulario
const FormularioRegistroParticipantes = (evento) => {

//====================================

const [formData, setFormData] = useState({
  idPersona: '',
  nombrePersona: '',
  apellidoPersona: '',
  genero: '',
  pais:'BO',
  correo: ''

});
//------------------------------

const [mensajeError, setMensajeError] = useState({
  ciParticipanteError:'',
  nombreParticipanteError:'',
  ApellidoParticipanteError:'',
  generoParticipanteError:'',
  correoParticipanteError:'',
 
});



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

  const [mensajeErrorModal, setMensajeErrorModal] = useState("");

  //modal error

//mensajeModal exito
const [registroExitoso, setRegistroExitoso] = useState(false);
const closeExitorModal = () => {
  setRegistroExitoso(false);
};
//fin modal exito

//---------------------------modal persona
const [isModalOpenPersona, setIsModalOpenPersona] = useState(false);
  const [personData, setPersonData] = useState(null);
   
    const cerrarModalPersona = () => {
      setIsModalOpenPersona(false);
    };
    const guardarParticipante = () => {
      const formParticipante = {
        idPersona: formData.idPersona,   
        idEvento: evento.evento,
      
      };
      axios.post('./storeParticipante', formParticipante)
      .then((b)=>{
         //   console.log('Datos de participante guardados correctamente', formParticipante.idParticipante);
            
            setFormData({
              idPersona: '',
              nombrePersona: '',
              apellidoPersona: '',
              genero: '',
              pais: 'BO',
              correo:''
            });
            setPersonData(null);
            setInputDisabled(false);

            setRegistroExitoso(true);
      })
      .catch((error) => {          
        console.error('Error al guardar participante ', error);
        setMensajeErrorModal("Este participante ya está registrado en este evento")
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
    };

    const cambiarDatoModalPersona = () => {
      if (personData) {
        setFormData({
          idPersona:personData.idPersona || '',
          nombrePersona: personData.nombrePersona || '',
          apellidoPersona: personData.apellidoPersona || '',
          genero: personData.genero || '',
          pais:personData.pais || '',
          correo: personData.correo || '',
        });
      }
      setMensajeError({
        nombreParticipanteError: '',
        ApellidoParticipanteError:'',
        ciParticipanteError: '',
        generoParticipanteError: '',
        correoParticipanteError: '',
      });
     
          setIsModalOpenPersona(false);
            bloquearInput();
        };

//-----------------------Buscar person-----------------------------------------------------------



const buscarPersona = async (elpais,cipersonsa)=>{
  try{     
    const response = await axios.get(`./buscarPorId/${elpais}/${cipersonsa}`);
     if(!response.data.persona){
      //console.log("no hay coincidencias",elpais)
      
     }else{
      setPersonData(response.data.persona);
      setIsModalOpenPersona(true);
    //  console.log("si hay coincidencias",personData);
     // console.log("es truuue?", isModalOpenPersona);
    //  aqui mostrar el modal, cuando se pecione el boton si se actualiza los datos de formData
   
     }
} catch (error) { 
  console.error("hubo un error al buscar persona",personData);

}
}

///--------------------------------------------------
const [inputDisabled, setInputDisabled] = useState(false);

const bloquearInput = () => {
  setInputDisabled(true);
};

  //para el pais
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
    //  buscarPersona(pai, formData.idPersona);
     // console.log("el pais id es ",formData.idPersona)
 
}
};



//-----------------------------------------------------------------

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
              console.log("el value es ",formData.idPersona)

              const ciRes=validate.validarCI(value);
           
              setMensajeError((mensajeError) => ({ ...mensajeError, ciParticipanteError: ciRes }));
              if(ciRes===""){
                setFormData({
                  ...formData,
                  [name]:   value,
              })
              buscarPersona(formData.pais, value);

            }else{
              const ciNew=validate.devolverCI(value);
                setFormData({
                  ...formData,
                  [name]: ciNew,
                })
                buscarPersona(formData.pais, ciNew);

            }
            break;

        case 'correo':
          const correo=validate.validarCorreo(value);
    if(correo!==""){
      const datoCorreo=validate.devolverCorreo(value);
      setFormData({
        ...formData,
        [name]: datoCorreo,
    })
      setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: correo }));
    }else{
      setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: "" }));

      setFormData({
        ...formData,
        [name]: value,
    })    }
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
    e.preventDefault();
    if(personData) {
      guardarParticipante()
    }else{
    setMensajeError({
      nombreParticipanteError: validate.validarCampoVacio(formData.nombrePersona),
      ApellidoParticipanteError: validate.validarCampoVacio(formData.apellidoPersona),
      ciParticipanteError: validate.validarCampoVacio(formData.idPersona),
      generoParticipanteError: validate.validarCampoVacio(formData.genero),
      correoParticipanteError: validate.validarCampoVacio(formData.correo),
    });
     


      const v1=validate.validarNombre(formData.nombrePersona);
const v2=validate.validarNombre(formData.apellidoPersona);
const v3=validate.validarCI(formData.idPersona);
const v5=validate.validarCorreo(formData.correo);
const v6=validate.validarGenero(formData.genero);

//ERRORES

if (v1 !== "" || v2 !== "" || v3 !== "" || v5 !== "" || v6 !== "") {
 
  setShowErrorModal2(true);

    }else{
     
      setInputDisabled(false);

      axios.post('./storePersona', formData)
        .then((a) => {
         // console.log(a.data.message);

        //  console.log("ellllll datooo essss", evento)
         //console.log('Datos guardados correctamente', formData.idPersona);
        guardarParticipante();
        
      })
      .catch((error) => {     
        if (error.response && error.response.status === 400) {
          console.error(error.response.data.message);
         guardarParticipante();
      } else {
          // Maneja otros errores
          setMensajeErrorModal("Ha ocurrido un error al realizar el registro. Inténtelo nuevamente.")

          console.error('Error en la solicitud:', error.message);
          console.error('Error al guardar los datos de persona', error);
          setShowErrorModal(true);

      }  

      });
        
  
    }
  }
  }
  const opcionesGenero = [
    { value: '', label: '' },
    { value: 'F', label: 'Femenino' },
    { value: 'M', label: 'Masculino' },
  ];
  return (
    <div className='contenedor-form '>
    <br/>
         
        <h1 className='centrar-titulo'>Formulario de Registro de Participante</h1>
      <br/>
    <form onSubmit={handleSubmit}>
            
      <div className="paisCI-container">
  <div className="paisCI2-container">
    <label htmlFor="pais">País:</label>
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
  <div>
  <label  htmlFor="idPersona">CI: </label>
        <input
          type="text"
          id="idPersona"
          name="idPersona"
          value={formData.idPersona}
          placeholder="Ingrese su número de identificación"
          onChange={handleChange}
          disabled={inputDisabled}
          
        />
         <p style={{ color: 'red' }}>{mensajeError.ciParticipanteError}</p>
        
  </div>
</div>


      <br/>

      <div>
        <label className="subtitulo required"  htmlFor="nombrePersona">Nombre:</label>
        <input
          type="text"
          id="nombrePersona"
          name="nombrePersona"
          value={formData.nombrePersona}
          placeholder="Ingrese su nombre"
          onChange={handleChange}
          disabled={inputDisabled}

        />
         <p style={{ color: 'red' }}>{mensajeError.nombreParticipanteError}</p>
      </div>
      <br/>
      <div>
        <label  htmlFor="apellidoPersona">Apellido:</label>
        <input
          type="text"
          id="apellidoPersona"
          name="apellidoPersona"
          value={formData.apellidoPersona}
          placeholder="Ingrese sus apellidos"
          onChange={handleChange}    
          disabled={inputDisabled}
      
        />
         <p style={{ color: 'red' }}>{mensajeError.ApellidoParticipanteError}</p>
      </div>
      <br/>
     

      
      <div>
        <label  htmlFor="genero">Género:</label>
        <select
          id="genero"
          name="genero"
          value={formData.genero}
          placeholder="Selecciona una opcion"
          onChange={handleChange}
          disabled={inputDisabled}

        >
          {opcionesGenero.map((opcion) => (
      <option key={opcion.value} value={opcion.value}>
        {opcion.label}
      </option>
    ))}
        </select>
        <p style={{ color: 'red' }}>{mensajeError.generoParticipanteError}</p>
      </div>
      
      <br/>
      <div>
        <label  htmlFor="correo">Correo:</label>
        <input
          type="text"
          id="correo"
          name="correo"
          value={formData.correo}
          placeholder="example@gmail.com"
          onChange={handleChange}
          disabled={inputDisabled}

        />
         <p style={{ color: 'red' }}>{mensajeError.correoParticipanteError}</p>
      </div>
      <br/>
       <div className='button-container-RP'>
          <button className="blue-button-RP" type="button" onClick={() => handleInicioClick()}>Salir</button>
          <button className="blue-button-RP" type="submit">Registrar</button>
       </div>
  </form>
  {isModalOpenPersona && (
        <ModalPersona
          onClose={cerrarModalPersona}
          handleYes={cambiarDatoModalPersona}
          correo={personData.correo}
        />
      )}
      {registroExitoso && <SuccessMessage 
      message="¡Registro exitoso!"
      onClose={closeExitorModal}
       />}
      {showErrorModal && (
        <ErrorMessage message={mensajeErrorModal} 
        onClose={closeErrorModal} />
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
          // Muestra el mensaje de error en tu aplicación
