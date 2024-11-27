/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef} from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import Imagen from '../assets/Imagenes/perro1.jpeg';
import loadFonts from '../assets/loadfont';
import './index2.css';
import Imagen1 from '../assets/Imagenes/imagen1.jpeg';
import Imagen2 from '../assets/Imagenes/imagen2.jpg';
import Imagen3 from '../assets/Imagenes/imagen3.jpg';
import Imagen4 from '../assets/Imagenes/imagen4.jpg';
import Imagen5 from '../assets/Imagenes/imagen5.jpg';
import Imagen6 from '../assets/Imagenes/imagen6.jpg';
import ImagenHotel from '../assets/Imagenes/hotel.jpg';
import ImagenGuarderia from '../assets/Imagenes/guarderia1.webp';
import ImagenColegio from '../assets/Imagenes/colegio1.webp';
import Footer from '../components/footer';
import Swal from 'sweetalert2'; // Asegúrate de tener SweetAlert2 instalado
import axios from 'axios';
import Icono1 from '../assets/Imagenes/icono1.png';
import Icono2 from '../assets/Imagenes/icono2.png';
import Icono4 from '../assets/Imagenes/icono4.png';
import Alert from '@mui/material/Alert'; // Importación de Alert
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/Imagenes/logo.png';
import { Button } from '@mui/material';





const Index2 = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de inicio de sesión
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [registerNombre, setRegisterNombre] = useState('');
    const [registerApellido, setRegisterApellido] = useState('');
    const [registerCorreo, setRegisterCorreo] = useState('');
    const [registerCelular, setRegisterCelular] = useState('');
    const [registerDireccion, setRegisterDireccion] = useState('');
    const [registerTipoDocumento, setRegisterTipoDocumento] = useState('');
    const [registerNumeroDocumento, setRegisterNumeroDocumento] = useState('');
    const [registerContraseña, setRegisterContraseña] = useState('');
    const [registerConfirmarContraseña, setRegisterConfirmarContraseña] = useState('');
    const [accountModalVisible, setAccountModalVisible] = useState(false);
    const [alreadyLoggedInModalVisible, setAlreadyLoggedInModalVisible] = useState(false);
    const [alertaCorreo, setAlertaCorreo] = useState(false);
    const [alertaContraseña, setAlertaContraseña] = useState(false);
    




  // Estados de alerta
  const [alertaCelular, setAlertaCelular] = useState(false);
  const [alertaDocumento, setAlertaDocumento] = useState(false);
  const [alertaConfirmarContraseña, setAlertaConfirmarContraseña] = useState(false);

  const [alertaNombre, setAlertaNombre] = useState(false);
const [alertaApellido, setAlertaApellido] = useState(false);
const [alertaDireccion, setAlertaDireccion] = useState(false);
const [alertaTipoDocumento, setAlertaTipoDocumento] = useState(false);

const [contraseñaVisible, setContraseñaVisible] = useState(false);
const [confirmarContraseñaVisible, setConfirmarContraseñaVisible] = useState(false);

const toggleContraseñaVisibility = () => {
    setContraseñaVisible(!contraseñaVisible);
};

