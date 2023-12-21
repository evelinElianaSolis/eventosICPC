import React from 'react';
import Aside from '../components/aside';
import Header from '../components/header';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import VerInfo from '../components/EventosParaVerInformacion';

const CrearEvento = () => {
  return (
    <div>
    <Header />
    <div  className="main-container" >
      <div className="column1">
        <div className="news-section1">
          <Navbar />
        </div>
      </div>
      <div className="column" >
      <div className="tweet-composer">
          <VerInfo />
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

export default CrearEvento;