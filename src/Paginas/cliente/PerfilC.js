import React, { useState, useEffect } from 'react';
import NavBarCliente from '../../components/navBarCliente';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import Usuario from '../../assets/Imagenes/usuario.png';

const PerfilC = () => {
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const userId = localStorage.getItem('usuarioId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/usuarios/${userId}/perfil`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCliente(data);
            } catch (error) {
                console.error('Error al obtener datos del perfil:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [userId]);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    if (loading) return <div className="text-center text-gray-700">Cargando...</div>;
    if (!cliente) return <div className="text-center text-red-600">No se encontraron datos del cliente.</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <NavBarCliente />
            <div className="flex flex-col items-center py-10">
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
                    <div className="flex flex-col items-center text-center">
                        <img src={Usuario} alt="Perfil del Usuario" className="w-24 h-24 rounded-full mb-4 shadow-md" />
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
                        <p className="text-gray-500">Tú información personal</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p className="text-gray-500 font-medium">Nombre</p>
                            <p className="text-lg font-semibold text-gray-800">{cliente.nombre}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p className="text-gray-500 font-medium">Apellido</p>
                            <p className="text-lg font-semibold text-gray-800">{cliente.apellido}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p className="text-gray-500 font-medium">Correo</p>
                            <p className="text-lg font-semibold text-gray-800">{cliente.correo}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p className="text-gray-500 font-medium">Celular</p>
                            <p className="text-lg font-semibold text-gray-800">{cliente.celular}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p className="text-gray-500 font-medium">Tipo de Documento</p>
                            <p className="text-lg font-semibold text-gray-800">{cliente.tipo_Documento}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p className="text-gray-500 font-medium">Número de Documento</p>
                            <p className="text-lg font-semibold text-gray-800">{cliente.numero_Documento}</p>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <p className="text-gray-500 font-medium">Dirección</p>
                            <p className="text-lg font-semibold text-gray-800">{cliente.direccion}</p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <Link
                            to="/actualizar-perfil"
                            className="btn btn-primary actualizar-btn text-white py-3 px-7 rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
                        >
                            Actualizar Datos
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
            <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
            </a>
        </div>
    );
};

export default PerfilC;