const toggleConfirmarContraseñaVisibility = () => {
    setConfirmarContraseñaVisible(!confirmarContraseñaVisible);
};


    


  const images = [Imagen1, Imagen2, Imagen3, Imagen4, Imagen5, Imagen6];
    const navigate = useNavigate();


    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const getTransformValue = () => {
        return `translateX(-${(currentIndex * 100) / images.length}%)`;
    };
    useEffect(() => {
        loadFonts();
        const interval = setInterval(goToNextSlide, 3000);
        return () => clearInterval(interval);
    },[images.length]);

    const bannerStyles = {
      container: {
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
      },
      image: {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
      },
      overlay: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: '50px',
      },
      title: {
          color: 'white',
          fontSize: '4rem',
          fontWeight: 'bold',
          marginBottom: '10px',
          fontFamily: 'Poppins-SemiBold',
          letterSpacing: '4px',
      },
      subtitle: {
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'normal',
          marginTop: '-4px',
          marginBottom: '30px',
          fontFamily: 'Poppins-ExtraLightItalic',
          letterSpacing: '2px',
      },
      navContainer: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          top: '20px',
          left: '20px',
          width: 'calc(100% - 40px)', // Ancho para que abarque toda la página y mantenga los márgenes
      },
      logo: {
          height: '80px', // Tamaño del logo
      },
      navLinks: {
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
      },
      navLink: {
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.1rem',
          letterSpacing: '1px',
          fontFamily: "'Poppins-Regular', sans-serif",
      },
  };
  
  

    const handleAccountClick = () => {
        if (!isLoggedIn) {
            setAccountModalVisible(true);
        } else {
            setAlreadyLoggedInModalVisible(true);
        }
    };

    const handleLoginClick = () => {
        setLoginModalVisible(true);
        setAccountModalVisible(false);
    };

    const handleOpenRegisterModal = () => {
        setRegisterModalVisible(true);
        setAccountModalVisible(false);
    };
   
   
    // Validación en tiempo real del correo
  const validarCorreo = (correo) => {
    setCorreo(correo);
    if (!correo.includes('@') || !correo.endsWith('.com')) {
      setAlertaCorreo(true);
    } else {
      setAlertaCorreo(false);
    }
  };

  // Manejador de inicio de sesión
  const manejarInicioSesion = async (e) => {
    e.preventDefault();

    // Validar correo antes de enviar
    if (alertaCorreo) return;

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        correo,
        contraseña
      });

      const { usuarioId, rol, nombre } = response.data;

      Swal.fire({
        title: 'Inicio de sesión exitoso',
        text: `Bienvenido de nuevo, ${nombre}!`,
        icon: 'success'
      }).then(() => {
        localStorage.setItem('usuarioId', usuarioId);
        localStorage.setItem('nombreUsuario', nombre);

        switch (rol) {
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
            Swal.fire({ title: 'Error', text: 'Rol desconocido', icon: 'error' });
        }
        setLoginModalVisible(false);
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAlertaContraseña(true); // Muestra la alerta de contraseña incorrecta
      } else {
        Swal.fire({ title: 'Error', text: 'Error al iniciar sesión', icon: 'error' });
      }
    }
  };

        
    
      
  // Validaciones
