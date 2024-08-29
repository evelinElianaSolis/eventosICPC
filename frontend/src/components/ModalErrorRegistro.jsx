
import './assets/ModalErrorRegistro.css';

const ErrorMessage = ({ message, onClose }) => {
  const handleOKClick = () => {
    onClose();
  };

  return (
    <div className='modal-container-ERROR'>
      <div className='modal-content-ERROR error'>
        <div className='message-ERROR'>{message}</div>
        <div className='btn-ok-ERROR'>
          <button onClick={handleOKClick}>OK</button>
        </div>
      </div>
    </div>
  );
};
export default ErrorMessage;