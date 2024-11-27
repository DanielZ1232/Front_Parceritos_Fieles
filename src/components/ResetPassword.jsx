import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./footer";

// Función para validar la contraseña
const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return hasUpperCase && hasSpecialChar && hasNumber;
};

const ResetPassword = () => {
  const { token } = useParams(); // Usar un token para la validación del enlace
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setMessage(
        "La contraseña debe tener al menos una letra mayúscula, un carácter especial y un número."
      );
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/restablecer-contrasena", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, nuevaContrasena: password }), // Cambiado a "nuevaContrasena"
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Contraseña actualizada exitosamente.");
      } else {
        setMessage(result.error || "Error al actualizar la contraseña.");
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
            Restablecer Contraseña
          </h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            <label htmlFor="password" className="block text-sm text-gray-800">
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring"
              placeholder="Ingresa tu nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label
              htmlFor="confirmPassword"
              className="block mt-4 text-sm text-gray-800"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 font-bold text-white bg-green-500 rounded-md hover:bg-green-700"
            >
              Restablecer Contraseña
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
