import React, { useState, useEffect } from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/Imagenes/logo.png'; // Asegúrate de que la ruta sea correcta

const Footer = ({ onLoginClick, onRegisterClick }) => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer>
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={logo} alt="Logo de Parceritos Fieles" style={{ width: '100px', height: 'auto' }} />
                </div>
                <div className="footer-section">
                    <h3>Sobre Nosotros</h3>
                    <p>Parceritos Fieles se especializa en el cuidado y bienestar de tu mascota.</p>
                </div>

                <div className="footer-section">
                    <h3>Preguntas Frecuentes</h3>
                    <p><a href="#faq">¿Cuáles son los horarios?</a></p>
                    <p><a href="#servicios">¿Qué servicios ofrecen?</a></p>
                </div>

                <div className="footer-section">
                    <h3>Ubicación</h3>
                    <p>Kilometro 9, Via tenjo</p>
                    <p><a href="#map">Ver en el mapa</a></p>
                </div>

                <div className="footer-section">
                    <h3>Redes Sociales</h3>
                    <ul className="social-media">
                        <li><a href="https://www.facebook.com/profile.php?id=61555383941250" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a></li>
                        <li><a href="https://www.instagram.com/Guarderia_Parceritos_Fieles" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a></li>
                        <li><a href="https://www.tiktok.com/@parceritosfieles" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTiktok} />
                        </a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Acceso</h3>
                    <p><a href="#" onClick={onLoginClick}>¿Ya tienes cuenta? Inicia sesión</a></p>
                    <p><a href="#" onClick={onRegisterClick}>¿Eres nuevo? Regístrate</a></p>
                </div>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-bottom">
                &copy; {currentYear} Parceritos Fieles. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