const validarNombre = (nombre) => {
    setRegisterNombre(nombre);
    setAlertaNombre(nombre.length < 4);
  };
  
  const validarApellido = (apellido) => {
    setRegisterApellido(apellido);
    setAlertaApellido(apellido.length < 4);
  };
  
  
  const validarCelular = (celular) => {
    setRegisterCelular(celular);
    setAlertaCelular(!/^\d+$/.test(celular) || celular.length < 7 || celular.length > 10);
  };
  
  const validarDireccion = (direccion) => {
    setRegisterDireccion(direccion);
    setAlertaDireccion(direccion.length < 5);
  };
  
  const validarTipoDocumento = (tipo) => {
    setRegisterTipoDocumento(tipo);
    setAlertaTipoDocumento(tipo === ""); // Si no se selecciona nada, muestra la alerta
  };
  
  const validarDocumento = (documento) => {
    setRegisterNumeroDocumento(documento);
    setAlertaDocumento(!/^\d+$/.test(documento) || documento.length < 8 || documento.length > 10);
  };
  
  const validarContraseña = (contraseña) => {
    setRegisterContraseña(contraseña);
    const hasUpperCase = /[A-Z]/.test(contraseña);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña);
    const hasNumber = /[0-9]/.test(contraseña);
    setAlertaContraseña(!(hasUpperCase && hasSpecialChar && hasNumber));
  };
  
  const validarConfirmarContraseña = (confirmarContraseña) => {
    setRegisterConfirmarContraseña(confirmarContraseña);
    setAlertaConfirmarContraseña(confirmarContraseña !== registerContraseña);
  };
      

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
  
    if (registerContraseña !== registerConfirmarContraseña) {
      Swal.fire({ title: 'Error', text: 'Las contraseñas no coinciden', icon: 'error' });
      return;
    }
  
    if (!validatePassword(registerContraseña)) {
      Swal.fire({ title: 'Error', text: 'La contraseña debe contener al menos una letra mayúscula, un número y un signo especial', icon: 'error' });
      return;
    }
  
    try {
      const nuevoUsuario = {
        Nombre: registerNombre,
        Apellido: registerApellido,
        Correo: registerCorreo,
        Celular: registerCelular,
        Direccion: registerDireccion,
        TipoDocumento: registerTipoDocumento,
        NumeroDocumento: registerNumeroDocumento,
        Contraseña: registerContraseña,
        Rol: 'Cliente',
      };
  
      await axios.post('http://localhost:5000/api/register', nuevoUsuario);
  
      Swal.fire({
        title: 'Registrado con éxito',
        text: 'Usuario registrado con éxito',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        setRegisterModalVisible(false); // Cierra el modal después de registrar
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          title: 'Error',
          text: 'Ya existe un usuario con este correo',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Error al registrar usuario',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };
  

// Función para validar la contraseña
const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasUpperCase && hasSpecialChar && hasNumber;
};


  

// Añade CSS para cambiar la tipografía de la alerta
const style = document.createElement('style');
style.innerHTML = `
    .my-popup {
        font-family: Arial, sans-serif; // Cambiar tipografía a Arial
    }
`;
document.head.appendChild(style);


const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const loginModalRef = useRef(null); // Define el ref para el modal aquí


    return (
        <div>
                  <section>
        <div style={bannerStyles.container}>
            <img src={Imagen} alt="Beautiful destination" style={bannerStyles.image} />
            <div style={bannerStyles.overlay}>
                <h1 className="titulo" style={bannerStyles.title}>Parceritos Fieles</h1>
                <h2 className="Subtitulo" style={bannerStyles.subtitle}>Hotel, Guardería y Colegio Canino</h2>
                {/* botón de contacto... */}
            </div>

            {/* Logo y NavBar en contenedor conjunto */}
            <div style={bannerStyles.navContainer}>
                <img src={logo} alt="Logo Parceritos Fieles" style={bannerStyles.logo} />
                <nav style={bannerStyles.navLinks}>
                    <a href="#inicio" style={bannerStyles.navLink}>Inicio</a>
                    <a href="#servicios" style={bannerStyles.navLink}>Servicios</a>
                    <a href="#sede" style={bannerStyles.navLink}>Sede</a>
                    <a href="#" style={bannerStyles.navLink} onClick={handleAccountClick}>Cuenta</a>
                </nav>
            </div>
        </div>
    </section>

    <section style={{ textAlign: 'center', padding: '50px', backgroundColor: 'white' }}>
    <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', color: '#1C4D4F', marginBottom: '10px', fontSize: '30px' }}>
        Un lugar seguro para tu mascota
    </h1>
    <p style={{ fontFamily: 'Poppins, sans-serif', color: '#4A4A4A', fontSize: '18px', marginBottom: '40px' }}>
        En Parceritos Fieles, nuestra prioridad es que te sientas seguro y en paz, sabiendo que tu mascota recibe el mejor cuidado. Por eso, queremos compartir contigo lo que ofrecemos.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Supervisión */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={Icono1} style={{ width: '70px', color: '#082932', marginBottom: '10px' }}/>
            <h3 style={{ color: '#FF7629', fontFamily: 'Poppins, sans-serif', marginTop: '10px' }}>Supervisión</h3>
            <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>
                Ten la certeza de que tu compañero peludo estará en un entorno protegido, atendido por nuestro dedicado equipo.
            </p>
        </div>

        {/* Libre de jaulas */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <i className="fa-solid fa-paw" style={{ fontSize: '70px', color: '#082932', marginBottom: '10px' }}></i>
            <h3 style={{ color: '#FF7629', fontFamily: 'Poppins, sans-serif', marginTop: '10px' }}>Libre de jaulas</h3>
            <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>
                Nuestro deseo es que los perros sean felices y estén libres, por eso en Parceritos Fieles no usamos jaulas; ofrecemos un entorno seguro y abierto.
            </p>
        </div>

        {/* Zonas verdes */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={Icono2} style={{ width: '70px', color: '#082932', marginBottom: '10px' }}/>
            <h3 style={{ color: '#FF7629', fontFamily: 'Poppins, sans-serif', marginTop: '10px' }}>Zonas verdes</h3>
            <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>
                Disponemos de zonas verdes seguras, perfectas para que los perritos jueguen y disfruten de caminatas.
            </p>
        </div>

        {/* Reportes por Whatsapp */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <i className="fa-brands fa-whatsapp" style={{ fontSize: '70px', color: '#082932', marginBottom: '10px' }}></i>
            <h3 style={{ color: '#FF7629', fontFamily: 'Poppins, sans-serif', marginTop: '10px' }}>Reportes por Whatsapp</h3>
            <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>
                Nuestro equipo se mantendrá en contacto mediante grupo de Whatsapp durante la estadía, enviando reportes generales con fotos y videos de todos los peluditos disfrutando su día.
            </p>
        </div>

        {/* Vacunas y Desparasitación */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <i className="fa-solid fa-syringe" style={{ fontSize: '70px', color: '#082932', marginBottom: '10px' }}></i>
            <h3 style={{ color: '#FF7629', fontFamily: 'Poppins, sans-serif', marginTop: '10px' }}>Vacunas y Desparasitación</h3>
            <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>
                Todos nuestros peluditos deben estar vacunados y desparasitados. Al registrarse, es necesario presentar su carnet de vacunación, y si algún perrito no cumple con estos requisitos, podemos ofrecer el servicio correspondiente.
            </p>
        </div>

        {/* Reglas de Servicios */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <i className="fa-solid fa-clipboard-list" style={{ fontSize: '70px', color: '#082932', marginBottom: '10px' }}></i>
            <h3 style={{ color: '#FF7629', fontFamily: 'Poppins, sans-serif', marginTop: '10px' }}>Reglas de Servicios</h3>
            <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>
                Hotel: Puedes reservar para fines de semana o períodos de ocho días.
                Guardería o Pasadía: Servicio de recogida y entrega el mismo día.
                Colegio: Funciona de lunes a viernes, con actividades de socialización y aprendizaje.
            </p>
        </div>
    </div>
</section>


    <section id='servicios'>
    <div style={styles.serviciosSection}>
        <h2 style={styles.serviciosTitulo}>Nuestros servicios</h2>
        <div style={styles.serviciosContainer}>

            {/* Tarjeta 1: Hotel */}
            <div style={styles.servicioCard}>
                <img src={ImagenHotel} alt="Hotel" style={styles.servicioImagen} />
                <div style={styles.servicioInfo}>
                    <h3 style={styles.servicioTitulo}>Hotel</h3>
                    <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>¿Vas a viajar y te preocupa quién cuidará de tu mascota?</p>
                    <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>¡No te preocupes! En Parceritos Fieles tenemos un ambiente acogedor y seguro para que tu peludito se sienta como en casa durante su estadía</p>
                    <p><strong style={{color: '#ff7931'}}>Precio: $40,000 por día y noche</strong></p>
                </div>
            </div>

            {/* Tarjeta 2: Guardería */}
            <div style={styles.servicioCard}>
                <img src={ImagenGuarderia} alt="Guardería" style={styles.servicioImagen} />
                <div style={styles.servicioInfo}>
                    <h3 style={styles.servicioTitulo}>Guardería</h3>
                    <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>¿No vas a estar en casa y te inquieta dejar a tu mascota sola?</p>
                    <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>Relájate, tu peludito disfrutará de un día increíble con sus amigos en un entorno divertido y seguro, donde podrá jugar y socializar mientras tú no estás.</p>
                    <p><strong style={{color: '#ff7931'}}>Pasadía: $35,000 (hasta 2 días a la semana)</strong></p>
                    
                </div>
            </div>

            {/* Tarjeta 3: Colegio */}
            <div style={styles.servicioCard}>
                <img src={ImagenColegio} alt="Colegio" style={styles.servicioImagen} />
                <div style={styles.servicioInfo}>
                    <h3 style={styles.servicioTitulo}>Colegio</h3>
                    <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>¿Te gustaría que tu peludito aprenda nuevas habilidades y socialice?</p>
                    <p style={{ color: '#4A4A4A', fontFamily: 'Poppins, sans-serif' }}>¡En Parceritos Fieles ofrecemos clases para todas las edades! Además, organizamos actividades de socialización y juegos para que se diviertan al máximo.</p>
                    <p><strong style={{color: '#ff7931'}}>Mensualidad:</strong></p>
                    <ul>
                        <li style={{color: '#ff7931'}}>Raza grande: <strong>$350,000</strong></li> <li style={{color: '#ff7931'}}>Raza pequeña: <strong>$300,000</strong></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  
</section>
<section style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
<a
    href="https://wa.me/+573506842198" 
    target="_blank"
    rel="noopener noreferrer"
    style={{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1E9C8',
    borderRadius: '20px',
    padding: '10px 20px',
    textDecoration: 'none',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    marginTop: '20px',
    fontFamily: 'Poppins-ExtraLightItalic',
    letterSpacing: '2px'
}}
>
    <i className="fa-brands fa-whatsapp" style={{ fontSize: '30px', marginRight: '10px' }}></i>
        Contáctanos Para Mas Información
    </a>
    </section>

            {/* Carrusel estático */}
            <section className="about">
                <div className="slider-container">
                    <button className="slider-button left" onClick={goToPrevSlide}>
                        {'<'}
                    </button>
                    <div className="slider-wrapper" style={{ transform: getTransformValue() }}>
                        {images.map((image, index) => (
                            <div className="slider-item" key={index}>
                                <img src={image} alt={`Imagen ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <button className="slider-button right" onClick={goToNextSlide}>
                        {'>'}
                    </button>
                </div>
            </section>


            <section id='sede' style={{ padding: '80px 20px', backgroundColor: '#ffffff' }}>
    <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '40px',
        backgroundColor: '#fdf6e4', // Color igual al de las tarjetas de "Nuestros Servicios"
        borderRadius: '15px',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        position: 'relative',
    }}>
        <div style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90px', // Aumentar el tamaño del círculo
            height: '90px', // Aumentar el tamaño del círculo
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}>
            <img src={Icono4} style={{ width: '60px', height: '60px' }} alt="Icono de ubicación" /> {/* Aumentar el tamaño del icono */}
        </div>
        
        <h2 style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            color: '#1C4D4F',
            fontSize: '28px',
            marginTop: '60px', // Ajuste para mayor separación después del logo
            marginBottom: '10px'
        }}>Única Sede</h2>
        
        <p style={{
            fontFamily: 'Poppins, sans-serif',
            color: '#4A4A4A',
            fontSize: '18px',
            marginBottom: '30px'
        }}>
            Todos los servicios son a domicilio. Nos encargamos de recoger y llevar a tu amiguito de manera segura.
        </p>
        
        <div style={{
            borderRadius: '15px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            marginBottom: '30px'
        }}>
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3975.583721464432!2d-74.1476182250199!3d4.841309995134275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNMKwNTAnMjguNyJOIDc0wrAwOCc0Mi4yIlc!5e0!3m2!1ses!2sco!4v1727028484569!5m2!1ses!2sco"
                width="100%"
                height="400"
                style={{ border: '0' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
        
        <a
            href="https://www.google.com/maps/dir//4%C2%B050'28.7%22N+74%C2%B008'42.2%22W/@4.8413099,-74.1476182,17z/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'inline-block',
                padding: '15px 30px',
                backgroundColor: '#1C4D4F',
                color: 'white',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                fontWeight: 'bold',
                textDecoration: 'none',
                borderRadius: '30px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff7f50'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff7f50'}
        >
            Cómo llegar
        </a>
    </div>
</section>

            <Footer
            onLoginClick={() => setLoginModalVisible(true)} 
            onRegisterClick={() => setRegisterModalVisible(true)} 
            /> 


            {/* Botón para volver arriba */}
            <button 
                onClick={scrollToTop} 
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#ff7f50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    fontSize: '16px',
                }}
            >
                ▲
            </button>


           {/* Modal de inicio de sesión */}
           {loginModalVisible && (
        <div className="modal-overlay" onClick={() => setLoginModalVisible(false)}>
          <div
            className="modal-content login-modal"
            onClick={(e) => e.stopPropagation()} 
            ref={loginModalRef} // Uso del ref para el modal
          >
            <form id="loginForm" onSubmit={manejarInicioSesion}>
              <h1 className="form-title">Iniciar Sesión</h1>

              <div className="form-group">
                <label htmlFor="correo">Correo</label>
                <input
                  type="email"
                  id="correo"
                  placeholder="Tu correo"
                  value={correo}
                  onChange={(e) => validarCorreo(e.target.value)}
                  required
                />
                {alertaCorreo && (
                  <Alert severity="error" style={{ marginTop: '5px' }}>
                    El correo debe incluir "@" y terminar en ".com"
                  </Alert>
                )}
              </div>

              <div className="form-group">
              <label htmlFor="contraseña">Contraseña</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type={contraseñaVisible ? "text" : "password"}
                  id="contraseña"
                  placeholder="Tu contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required
                  style={{
                    paddingLeft: '10px', // Reduce el padding para el texto del placeholder
                    paddingRight: '40px', // Espacio para el icono a la derecha
                    width: '100%', // Mantener el ancho completo
                    marginTop: '10px'
                  }}
                />
                <button
                  type="button"
                  onClick={toggleContraseñaVisibility}
                  style={{
                    position: 'absolute',
                    right: '-75px', // Coloca el icono al borde derecho
                    top: '40%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'black', // Color del icono
                    fontSize: '18px',
                  }}
                >
                  <FontAwesomeIcon icon={contraseñaVisible ? faEye : faEyeSlash} />
                </button>
              </div>
              {alertaContraseña && (
                <Alert severity="error" style={{ marginTop: '5px' }}>
                  Contraseña incorrecta
                </Alert>
              )}
            </div>


              <button type="submit" className="button">Iniciar Sesión</button>

              {/* Sección añadida para recuperar contraseña y registrarse */}
              <div className="form-links">
                <Link to="/recuperarContraseña">¿Olvidaste tu Contraseña?</Link>
                <a style={{color: 'white', cursor: 'pointer',}} onClick={handleOpenRegisterModal}>¿No tienes cuenta? Regístrate!</a>
              </div>
            </form>
          </div>
        </div>
      )}

{accountModalVisible && (
  <div style={modalStyles.modalOverlay} onClick={() => setAccountModalVisible(false)}>
    <div style={modalStyles.modalContent} onClick={(e) => e.stopPropagation()}>
      <h2 style={modalStyles.modalTitle}>¿Tienes cuenta?</h2>
      <div style={modalStyles.modalButtons}>
        <button onClick={handleLoginClick} style={{ ...modalStyles.button, ...modalStyles.loginButton }}>
          Iniciar Sesión
        </button>
        <button onClick={handleOpenRegisterModal} style={{ ...modalStyles.button, ...modalStyles.registerButton }}>
          Registrarse
        </button>
      </div>
      <button onClick={() => setAccountModalVisible(false)} style={modalStyles.closeModal}>
        Cerrar
      </button>
    </div>
  </div>
)}



            {/* Modal de registro */}
            {registerModalVisible && (
  <div className="modal-overlay">
    <div className="modal-content register-modal">
      <form id="registerForm" onSubmit={handleRegisterSubmit}>
        <h1 className="form-title">Registrarse</h1>

        {/* Nombre */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Tu nombre"
            value={registerNombre}
            onChange={(e) => {
              setRegisterNombre(e.target.value);
              validarNombre(e.target.value);
            }}
            required
          />
          {alertaNombre && (
            <Alert severity="error" style={{ marginTop: '5px' }}>
              El nombre debe tener al menos 4 caracteres
            </Alert>
          )}
        </div>

        {/* Apellido */}
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            placeholder="Tu apellido"
            value={registerApellido}
            onChange={(e) => {
              setRegisterApellido(e.target.value);
              validarApellido(e.target.value);
            }}
            required
          />
          {alertaApellido && (
            <Alert severity="error" style={{ marginTop: '5px' }}>
              El apellido debe tener al menos 4 caracteres
            </Alert>
          )}
        </div>

        {/* Correo */}
        <div className="form-group">
          <label htmlFor="correo_registro">Correo</label>
          <input
            type="email"
            id="correo_registro"
            placeholder="Tu correo"
            value={registerCorreo}
            onChange={(e) => {
              setRegisterCorreo(e.target.value);
              validarCorreo(e.target.value);
            }}
            required
          />
          {alertaCorreo && (
            <Alert severity="error" style={{ marginTop: '5px' }}>
              El correo debe incluir "@" y terminar en ".com"
            </Alert>
          )}
        </div>

        {/* Celular */}
        <div className="form-group">
          <label htmlFor="celular">Celular</label>
          <input
            type="text"
            id="celular"
            placeholder="Tu celular"
            value={registerCelular}
            onChange={(e) => {
              setRegisterCelular(e.target.value);
              validarCelular(e.target.value);
            }}
            required
          />
          {alertaCelular && (
            <Alert severity="error" style={{ marginTop: '5px' }}>
              El celular debe contener solo números y tener entre 7 y 10 dígitos
            </Alert>
          )}
        </div>

        {/* Dirección */}
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            placeholder="Tu dirección"
            value={registerDireccion}
            onChange={(e) => {
              setRegisterDireccion(e.target.value);
              validarDireccion(e.target.value);
            }}
            required
          />
          {alertaDireccion && (
            <Alert severity="error" style={{ marginTop: '5px' }}>
              La dirección debe tener al menos 5 caracteres
            </Alert>
          )}
        </div>

        {/* Tipo de Documento */}
        <div className="form-group">
          <label htmlFor="tipo_documento">Tipo de Documento</label>
          <select
            id="tipo_documento"
            value={registerTipoDocumento}
            onChange={(e) => {
              setRegisterTipoDocumento(e.target.value);
              validarTipoDocumento(e.target.value);
            }}
            required
          >
            <option value="">Seleccione un tipo de documento</option>
            <option value="CC">C.C</option>
            <option value="PPT">PPT</option>
            <option value="CE">C.E</option>
          </select>
          {alertaTipoDocumento && (
            <Alert severity="error" style={{ marginTop: '5px' }}>
              Debe seleccionar un tipo de documento
            </Alert>
          )}
        </div>

        {/* Número de Documento */}
        <div className="form-group">
          <label htmlFor="numero_documento">Número de Documento</label>
          <input
            type="text"
            id="numero_documento"
            placeholder="Tu número de documento"
            value={registerNumeroDocumento}
            onChange={(e) => {
              setRegisterNumeroDocumento(e.target.value);
              validarDocumento(e.target.value);
            }}
            required
          />
          {alertaDocumento && (
            <Alert severity="error" style={{ marginTop: '5px' }}>
              El documento debe ser numérico y tener entre 8 y 10 caracteres
            </Alert>
          )}
        </div>

      {/* Contraseña */}
<div className="form-group">
  <label htmlFor="password">Contraseña</label>
  <div style={{ position: 'relative', width: '100%' }}>
    <input
      type={contraseñaVisible ? "text" : "password"}
      id="password"
      placeholder="Tu contraseña"
      value={registerContraseña}
      onChange={(e) => {
        setRegisterContraseña(e.target.value);
        validarContraseña(e.target.value);
      }}
      required
      style={{
        paddingLeft: '10px', // Placeholder pegado a la izquierda
        paddingRight: '40px', // Espacio para el icono a la derecha
        width: '100%',
        marginTop: '10px',
      }}
    />
    <button
      type="button"
      onClick={() => setContraseñaVisible(!contraseñaVisible)}
      style={{
        position: 'absolute',
        right: '-75px',
        top: '40%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'black',
        fontSize: '18px',
      }}
    >
      <FontAwesomeIcon icon={contraseñaVisible ? faEye : faEyeSlash} />
    </button>
  </div>
  {alertaContraseña && (
    <Alert severity="error" style={{ marginTop: '5px' }}>
      La contraseña debe contener al menos una mayúscula, un número y un signo especial
    </Alert>
  )}
</div>

{/* Confirmar Contraseña */}
<div className="form-group">
  <label htmlFor="confirm_password">Confirmar Contraseña</label>
  <div style={{ position: 'relative', width: '100%' }}>
    <input
      type={confirmarContraseñaVisible ? "text" : "password"}
      id="confirm_password"
      placeholder="Confirma tu contraseña"
      value={registerConfirmarContraseña}
      onChange={(e) => {
        setRegisterConfirmarContraseña(e.target.value);
        validarConfirmarContraseña(e.target.value);
      }}
      required
      style={{
        paddingLeft: '10px',
        paddingRight: '40px',
        width: '100%',
        marginTop: '10px',
      }}
    />
    <button
      type="button"
      onClick={() => setConfirmarContraseñaVisible(!confirmarContraseñaVisible)}
      style={{
        position: 'absolute',
        right: '-75px',
        top: '40%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'black',
        fontSize: '18px',
      }}
    >
      <FontAwesomeIcon icon={confirmarContraseñaVisible ? faEye : faEyeSlash} />
    </button>
  </div>
  {alertaConfirmarContraseña && (
    <Alert severity="error" style={{ marginTop: '5px' }}>
      Las contraseñas no coinciden
    </Alert>
  )}
</div>

<div className="button-group">
  <button type="submit" className="button">Registrarse</button>
  <button type="button" onClick={() => setRegisterModalVisible(false)} className="close-modal">Cerrar</button>
</div>
      </form>
    </div>
  </div>
)}
        </div>
    );
};




const styles = {
    
    serviciosSection: {
        backgroundColor: 'white',
        padding: '50px 20px',
        textAlign: 'center',
    },
    serviciosTitulo: {
        fontFamily: 'Poppins, sans-serif', 
        fontWeight: 'bold', 
        color: '#1C4D4F', 
        marginBottom: '10px',
        fontSize: '30px'
         
    },
    serviciosContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginTop: '35px'
    },
    servicioCard: {
        backgroundColor: '#fdf6e4',
        width: '30%',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        padding: '20px',
        boxSizing: 'border-box',
    },
    servicioImagen: {
        width: '80%',
        height: '250px',
        objectFit: 'cover',
        borderRadius: '10px 10px 0 0',
    },
    servicioInfo: {
        textAlign: 'left',
        padding: '10px 0',
    },
    servicioTitulo: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        color: '#333',
    },
    servicioBoton: {
        display: 'block',
        backgroundColor: '#ff7f50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        textAlign: 'center',
        marginTop: '10px',
        cursor: 'pointer',
    },
    servicioDuracion: {
        fontSize: '0.9rem',
        marginTop: '10px',
        color: '#888',
    },
    sedeSection: {
      backgroundColor: 'white',
      padding: '50px 20px',
      textAlign: 'center',
      marginTop: '-20px'
  },
  sedeTitulo: {
      fontFamily: 'Poppins, sans-serif', 
      fontWeight: 'bold', 
      color: '#1C4D4F', 
      marginBottom: '10px',
      marginTop: '-25px',
      fontSize: '30px'
  },
  sedeContainer: {
      display: 'flex',
      justifyContent: 'center', // Cambiado para acercar los elementos
      flexWrap: 'wrap',
      alignitems: 'stretch',
      flexdirection: 'unset',
  },
  imageContainer: {
      position: 'relative',
      width: '45%', // Mantén el ancho
      marginRight: '10px', // Ajustado para acercar más
  },
  sedeImagen: {
      width: '70%', // Cambiado a 100% para ocupar todo el contenedor
      height: '400px',
      borderRadius: '10px',
      objectFit: 'cover',
  },
  textOverlay: {
      position: 'absolute',
      top: '85%', // Ajusta según sea necesario
      left: '23%', // Ajusta según sea necesario
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: '#fff',
      padding: '10px',
      borderRadius: '8px',
      opacity: 0,
      animation: 'fadeIn 2s forwards',
      transition: 'opacity 0.5s ease-in-out',
      zIndex: 1,
  },
  overlayText: {
      margin: 0,
      fontSize: '1.2rem', // Ajusta el tamaño del texto
  },
  mapContainer: {
      width: '45%', // Mantén el ancho
      height: '400px', // Ajusta la altura del mapa
      borderRadius: '10px',
      overflow: 'hidden',
  },
  map: {
      width: '100%',
      height: '100%',
      border: 'none'
  },
  planesContainer: {
    backgroundColor: 'white',
    padding: '50px 20px',
    textAlign: 'start',
    marginLeft: '30px',
    marginTop: '-40px'
},
planesTitulo: {
    fontFamily: 'Poppins, sans-serif', 
    fontWeight: 'bold', 
    color: '#1C4D4F', 
    marginBottom: '10px',
    fontSize: '30px'
},
planesSeccion: {
    marginBottom: '20px',
},
planesSubtitulo: {
    fontFamily: 'Poppins, sans-serif', 
    fontWeight: 'bold', 
    color: '#1C4D4F', 
    fontSize: '22px',
    marginBottom: '10px',
},
lista: {
    paddingLeft: '20px',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#112D32',
},


};

const modalStyles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: '#ffffff',
      padding: '30px 40px',
      borderRadius: '12px',
      width: '350px',
      textAlign: 'center',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
      animation: 'fadeIn 0.3s ease',
    },
    modalTitle: {
      fontSize: '1.8rem',
      fontFamily: 'Poppins, sans-serif',
      color: '#333',
      marginBottom: '20px',
    },
    modalButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '15px',
      marginTop: '20px',
      marginBottom: '30px',
    },
    button: {
      padding: '12px 20px',
      fontSize: '1rem',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.2s ease',
      width: '100%',
      fontWeight: 'bold',
    },
    loginButton: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    registerButton: {
      backgroundColor: '#28a745',
      color: '#fff',
    },
    closeModal: {
      marginTop: '10px',
      padding: '10px 15px',
      backgroundColor: '#ff4d4d',
      color: '#fff',
      fontSize: '0.9rem',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    },
  };



export default Index2;
