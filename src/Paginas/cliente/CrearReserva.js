import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBarCliente from '../../components/navBarCliente';
import Footer from '../../components/footer';
import Swal from 'sweetalert2';

const CrearReserva = () => {
  const [formData, setFormData] = useState({
    fechaInicio: '',
    fechaFinal: '',
    mascota: '',
    tipoServicio: '',
    estado: 'Por Confirmar'
  });

  const [mascotas, setMascotas] = useState([]);
  const [userId] = useState(localStorage.getItem('usuarioId'));
  const [disponibilidad, setDisponibilidad] = useState({});

  const today = new Date().toISOString().split('T')[0];

  // Consultar disponibilidad por fecha
const checkDisponibilidad = async (fecha) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/reservas/disponibilidad/${fecha}`);
    setDisponibilidad((prev) => ({
      ...prev,
      [fecha]: response.data.capacidadRestante > 0,
    }));
  } catch (error) {
    console.error('Error al consultar disponibilidad:', error);
  }
};

// Actualizar disponibilidad para cada día
useEffect(() => {
  if (formData.fechaInicio) {
    checkDisponibilidad(formData.fechaInicio);
  }
}, [formData.fechaInicio]);

// Cambiar color según la disponibilidad
const getInputStyle = (fecha) => {
  if (!disponibilidad[fecha]) return {};
  return disponibilidad[fecha]
    ? { borderColor: 'green' }
    : { borderColor: 'red' };
};

  // Obtener las mascotas del usuario
  useEffect(() => {
    const fetchMascotas = async () => {
      if (!userId) return;
      try {
        const response = await axios.post('http://localhost:5000/api/clientes/mascotas', { userId });
        setMascotas(response.data);
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al obtener las mascotas. Inténtalo de nuevo más tarde.',
        });
      }
    };

    fetchMascotas();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  
    // Limpiar `fechaFinal` si el servicio cambia a "pasadia"
    if (name === 'tipoServicio' && value === 'pasadia') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        fechaFinal: '',
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userId) {
      console.error('ID del usuario no encontrado en localStorage');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID del usuario no encontrado. Por favor, inicie sesión nuevamente.'
      });
      return;
    }
  
    const reserva = {
      fechaInicio: formData.fechaInicio,
      ...(formData.tipoServicio === 'hotel' && { fechaFinal: formData.fechaFinal }),
      mascota: formData.mascota,
      tipoServicio: formData.tipoServicio,
      usuarioId: userId
    };
  
    console.log('Datos enviados a la API de reserva:', reserva);
  
    try {
      // Consultar el correo y el nombre del cliente
      const userResponse = await axios.get(`http://localhost:5000/api/usuarios/${userId}`);
      const { correo: emailCliente, nombre: nombreCliente } = userResponse.data;

      if (!emailCliente || !nombreCliente) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron obtener los datos del cliente.',
        });
        return;
      }

      // Crear la reserva
      const response = await axios.post('http://localhost:5000/api/reservas', reserva, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Reserva creada exitosamente",
          showConfirmButton: false,
          timer: 1500
        });

        // Enviar correo de confirmación
        const emailData = {
          emailCliente,
          nombreCliente,
          asunto: 'Confirmación de tu reserva',
          htmlContent:  `
          <div style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; padding: 10px; background-color: #4CAF50; border-radius: 8px 8px 0 0; color: white;">
              <h1 style="margin: 0; font-size: 24px;">¡Hola, ${nombreCliente}!</h1>
            </div>
            <div style="padding: 20px;">
              <p style="font-size: 18px;">Gracias por confiar en nosotros. Aquí están los detalles de tu reserva:</p>
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #4CAF50;">Mascota:</td>
                  <td style="padding: 10px;">${formData.mascota}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #4CAF50;">Servicio:</td>
                  <td style="padding: 10px;">${formData.tipoServicio}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; color: #4CAF50;">Fecha de inicio:</td>
                  <td style="padding: 10px;">${formData.fechaInicio}</td>
                </tr>
                ${
                  formData.fechaFinal
                    ? `<tr>
                        <td style="padding: 10px; font-weight: bold; color: #4CAF50;">Fecha final:</td>
                        <td style="padding: 10px;">${formData.fechaFinal}</td>
                      </tr>`
                    : ''
                }
              </table>
              <p style="text-align: center; font-size: 16px; color: #555;">
                ¡Te esperamos pronto! Si tienes alguna pregunta, no dudes en contactarnos.
              </p>
            </div>
            <div style="text-align: center; padding: 10px; background-color: #f1f1f1; border-radius: 0 0 8px 8px; font-size: 14px; color: #777;">
              <p style="margin: 0;">© 2024 Parceritos Fieles. Todos los derechos reservados.</p>
            </div>
          </div>
        `,
        };

        await axios.post('http://localhost:5000/api/send-email', emailData, {
          headers: {
              'Content-Type': 'application/json',
          },
        });

  
        setFormData({
          fechaInicio: '',
          fechaFinal: '',
          mascota: '',
          tipoServicio: '',
          estado: 'Por Confirmar'
        });
      } else {
        console.error('Error al crear la reserva:', response.status);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear la reserva. Inténtalo de nuevo más tarde.',
        });
      }
    } catch (error) {
      if (error.response) {
        console.error('Detalles del error 400:', error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.error || 'Error al crear la reserva.',
        });
      } else {
        console.error('Error de red:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error de red. Inténtalo de nuevo más tarde.',
        });
      }
    }
  };
  const [showTitle, setShowTitle] = useState(false);

  // Controla la animación del título
  useEffect(() => {
    setShowTitle(true); // Activa el título después de montar el componente
  }, []);
  

  return (
    <div style={styles.pageContainer}>
      <NavBarCliente />
      <div style={styles.formWrapper}>
        <div style={styles.formContainer}>
        <h2 style={styles.title} className={showTitle ? 'fade-in' : ''}>Crear Reserva</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="fechaInicio">Fecha de inicio</label>
                <input
                  type="date"
                  id="fechaInicio"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  min={today}
                  style={{ ...styles.input, ...getInputStyle(formData.fechaInicio) }}
                  required
                />
              </div>
              <div style={styles.formGroup}>
              <label htmlFor="fechaFinal">Fecha de final</label>
                <input
                  type="date"
                  id="fechaFinal"
                  name="fechaFinal"
                  value={formData.fechaFinal}
                  onChange={handleChange}
                  min={formData.fechaInicio || today}  // La fecha mínima en Fecha Final es la Fecha Inicio seleccionada
                  style={styles.input}
                  required={formData.tipoServicio === 'hotel'}
                  disabled={formData.tipoServicio === 'pasadia'}
                />
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label htmlFor="mascota">Seleccione mascota</label>
                <select
                  id="mascota"
                  name="mascota"
                  value={formData.mascota}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  {mascotas.map((mascota) => (
                    <option key={mascota.id_Mascota} value={mascota.nombre}>
                      {mascota.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="tipoServicio">Seleccione servicio</label>
                <select
                  id="tipoServicio"
                  name="tipoServicio"
                  value={formData.tipoServicio}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value="hotel">Hotel</option>
                  <option value="pasadia">Pasadía</option>
                </select>
              </div>
            </div>
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.submitButton}>Registrar</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <a href="https://wa.me/1234567890" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    padding: '30px'
  },
  formContainer: {
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    width: '100%',
    justifyItems: 'center',
  },
  formRow: {
    display: 'contents',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '280px',
    gap: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    gridColumn: 'span 2',
    display: 'flex',
    justifyContent: 'center',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  title: {
    fontFamily: 'Poppins-SemiBold, sans-serif',
    color: '#28a745',
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    letterSpacing: '2px',
    background: 'linear-gradient(90deg, #1db954, #1ca54f)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    opacity: 0,
    transform: 'translateY(-20px)',
    animation: 'fadeInTitle 0.6s forwards ease-in-out',
  },

  '@keyframes fadeInTitle': {
    '0%': {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
};

export default CrearReserva;
