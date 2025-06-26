import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import "../../styles/auth/auth.css";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        username: e.target.username.value,
        password: e.target.password.value,
      };

      const loginRes = await api.post("/users/login", formData);
      localStorage.setItem("token", loginRes.data.token);

      // Buscar dados do usuário
      const userRes = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${loginRes.data.token}` },
      });

      localStorage.setItem("user", JSON.stringify(userRes.data));

      toast.success("Login realizado com sucesso!");
      window.location.href = `/user/${userRes.data.userid}/notes`;
    } catch (err) {
      console.error("Login error:", err);

      let errorMessage = "Erro ao fazer login";
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Credenciais inválidas";
        } else {
          errorMessage =
            err.response.data?.message || `Erro ${err.response.status}`;
        }
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">Notes</div>
          <h1>Bem-vindo de volta</h1>
          <p>Por favor, entre na sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Nome de usuário"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
              disabled={loading}
            />
          </div>

          <div className="auth-options">
            <label className="remember-me">
              <input type="checkbox" name="remember-me" disabled={loading} />
              <span>Lembrar de mim</span>
            </label>

            <Link to="/recover-account" className="forgot-password">
              Esqueceu a senha?
            </Link>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Entrar"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Não tem uma conta?{" "}
            <Link to="/register" className="auth-link">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Login;
