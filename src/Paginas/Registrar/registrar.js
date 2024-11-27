import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../../assets/Imagenes/logo.png';
import NavBar from '../../components/navIndex';
import Footer from '../../components/footer';

function Registrar() {
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Celular, setCelular] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [TipoDocumento, setTipoDocumento] = useState('');
  const [NumeroDocumento, setNumeroDocumento] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [ConfirmarContraseña, setConfirmarContraseña] = useState('');
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
  
    if (Contraseña !== ConfirmarContraseña) {
      alert('Las contraseñas no coinciden');
      return;
    }
  
    try {
      // Crea el nuevo usuario
      const nuevoUsuario = {
        Nombre: Nombre,
        Apellido: Apellido,
        Correo: Correo,
        Celular: Celular,
        Direccion: Direccion,
        TipoDocumento: TipoDocumento,
        NumeroDocumento: NumeroDocumento,
        Contraseña: Contraseña,
        Rol: 'Cliente',
      };
  
      // Enviar el usuario al backend
      await axios.post('http://localhost:5000/api/users', nuevoUsuario);
      
      alert('Usuario registrado con éxito');
      navigate('/registrar'); 
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Ya existe un usuario con este correo');
      } else {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario');
      }
    }
  };
  const containerStyle = {
    width: '500px',
    margin: '50px auto',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const logoStyle = {
    marginBottom: '20px',
  };

  const imgStyle = {
    width: '100px',
    borderRadius: '15px',
  };

  const formRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  };

  const formGroupStyle = {
    marginBottom: '20px',
    width: '48%', // Ajusta este valor para el espaciado entre campos
  };

  const formGroupCelular = {
    marginBottom: '20px',
    width: '48%',
    marginTop: '4px' // Ajusta este valor para el espaciado entre campos
  };

  const fullWidthStyle = {
    width: '100%',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    backgroundColor: 'green',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div>
      <NavBar />
      <div style={containerStyle}>
        <div style={logoStyle}>
          <img src={Logo} alt="Logo" style={imgStyle} />
        </div>
        <h2>Regístrate</h2>
        <form onSubmit={manejarRegistro}>
          <div style={formRowStyle}>
            <div style={formGroupStyle}>
              <label htmlFor="nombre">Nombre:</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                placeholder="Ingrese su nombre" 
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
                required 
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="apellido">Apellido:</label>
              <input 
                type="text" 
                id="apellido" 
                name="apellido" 
                placeholder="Ingrese su apellido" 
                value={Apellido}
                onChange={(e) => setApellido(e.target.value)}
                required 
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="correo">Correo:</label>
              <input 
                type="email" 
                id="correo" 
                name="correo" 
                placeholder="Ingrese su correo electrónico" 
                value={Correo}
                onChange={(e) => setCorreo(e.target.value)}
                required 
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="contraseña">Contraseña:</label>
              <input 
                type="password" 
                id="contraseña" 
                name="contraseña" 
                placeholder="Ingrese su contraseña" 
                value={Contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required 
                style={inputStyle}
              />
            </div>
            <div style={formGroupStyle}>
              <label htmlFor="confirmar-contraseña">Confirma tu Contraseña:</label>
              <input 
                type="password" 
                id="confirmar-contraseña" 
                name="confirmar-contraseña" 
                placeholder="Confirma tu contraseña" 
                value={ConfirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                required 
                style={inputStyle}
              />
            </div>
            <div style={formGroupCelular}>
              <label htmlFor="celular">Celular:</label>
              <input 
                type="text" 
                id="celular" 
                name="celular" 
                placeholder="Ingrese su número de celular" 
                value={Celular}
                onChange={(e) => setCelular(e.target.value)}
                required 
                style={inputStyle}
              />
            </div>
            <div style={{...formGroupStyle, ...fullWidthStyle}}>
              <label htmlFor="direccion">Dirección:</label>
              <input 
                type="text" 
                id="direccion" 
                name="direccion" 
                placeholder="Ingrese su dirección" 
                value={Direccion}
                onChange={(e) => setDireccion(e.target.value)}
                required 
                style={inputStyle}
              />
            </div>
            <div style={{ ...formGroupStyle, ...fullWidthStyle }}>
              <label htmlFor="tipo_documento">Tipo de Documento:</label>
              <select 
                id="tipo_documento" 
                name="tipo_documento" 
                value={TipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                required
                style={inputStyle}
              >
                <option value="">Seleccione un tipo de documento</option>
                <option value="CC">C.C</option>
                <option value="PPT">PPT</option>
                <option value="CE">C.E</option>
              </select>
            </div>
            <div style={{ ...formGroupStyle, ...fullWidthStyle }}>
              <label htmlFor="numero_documento">Número de Documento:</label>
              <input 
                type="text" 
                id="numero_documento" 
                name="numero_documento" 
                placeholder="Ingrese su número de documento" 
                value={NumeroDocumento}
                onChange={(e) => setNumeroDocumento(e.target.value)}
                required 
                style={inputStyle}
              />
            </div>
          </div>
          <button 
            type="submit"
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'darkgreen'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'green'}
          >
            Registrarme
          </button>
          <br></br> <Link to="/login" >¿Tiene una cuenta? Inicie Sesión</Link>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Registrar;
