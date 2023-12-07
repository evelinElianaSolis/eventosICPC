import React, { useState , useEffect} from 'react';
import axios from './api/conexionApi';
import './assets/FormularioRegistrarParticipanteToEquipo.css';
import SuccessMessage from './ModalRegistroExitoso';
import ErrorMessage from './ModalErrorRegistro';
import ModalSalir from './ModalParaSalir';
import validate from './utils/Validaciones';

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
    idEquipoError:'',
    seleccionarEquipoError:'',
  });

  const handleChangeCorreo = (e) => {
    const { name, value } = e.target;
    const correo=validate.validarCorreo(value);
    if(correo!==""){
      const datoCorreo=validate.devolverCorreo(value);
      setCorreoData((correoData) => ({ ...correoData, [name]: datoCorreo }));
      setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: correo }));
    }else{
        setCorreoData((correoData) => ({ ...correoData, [name]: value }));
    }
}
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    /*setFormData({
      ...formData,
      [name]: value
    });*/

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
              

      case 'equipo':
        const equipoRes=validate.validarCampoVacioSeleccionEquipo(selectedEquipo);
        setMensajeError((mensajeError) => ({ ...mensajeError, seleccionarEquipoError: equipoRes}));

    if (equipoRes === "" ) {
       setFormData({
        ...formData,
        [name]: value,
      });
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
    /*if (selectedEquipo ==="" || selectedEquipo==="Selecciona un equipo") {
       setMensajeError((mensajeError) => ({ ...mensajeError, idEquipoError: "Por favor, selecciona un equipo." }));
      } else {
        setMensajeError((mensajeError) => ({ ...mensajeError, idEquipoError: "" }));
    }  */
    setMensajeError((mensajeError) => ({ ...mensajeError, seleccionarEquipoError: validate.validarCampoVacioSeleccionEquipo(selectedEquipo) }));

    setMensajeError((mensajeError) => ({ ...mensajeError, nombreParticipanteError: validate.validarCampoVacio(formData.nombrePersona) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, ApellidoParticipanteError: validate.validarCampoVacio(formData.apellidoPersona) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, ciParticipanteError: validate.validarCampoVacio(formData.idPersona) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, generoParticipanteError: validate.validarCampoVacio(formData.genero) }));
  setMensajeError((mensajeError) => ({ ...mensajeError, correoParticipanteError: validate.validarCampoVacio(correoData.correoC) }));

//ERRORES
  
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
            console.log('correo guardado', correoData.correoC);
            console.log('equippo  numerooo', selectedEquipo);
            const formParticipante = {
              idParticipante: formData.idPersona,   
              idEvento: evento.evento,
              idEquipo:selectedEquipo,
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
                    setSelectedEquipo('');
                    
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


  const [equipos, setEquipos] = useState([]);
  const [selectedEquipo, setSelectedEquipo] = useState('');

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await axios.get(`/equiposPorEvento/${evento.evento}`);
        setEquipos(response.data.equipos);
      } catch (error) {
        console.error('Error al obtener equipos:', error);
      }
    };

    fetchEquipos();
  }, [evento]);


  return (
    <div className='contenedor-form '>
    <br/>
      <h1 className='centrar-titulo'>Formulario de Registro de Participante</h1>
      <br/>
    <form onSubmit={handleSubmit}>
    <div>
      <label class="subtitulo required">Selecciona un equipo:</label>
      <select
      id='equipo'
    name='equipo'
        value={selectedEquipo}
        placeholder="Selecciona una opcion"
        onChange={(e) => setSelectedEquipo(e.target.value)}
      >
        <option value="">Selecciona un equipo</option>
        {equipos.map((equipo) => (
          <option key={equipo.idEquipo} 
          id='equipo'
          name='equipo'
          value={equipo.idEquipo}>
            {equipo.nombreEquipo}
          </option>
          
        ))}
      </select>
      <p style={{ color: 'red' }}>{mensajeError.seleccionarEquipoError}</p>
       
      </div>

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
  
      <br/>
      <div>
        <label class="subtitulo required" htmlFor="genero">Género:</label>
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
      {mostrarModalSalir && (
        <ModalSalir message="¿Quiere abandonar el registro?" onClose={handleCloseModalSalir} />
      )}
    </div>
  );
}
export default FormularioRegistroParticipantes;


