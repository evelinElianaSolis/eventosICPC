import React from 'react';
import './assets/footer.css';

const Footer = () => {
  return (
    <footer>
      <p>&copy;  2023  ICPC-UMSS</p>


      <div class="footer-section social">
        <h2>Redes Sociales</h2>
        <ul class="social-icons">
          <li><a href="#" target="_blank"><i class="fab fa-facebook"></i></a></li>
          <li><a href="#" target="_blank"><i class="fab fa-twitter"></i></a></li>
          <li><a href="#" target="_blank"><i class="fab fa-instagram"></i></a></li>
          <li><a href="#" target="_blank"><i class="fab fa-linkedin"></i></a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
