import React from 'react';
import './assets/footer.css';

const Footer = () => {
  return (
    <footer>
      <p>&copy;  2023  ICPC-UMSS</p>


      <div className="footer-section social">
        
      <div><h4 className='redes'>Redes Sociales</h4>
        <ul className="redes-sociales">
        
        <a href="https://www.facebook.com/tu_pagina"  className='redessociales'>
          <img src="   https://cdn-icons-png.flaticon.com/512/733/733547.png  " alt="" />
        </a>
        <a href="https://twitter.com/tu_cuenta" className='redessociales'>
          <img src="   https://cdn-icons-png.flaticon.com/512/3256/3256013.png " alt="" />
        </a>
        <a href="https://www.instagram.com/tu_perfil" className='redessociales'>
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="" />
        </a>
        <a href="https://www.linkedin.com/in/tu_perfil" className='redessociales'>
          <img src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="" />
        </a>
    </ul>
    </div>
      </div>
    </footer>
  );
};

export default Footer;
