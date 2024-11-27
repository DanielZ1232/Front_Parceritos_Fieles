import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Para obtener el ID de la queja de la URL y redirigir al usuario
import './actualizarQuejaC.css';

const ActualizarQuejaC = () => {
    const { id_Queja } = useParams(); // Obtener el ID de la queja desde la URL
    const [queja, setQueja] = useState(''); // Estado para almacenar la queja
    const navigate = useNavigate(); // Para redirigir después de la actualización
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        // Función para obtener la queja desde el backend
        const fetchQueja = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/quejas/${id_Queja}`); // Ajustar el endpoint
                if (response.ok) {
                    const data = await response.json();
                    setQueja(data.contenido); // Suponiendo que el campo es "contenido"
                } else {
                    console.error('Error al obtener la queja:', response.status);
                }
            } catch (error) {
                console.error('Error de red:', error);
            } finally {
                setLoading(false); // Termina la carga
            }
        };

        fetchQueja();
    }, [id_Queja]);

    // Función para actualizar la queja
    const actualizarQueja = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/quejas/${id_Queja}`, { // Verifica que la URL sea correcta
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contenido: queja }), // Enviamos solo el contenido de la queja
            });
    
            if (response.ok) {
                alert('Queja actualizada con éxito!');
                navigate('/consultar-quejas'); // Redirigir a la página de consulta de quejas
            } else {
                console.error('Error al actualizar la queja:', response.status);
            }
        } catch (error) {
            console.error('Error de red al actualizar la queja:', error);
        }
    };

    if (loading) {
        return <div>Cargando datos de la queja...</div>;
    }

    return (
        <>
            <header>
                <div className="logo">
                    <a href="/menus/cliente">
                        <img src="../img/logo.png" alt="Logo Parceritos Fieles" />
                    </a>
                </div>
                <nav>
                    <div className="nav">
                        <div className="dropdown">
                            <a href="#">Mascotas</a>
                            <div className="dropdown-content">
                                <a href="/registro-mascota">Registrar</a>
                                <a href="/consultar-mascota">Consultar</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <a href="#">Reservas</a>
                            <div className="dropdown-content">
                                <a href="/crear-reserva">Registrar</a>
                                <a href="/consultar-reserva">Consultar</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <a href="#">Quejas</a>
                            <div className="dropdown-content">
                                <a href="/crear-queja">Crear</a>
                                <a href="/consultar-quejas">Consultar</a>
                            </div>
                        </div>
                        <div className="nav-item">
                            <a href="/perfil-cliente">Perfil</a>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container">
                    <div className="content">
                        <div className="logo">
                            <a href="/menus/cliente">
                                <img src="../img/logo.png" alt="Logo Parceritos Fieles" />
                            </a>
                        </div>
                        <h2>Actualizar Queja</h2>
                        <p>Por favor, actualice la información de su queja</p>
                        <form className="actualizar-form" onSubmit={actualizarQueja}>
                            <textarea
                                id="queja"
                                name="queja"
                                rows="4"
                                cols="50"
                                value={queja}
                                onChange={(e) => setQueja(e.target.value)} // Actualizar el estado mientras se escribe
                            />
                            <br />
                            <button type="submit" className="guardar-btn">Guardar</button>
                        </form>
                    </div>
                </div>
            </main>
            <footer>
                <p>&copy; 2024 Parceritos Fieles</p>
                <ul className="social-media">
                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                </ul>
            </footer>
        </>
    );
};

export default ActualizarQuejaC;
