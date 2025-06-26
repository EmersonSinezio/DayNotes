import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/auth/auth.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateUsername = (username) => {
    // Validação: 3-20 caracteres, apenas letras, números, . e _
    const regex = /^[a-zA-Z0-9._]{3,20}$/;

    if (!regex.test(username)) {
      setUsernameError(
        "Nome de usuário deve ter 3-20 caracteres (apenas letras, números, . e _)"
      );
      return false;
    }

    setUsernameError("");
    return true;
  };

  const validatePassword = (password) => {
    let strength = 0;
    const errors = [];

    // Verificar comprimento
    if (password.length < 8) {
      errors.push("Mínimo 8 caracteres");
    } else {
      strength += 25;
    }

    // Verificar letra maiúscula
    if (!/[A-Z]/.test(password)) {
      errors.push("Pelo menos uma letra maiúscula");
    } else {
      strength += 25;
    }

    // Verificar número
    if (!/[0-9]/.test(password)) {
      errors.push("Pelo menos um número");
    } else {
      strength += 25;
    }

    // Verificar caractere especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Pelo menos um caractere especial (!@#$%^&*)");
    } else {
      strength += 25;
    }

    setPasswordStrength(strength);

    if (errors.length > 0) {
      setPasswordError(errors.join(", "));
      return false;
    }

    setPasswordError("");
    return true;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "#ff0000";
    if (passwordStrength < 50) return "#ff5e00";
    if (passwordStrength < 75) return "#ffa500";
    return "#2ecc71";
  };

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
      // Validações básicas
      if (!formData.terms) {
        throw new Error("Você deve aceitar os termos e condições");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("As senhas não coincidem");
      }

      // Validações avançadas
      const isUsernameValid = validateUsername(formData.username);
      const isPasswordValid = validatePassword(formData.password);

      if (!isUsernameValid || !isPasswordValid) {
        throw new Error("Corrija os erros no formulário");
      }

      // Chamada à API
      await api.post("/users", {
        username: formData.username,
        password: formData.password,
      });

      toast.success("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 2000);
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
              minLength="3"
              maxLength="20"
              disabled={loading}
              onChange={(e) => validateUsername(e.target.value)}
            />
          </div>
          {usernameError && (
            <div className="error-message">
              <small>{usernameError}</small>
            </div>
          )}

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
              minLength="8"
              disabled={loading}
              onChange={(e) => validatePassword(e.target.value)}
            />
          </div>

          <div className="password-strength-meter">
            <div
              className="strength-bar"
              style={{
                width: `${passwordStrength}%`,
                backgroundColor: getPasswordStrengthColor(),
              }}
            ></div>
          </div>

          {passwordError && (
            <div className="error-message">
              <small>{passwordError}</small>
            </div>
          )}

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
