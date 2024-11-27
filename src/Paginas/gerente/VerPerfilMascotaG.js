import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/navBarGerente';
import Footer from '../../components/footer';
import Imagen from '../../assets/Imagenes/perro2perfil.jpeg';

const VerPerfilMascotaG = () => {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const [dueno, setDueno] = useState(null);

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:5000/api/empleados/mascotas/perfil/${id}`);
        setMascota(respuesta.data.mascota);
        setDueno(respuesta.data.dueno);
      } catch (error) {
        console.error('Error al obtener los detalles:', error);
      }
    };

    fetchMascota();
  }, [id]);

  if (!mascota || !dueno) {
    return <div style={styles.loading}>Cargando...</div>;
  }

  return (
    <div style={styles.body}>
      <NavBar />
      <div style={styles.container}>
        {/* Cabecera */}
        <div style={styles.header}>
          <i className="fa-solid fa-dog" style={styles.iconDog}></i>
          <h1 style={styles.title}>Perfil de la Mascota</h1>
        </div>

        {/* Contenido */}
        <div style={styles.content}>
          {/* Tarjeta de Mascota */}
          <div style={styles.card}>
            <h2 style={styles.subtitle}>Detalles de la Mascota</h2>
            <div style={styles.infoItem}>
              <i className="fa-solid fa-paw" style={styles.icon}></i>
              <div style={styles.infoText}>
                <span style={styles.infoLabel}>Nombre:</span>
                <span>{mascota.nombre}</span>
              </div>
            </div>
            <div style={styles.infoItem}>
              <i className="fa-solid fa-paw" style={styles.icon}></i>
              <div style={styles.infoText}>
                <span style={styles.infoLabel}>Edad:</span>
                <span>{mascota.edad} años</span>
              </div>
            </div>
            <div style={styles.infoItem}>
              <i className="fa-solid fa-paw" style={styles.icon}></i>
              <div style={styles.infoText}>
                <span style={styles.infoLabel}>Peso:</span>
                <span>{mascota.peso} Kg</span>
              </div>
            </div>
            <div style={styles.infoItem}>
              <i className="fa-solid fa-paw" style={styles.icon}></i>
              <div style={styles.infoText}>
                <span style={styles.infoLabel}>Raza:</span>
                <span>{mascota.raza}</span>
              </div>
            </div>
            <div style={styles.infoRow}>
              <div style={styles.infoItem}>
                <i className="fa-solid fa-paw" style={styles.icon}></i>
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>Esterilizado:</span>
                  <span>{mascota.esterilizado ? 'Sí' : 'No'}</span>
                </div>
              </div>
              <div style={styles.infoItem}>
                <i className="fa-solid fa-paw" style={styles.icon}></i>
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>Enfermedades:</span>
                  <span>{mascota.enfermedades || 'Ninguna'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta del Dueño */}
          <div style={styles.card}>
            <h2 style={styles.subtitle}>Detalles del Dueño</h2>
            <div style={styles.infoItem}>
              <i className="fa-solid fa-user" style={styles.icon}></i>
              <div style={styles.infoText}>
                <span style={styles.infoLabel}>Nombre:</span>
                <span>{dueno.nombre}</span>
              </div>
            </div>
            <div style={styles.infoItem}>
              <i className="fa-solid fa-envelope" style={styles.icon}></i>
              <div style={styles.infoText}>
                <span style={styles.infoLabel}>Correo:</span>
                <span>{dueno.correo}</span>
              </div>
            </div>
            <div style={styles.infoItem}>
              <i className="fa-solid fa-phone" style={styles.icon}></i>
              <div style={styles.infoText}>
                <span style={styles.infoLabel}>Celular:</span>
                <span>{dueno.celular}</span>
              </div>
            </div>
            <div style={styles.infoItem}>
              <i className="fa-solid fa-map-marker-alt" style={styles.icon}></i>
              <div style={styles.infoText}>
                <span style={styles.infoLabel}>Dirección:</span>
                <span>{dueno.direccion}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  body: {
    margin: 0,
    fontFamily: 'sans-serif',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '70%',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  iconDog: {
    fontSize: '80px',
    color: '#28a745',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginTop: '10px',
    color: '#333',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  card: {
    flex: 1,
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fdfdfd',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    textAlign: 'left',
    color: '#333',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #e9ecef',
  },
  infoRow: {
    display: 'flex',
    gap: '20px',
    marginTop: '10px',
  },
  icon: {
    fontSize: '24px',
    marginRight: '10px',
    color: '#28a745',
  },
  infoText: {
    textAlign: 'left',
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: '5px',
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '20px',
    color: '#333',
  },
};


export default VerPerfilMascotaG;
