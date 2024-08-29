import React from 'react';
import Formulario from '../components/ModalRegistrarParticipanteToEquipo'
import Aside from '../components/aside';
import Header from '../components/header';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import Formulario3 from '../components/FormularioRegistrarParticipantesToEquipo'
import { useParams } from 'react-router-dom';
const RegistroParticipantes = () => {
  const {id} =useParams();
  return (
    <div>
      <Header />
      <div className="main-container" >
        <div className="column1">
          <div className="news-section">
            <Navbar />
          </div>
        </div>
        <div className="column">
          <div className="tweet-composer">
            <Formulario3 evento={id}/>
          </div>
        </div>
        <div className="column2">
          <div className="news-section">
            <Aside />
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}

export default RegistroParticipantes;