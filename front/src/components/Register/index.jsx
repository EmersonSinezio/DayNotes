import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    const formData = {
      username: e.target.username.value.trim(),
      password: e.target.password.value.trim(),
      confirmPassword: e.target.confirmPassword.value.trim(),
    };

    try {
      // Validações do cliente
      if (formData.password !== formData.confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      if (formData.password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres");
      }

      const response = await api.post("/users", {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 201) {
        setSuccessMessage("Cadastro realizado com sucesso! Redirecionando...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError(
        error.response?.data?.message || error.message || "Erro no cadastro"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="login-header">
          <FaRegUserCircle size={50} className="icon" />
          <h1>Registro</h1>
        </div>

        {error && <div className="error-message">{error}</div>}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="username">Nome de usuário</label>
            <input type="text" id="username" required disabled={loading} />
          </div>

          <div className="input-block">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              required
              minLength="6"
              disabled={loading}
            />
          </div>

          <div className="input-block">
            <label htmlFor="confirmPassword">Confirme a senha</label>
            <input
              type="password"
              id="confirmPassword"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={loading ? "loading" : ""}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>

        <p className="auth-link">
          Já possui uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
