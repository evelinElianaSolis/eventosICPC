import React, { useState } from 'react';
import './assets/ModalPersonaEncontrada.css';
import enviarCorreo from './utils/EnviarCorreo'; // Ajusta la ruta según sea necesario

const Modal = ({ onClose, handleYes, correo }) => {
  const esteEsSuCorreo=`Este es su correo: ${correo}`;
  const leEnviamosCodigo=`Ingrese el codigo que enviamos a este correo: ${correo}`;

  const [codigo, setCodigo] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [errorCodigo, setErrorCodigo] = useState('');
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [errorCodigoTF, setErrorCodigoTF] = useState(false);
  const [mensaje, setMensaje] = useState(esteEsSuCorreo);

 

  const generarCodigo = () => {
    const nuevoCodigo = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return nuevoCodigo;
  };
  
  const enviarCodigo = async () => {
    const nuevoCodigo = generarCodigo();
    setCodigo(nuevoCodigo);
    console.log('codigo enviado');

    setErrorCodigo('');

    try {
      await enviarCorreo(correo, 'Tu Código de Verificación', `Tu código es: ${nuevoCodigo}`);
      setCodigoEnviado(true);
      setMensaje(leEnviamosCodigo);
    } catch (error) {
      console.error('Error al enviar el correo', error);
    }
  };

  const verificarCodigo = () => {
    if (codigo === codigoIngresado) {
      setErrorCodigoTF(false);
console.log('verificado');
      handleYes();
    } else {
      console.log('nooo verificado');

      setErrorCodigo('El código ingresado no es correcto quiere ');
      setErrorCodigoTF(true);
    }
  };
  const handleChange = (e) => {
    const inputValue = e.target.value;
    // Validar que solo se ingresen números y limitar la longitud a 5 caracteres
    const soloNumeros = inputValue.replace(/[^\d]/g, ''); // Elimina caracteres no numéricos
    const codigoValidado = soloNumeros.slice(0, 5); // Limita la longitud a 5 caracteres

    setCodigoIngresado(codigoValidado);
  };

  return (
    <div className='modal-containerPE' >
      <div className='modal-contentPE'>
        <span className="cerrarPE" onClick={onClose}>&times;</span>
        <h2 id="modal-title">¿Ud. ya se ha registrado a un evento ICPC antes?</h2>
        <p className='mensajePE' id="modal-description">{mensaje}</p>

        {!codigoEnviado ? (
          <>
            <p className='mensajePE'>Si es así, por favor, solicite su código para autocompletar los campos</p>
            <div className='botones-container'>
  <button className='boton-okPE' onClick={enviarCodigo}>Enviar Código</button>
  <button className='boton-okPE' onClick={onClose}>No</button>
</div>
          </>
        ) : (
          <>
            <div >
              <label htmlFor="codigoIngresado">Código:</label>
              <input
                type="text"
                id="codigoIngresado"
                name="codigoIngresado"
                value={codigoIngresado}
                onChange={handleChange}
                maxLength="5"
              />
            </div>      
            <div className='verificar-container'>  
            <button className='boton-verificarPE' onClick={verificarCodigo}>Verificar código</button>
            </div> 
          </>
        )}

{errorCodigoTF && (
  <>
    <br />
    <div className='reenvio-container'>
      <p className={`errorPE ${errorCodigo.trim() === '' ? 'centered-text' : ''}`}>
        {errorCodigo}
        <button className='button-link' onClick={enviarCodigo}>
          Volver a enviar código
        </button>
      </p>
    </div>
  </>
)}


      </div>
    </div>
    
  );
};

export default Modal;


////////////////////-----