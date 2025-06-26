import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/auth/auth.css";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      username: e.target.username.value.trim(),
      password: e.target.password.value.trim(),
      confirmPassword: e.target.confirmPassword.value.trim(),
      terms: e.target.terms.checked,
    };

    try {
      // Validações
      if (!formData.terms) {
        throw new Error("Você deve aceitar os termos e condições");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      if (formData.password.length < 6) {
        throw new Error("A senha deve ter pelo menos 6 caracteres");
      }

      // Chamada à API
      await api.post("/users", {
        username: formData.username,
        password: formData.password,
      });

      toast.success("Cadastro realizado com sucesso! Redirecionando...");
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">Notes</div>
          <h1>Criar uma conta</h1>
          <p>Preencha os campos para se registrar</p>
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
              minLength="6"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              required
              disabled={loading}
            />
          </div>

          <div className="terms-container">
            <label className="terms-label">
              <input
                type="checkbox"
                name="terms"
                className="terms-checkbox"
                disabled={loading}
              />
              <span>
                Eu aceito os{" "}
                <a href="#" className="terms-link">
                  Termos e Condições
                </a>
              </span>
            </label>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Registrar"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Já tem uma conta?{" "}
            <Link to="/login" className="auth-link">
              Entrar
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Register;
