import React, { useState } from "react";
import Footer from "./footer";
import { useNavigate } from "react-router-dom"; 

const ForgotPassword = () => {
  const [emailCliente, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/recuperar-contrasena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailCliente }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Correo de recuperación enviado exitosamente.");
      } else {
        setMessage(result.error || "Error al enviar el correo.");
      }
    } catch (error) {
      setMessage("Error al procesar la solicitud.");
    }
  };

  return (
    <div>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Recuperar Contraseña
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm text-gray-800">
            Correo Electrónico
          </label>
          <input
            type="emailCliente"
            id="emailCliente"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring"
            placeholder="Ingresa tu correo"
            value={emailCliente}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-md hover:bg-green-700"
          >
            Enviar Correo
          </button>
        </form>
        {message && (
            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          )}
          <button
            onClick={() => navigate(-1)} // Redirige a la página anterior
            className="w-full px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-md hover:bg-green-700"
          >
            Regresar
          </button>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
