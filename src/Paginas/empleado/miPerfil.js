import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navBarEmpleado';
import Footer from '../../components/footer';
import Imagen from '../../assets/Imagenes/usuario.png';

const MiPerfil = () => {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <div className="text-center text-gray-700">Cargando...</div>;
  if (!cliente) return <div className="text-center text-red-600">No se encontraron datos del cliente.</div>;
 
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-gray-100 rounded-lg shadow-lg p-8">
            {/* Título centrado */}
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-gray-800 text-center">Perfil Empleado</h1>
            </div>
            {/* Imagen de perfil */}
            <div className="flex flex-col items-center mt-6">
              <img
                src={Imagen}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                {cliente.nombre} {cliente.apellido}
              </h2>
            </div>
            {/* Grid de información */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 font-semibold">Correo</h3>
                <p className="text-gray-800">{cliente.correo}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 font-semibold">Celular</h3>
                <p className="text-gray-800">{cliente.celular}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 font-semibold">Tipo Documento</h3>
                <p className="text-gray-800">{cliente.tipo_Documento}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 font-semibold">Número Documento</h3>
                <p className="text-gray-800">{cliente.numero_Documento}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 font-semibold">Dirección</h3>
                <p className="text-gray-800">{cliente.direccion}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-gray-600 font-semibold">Contraseña</h3>
                <p className="text-gray-800">********</p>
              </div>
            </div>
            {/* Botón de actualización */}
            <div className="mt-8 text-center">
              <a
                href="/actualizarDatosE"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 duration-300"
              >
                Actualizar Datos
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MiPerfil;
