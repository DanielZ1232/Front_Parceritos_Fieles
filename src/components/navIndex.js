import React from 'react';
import './styleNavIndex.css'; // Asegúrate de que esta ruta es correcta
import Logo from '../assets/Imagenes/logo.png'; // Asegúrate de que la ruta es correcta

const NavIndex = () => {
    return (
        <header>
            <div className="container">
                <nav id="nav">
                    <img src={Logo} alt="Logo" className="logo" />
                    <ul>
                        <li><a href="#nosotros">Nosotros</a></li>
                        <li><a href="#servicio">Servicios</a></li>
                        <li><a href="#ubicacion">Ubicación</a></li>
                        <li><a href="#opiniones">Opiniones</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default NavIndex;
