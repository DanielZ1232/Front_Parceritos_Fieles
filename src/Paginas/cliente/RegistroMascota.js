import React, { useState,  useEffect} from 'react';
import NavBarCliente from '../../components/navBarCliente'; // Asegúrate de que esta ruta es correcta
import Footer from '../../components/footer'; // Asegúrate de que esta ruta es correcta
import './registrar_mascota.css'; // Asegúrate de que esta ruta es correcta
import Swal from 'sweetalert2';
import axios from 'axios';

const RegistroMascota = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    raza: '',
    enfermedades: '',
    peso: '',
    edad: '',
    sexo: '',
    esterilizado: ''
  });

  const [showTitle, setShowTitle] = useState(false);

    // Controla la animación del título
    useEffect(() => {
      setShowTitle(true); // Activa el título después de montar el componente
    }, []);

  // Manejo de cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === 'nombre') {
      formattedValue = value.toLowerCase().replace(/^\w/, c => c.toUpperCase());
    } else if (name === 'edad' && parseInt(value, 10) < 0) {
      formattedValue = '';
      Swal.fire({
        icon: 'warning',
        title: 'Edad Inválida',
        text: 'La edad no puede ser negativa.',
        confirmButtonText: 'Aceptar'
      });
    }

    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  // Manejo de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Obtén el ID del usuario desde el localStorage
    const usuarioId = localStorage.getItem('usuarioId');
  
    if (!usuarioId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener el ID del usuario.',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
  
    // Limpia los valores antes de enviarlos
    const cleanFormData = {
      nombre: formData.nombre.trim(),
      raza: formData.raza.trim(),
      enfermedades: formData.enfermedades.trim(),
      peso: parseInt(formData.peso.trim(), 10),  // Asegura que peso sea un número entero
      edad: parseInt(formData.edad, 10),         // Asegura que edad sea un número entero
      sexo: formData.sexo.trim(),
      esterilizado: formData.esterilizado.trim(),
      id_Usuario: usuarioId
    };
  
    try {
      const response = await axios.post('http://localhost:5000/registrar-mascota', cleanFormData);  // Asegúrate de que la URL sea correcta
  
      if (response.status === 201) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Mascota registrada exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        setFormData({
          nombre: '',
          raza: '',
          enfermedades: '',
          peso: '',
          edad: '',
          sexo: '',
          esterilizado: '',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al registrar la mascota. Por favor, intente nuevamente.',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error de red:', error.response || error.message);  // Verifica más detalles sobre el error
      Swal.fire({
        icon: 'error',
        title: 'Error de red',
        text: 'No se pudo registrar la mascota. Inténtelo de nuevo más tarde.',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-100 flex flex-col">
      <NavBarCliente />
      <div className="container mx-auto mt-10 p-8 bg-gradient-to-b from-white to-gray-100 shadow-xl rounded-lg">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
    Registro de Mascotas
  </h2>
  <form onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className="block text-lg font-medium text-gray-700 mb-2">
          Nombre:
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Ingrese el nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>

      {/* Raza */}
      <div>
        <label htmlFor="raza" className="block text-lg font-medium text-gray-700 mb-2">
          Raza:
        </label>
        <input
          type="text"
          id="raza"
          name="raza"
          placeholder="Ingrese la raza"
          value={formData.raza}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>

      {/* Enfermedades */}
      <div>
        <label htmlFor="enfermedades" className="block text-lg font-medium text-gray-700 mb-2">
          Enfermedades:
        </label>
        <input
          type="text"
          id="enfermedades"
          name="enfermedades"
          placeholder="Ingrese si tiene enfermedades"
          value={formData.enfermedades}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>

      {/* Peso */}
      <div>
        <label htmlFor="peso" className="block text-lg font-medium text-gray-700 mb-2">
          Peso:
        </label>
        <input
          type="text"
          id="peso"
          name="peso"
          placeholder="Ingrese el peso"
          value={formData.peso}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>

      {/* Edad */}
      <div>
        <label htmlFor="edad" className="block text-lg font-medium text-gray-700 mb-2">
          Edad:
        </label>
        <input
          type="number"
          id="edad"
          name="edad"
          placeholder="Ingrese la edad"
          value={formData.edad}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>

      {/* Sexo */}
      <div>
        <label htmlFor="sexo" className="block text-lg font-medium text-gray-700 mb-2">
          Sexo:
        </label>
        <select
          id="sexo"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="">Seleccione una opción</option>
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
      </div>

      {/* Esterilizado */}
      <div className="col-span-1 md:col-span-2">
        <label htmlFor="esterilizado" className="block text-lg font-medium text-gray-700 mb-2">
          ¿Está Esterilizad@?
        </label>
        <select
          id="esterilizado"
          name="esterilizado"
          value={formData.esterilizado}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="">Seleccione una opción</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
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

      <Footer />
      <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

export default RegistroMascota;
