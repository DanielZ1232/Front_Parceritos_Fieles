import React, { useState, useEffect } from 'react';
import NavBarCliente from '../../components/navBarCliente'; // Ajusta la ruta según tu estructura de carpetas
import Footer from '../../components/footer'; // Ajusta la ruta según tu estructura de carpetas
import './ActualizarPerfilC.css'; // Asegúrate de que la ruta es correcta
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa FontAwesomeIcon
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Importa los íconos
import Swal from 'sweetalert2'; // Importa SweetAlert2

const ActualizarPerfilC = () => {
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        contraseña: '',
        celular: '',
        direccion: '',
        tipo_Documento: '',
        numero_Documento: ''
    });
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
    const userId = localStorage.getItem('usuarioId'); // ID del cliente actualmente autenticado

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/usuarios/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const clienteData = await response.json();
                setCliente(clienteData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log("Datos a enviar:", cliente); // Verificar los datos enviados
    
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, actualizarlo'
        });
        
        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/api/usuarios/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cliente),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                await Swal.fire({
                    title: 'Actualizado!',
                    text: 'Tus datos han sido actualizados.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });
            } catch (error) {
                console.error('Error updating data:', error);
                await Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron actualizar los datos. Inténtalo de nuevo más tarde.',
                    confirmButtonText: 'Aceptar'
                });
            }
        }
    };
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100 flex flex-col">
        <NavBarCliente />
        <main className="flex-grow container mx-auto py-10 px-6">
          <div className="container mx-auto mt-10 p-8 bg-gradient-to-b from-white to-gray-100 shadow-xl rounded-lg">
            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Actualizar Datos</h2>
            <form onSubmit={handleSubmit}>
              {/* Primera fila */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-2">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={cliente.nombre}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
      
                {/* Apellido */}
                <div>
                  <label htmlFor="apellido" className="block text-lg font-medium text-gray-700 mb-2">
                    Apellido:
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={cliente.apellido}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
      
              {/* Segunda fila */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Correo */}
                <div>
                  <label htmlFor="correo" className="block text-lg font-medium text-gray-700 mb-2">
                    Correo:
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={cliente.correo}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
      
                {/* Contraseña */}
                <div>
                  <label htmlFor="contraseña" className="block text-lg font-medium text-gray-700 mb-2">
                    Contraseña:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="contraseña"
                      name="contraseña"
                      value={cliente.contraseña}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-5 text-gray-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
      
              {/* Tercera fila */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Celular */}
                <div>
                  <label htmlFor="celular" className="block text-lg font-medium text-gray-700 mb-2">
                    Celular:
                  </label>
                  <input
                    type="text"
                    id="celular"
                    name="celular"
                    value={cliente.celular}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
      
                {/* Dirección */}
                <div>
                  <label htmlFor="direccion" className="block text-lg font-medium text-gray-700 mb-2">
                    Dirección:
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={cliente.direccion}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
      
              {/* Cuarta fila */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Tipo de documento */}
                <div>
                  <label htmlFor="tipo_documento" className="block text-lg font-medium text-gray-700 mb-2">
                    Tipo de documento:
                  </label>
                  <input
                    type="text"
                    id="tipo_documento"
                    name="tipo_Documento"
                    value={cliente.tipo_Documento}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
      
                {/* Número de documento */}
                <div>
                  <label htmlFor="numero_documento" className="block text-lg font-medium text-gray-700 mb-2">
                    Número de documento:
                  </label>
                  <input
                    type="text"
                    id="numero_documento"
                    name="numero_Documento"
                    value={cliente.numero_Documento}
                    onChange={handleChange}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
      
              {/* Botón */}
              <div className="text-center mt-8">
                <button
                  type="submit"
                  className="btn btn-primary actualizar-btn text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </main>
        <Footer />
        <a
          href="https://wa.me/1234567890"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp text-xl"></i>
        </a>
      </div>
      
    );
};

export default ActualizarPerfilC;
