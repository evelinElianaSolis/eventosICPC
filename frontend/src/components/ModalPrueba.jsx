import React, { useState } from 'react';

const ModalChild = ({ onCloseSelf, onOpenSecondaryModal, onCloseParent }) => {
  const [isSecondaryModalOpen, setSecondaryModalOpen] = useState(false);

  const handleSelfClose = () => {
    onCloseSelf();
  };

  const handleSecondaryModalOpen = () => {
    setSecondaryModalOpen(true);
    onOpenSecondaryModal(); // Notifica al modal padre sobre la apertura del modal secundario
  };

  const handleSecondaryModalClose = () => {
    setSecondaryModalOpen(false);
    onCloseSelf(); // Cierra el modal hijo cuando se cierra el modal secundario
  };

  return (
    <div>
      <h2>Contenido del Modal Hijo</h2>
      <button onClick={handleSelfClose}>Cerrar Modal Hijo</button>
      <button onClick={handleSecondaryModalOpen}>Abrir Modal Secundario</button>

      {isSecondaryModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Modal secundario */}
            <div>
              <h2>Modal Secundario</h2>
              <button onClick={handleSecondaryModalClose}>Cerrar Modal Secundario</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalParent = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Abrir Modal Padre</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Pasa funciones para cerrar ambos modales al modal hijo */}
            <ModalChild
              onCloseSelf={closeModal}
              onOpenSecondaryModal={openModal}
              onCloseParent={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ModalParent />
    </div>
  );
};

export default App;


