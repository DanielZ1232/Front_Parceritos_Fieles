import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.css'; // Asegúrate de que este archivo esté en la misma carpeta que el componente o ajusta la ruta.

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import NavIndex from "../../components/navIndex";
import Footer from "../../components/footer";

const Login = () => {
    const [Correo, setCorreo] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const navigate = useNavigate();

    const manejarInicioSesion = async (e) => {
        e.preventDefault();

        try {
            const respuesta = await axios.get('http://localhost:3002/Usuarios/');
            const usuarios = respuesta.data;

            const usuario = usuarios.find(
                user => user.Correo === Correo && user.Contraseña === Contraseña
            );

            if (usuario) {
                alert('Inicio de sesión exitoso');
                localStorage.setItem('usuarioId', usuario.id);

                switch (usuario.Rol) {
                    case 'Cliente':
                        navigate('/menu');
                        break;
                    case 'Empleado':
                        navigate('/menuEmpleado');
                        break;
                    case 'Gerente':
                        navigate('/menuGerente');
                        break;
                    default:
                        alert('Rol desconocido');
                        break;
                }
            } else {
                alert('Correo o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión');
        }
    };

    return (
        <div className="login-page-container">
            <NavIndex /> {/* Menú de navegación */}
            <main className="login-content">
                <div className="login-container">
                    <div className="login-right-section">
                        <h1>Inicia Sesión</h1>
                        <form id="loginForm" onSubmit={manejarInicioSesion}>
                            <div className="form-group">
                                <label htmlFor="email">Correo</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Tu correo"
                                    value={Correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Tu contraseña"
                                    value={Contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-links">
                                <Link to="#">¿Olvidaste tu Contraseña?</Link>
                                <Link to="/registrar">¿No tienes cuenta? Regístrate!</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <a href="https://wa.me/3103409688" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
            </a>
            <Footer /> {/* Pie de página */}
        </div>
    );
}

export default Login;
