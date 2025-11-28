import React, { useState } from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Register State
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Login State
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const SocialIcon = ({ Icon }) => (
    <button
      type="button"
      className="w-10 h-10 border border-zinc-200 rounded-full flex justify-center items-center mx-1 hover:bg-zinc-50 hover:text-brand transition-colors text-zinc-600"
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9._]{3,20}$/;
    if (!regex.test(username)) {
      toast.error(
        "Nome de usuário deve ter 3-20 caracteres (apenas letras, números, . e _)"
      );
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      toast.error("Senha deve ter no mínimo 8 caracteres");
      return false;
    }
    // Add more checks if needed as per reference, but basic length is crucial
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateUsername(registerData.username)) return;
    if (!validatePassword(registerData.password)) return;

    setLoading(true);
    try {
      await api.post("/users", {
        username: registerData.username,
        password: registerData.password,
      });

      toast.success("Cadastro realizado com sucesso! Faça login.");
      setIsSignUp(false); // Switch to login view
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginRes = await api.post("/users/login", {
        username: loginData.username,
        password: loginData.password,
      });

      localStorage.setItem("token", loginRes.data.token);

      // Update API header with new token
      api.defaults.headers.Authorization = `Bearer ${loginRes.data.token}`;

      const userRes = await api.get("/users/me");
      localStorage.setItem("user", JSON.stringify(userRes.data));

      toast.success("Login realizado com sucesso!");
      // Redirect to user notes page as per reference
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F6FA] font-sans py-12">
      <ToastContainer position="top-right" autoClose={5000} />
      {/* Container Principal */}
      <div className="relative overflow-hidden w-[768px] max-w-full min-h-[480px] bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]">
        {/* Sign Up Form Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 
            ${
              isSignUp
                ? "translate-x-full opacity-100 z-50 animate-show"
                : "opacity-0 z-10"
            }`}
        >
          <form
            onSubmit={handleRegister}
            className="bg-white flex flex-col items-center justify-center h-full px-12 text-center"
          >
            <h1 className="font-bold text-3xl m-0 text-zinc-800">
              Create Account
            </h1>
            <div className="my-5 flex">
              <SocialIcon Icon={FaFacebookF} />
              <SocialIcon Icon={FaGooglePlusG} />
              <SocialIcon Icon={FaLinkedinIn} />
            </div>
            <span className="text-xs text-zinc-500 mb-4">
              or use your email for registration
            </span>
            <input
              type="text"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
              className="bg-[#F5F6FA] border-none px-4 py-3 my-2 w-full outline-none rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              className="bg-[#F5F6FA] border-none px-4 py-3 my-2 w-full outline-none rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              className="bg-[#F5F6FA] border-none px-4 py-3 my-2 w-full outline-none rounded-lg"
              required
            />
            <button
              disabled={loading}
              className="mt-4 rounded-[20px] border border-brand bg-brand text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transition-transform active:scale-95 focus:outline-none hover:bg-brandDark hover:shadow-lg hover:shadow-brand/30 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Sign In Form Container */}
        <div
          className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-20 
            ${isSignUp ? "translate-x-full" : ""}`}
        >
          <form
            onSubmit={handleLogin}
            className="bg-white flex flex-col items-center justify-center h-full px-12 text-center"
          >
            <h1 className="font-bold text-3xl m-0 text-zinc-800">Sign in</h1>
            <div className="my-5 flex">
              <SocialIcon Icon={FaFacebookF} />
              <SocialIcon Icon={FaGooglePlusG} />
              <SocialIcon Icon={FaLinkedinIn} />
            </div>
            <span className="text-xs text-zinc-500 mb-4">
              or use your account
            </span>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
              className="bg-[#F5F6FA] border-none px-4 py-3 my-2 w-full outline-none rounded-lg"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              className="bg-[#F5F6FA] border-none px-4 py-3 my-2 w-full outline-none rounded-lg"
              required
            />
            <button
              type="button"
              className="text-zinc-600 text-sm no-underline my-4 hover:underline bg-transparent border-none cursor-pointer hover:text-brand"
            >
              Forgot your password?
            </button>
            <button
              disabled={loading}
              className="rounded-[20px] border border-brand bg-brand text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transition-transform active:scale-95 focus:outline-none hover:bg-brandDark hover:shadow-lg hover:shadow-brand/30 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>

        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-100 
            ${isSignUp ? "-translate-x-full" : ""}`}
        >
          <div
            className={`bg-gradient-to-r from-brand to-purple-400 bg-no-repeat bg-cover bg-left text-white relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out 
              ${isSignUp ? "translate-x-1/2" : "translate-x-0"}`}
          >
            {/* Painel Esquerdo (Visível no Sign Up) */}
            <div
              className={`absolute top-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center transform transition-transform duration-700 ease-in-out 
                ${isSignUp ? "translate-x-0" : "-translate-x-[20%]"}`}
            >
              <h1 className="font-bold text-3xl m-0 mb-4">Welcome Back!</h1>
              <p className="text-sm font-light leading-5 tracking-wide mb-8">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => setIsSignUp(false)}
                className="bg-transparent border border-white text-white rounded-[20px] text-xs font-bold py-3 px-11 uppercase tracking-wider transition-transform active:scale-95 focus:outline-none"
              >
                Sign In
              </button>
            </div>

            <div
              className={`absolute top-0 right-0 flex flex-col items-center justify-center h-full w-1/2 px-10 text-center transform transition-transform duration-700 ease-in-out 
                ${isSignUp ? "translate-x-[20%]" : "translate-x-0"}`}
            >
              <h1 className="font-bold text-3xl m-0 mb-4">Hello, Friend!</h1>
              <p className="text-sm font-light leading-5 tracking-wide mb-8">
                Enter your personal details and start journey with us
              </p>
              <button
                onClick={() => setIsSignUp(true)}
                className="bg-transparent border border-white text-white rounded-[20px] text-xs font-bold py-3 px-11 uppercase tracking-wider transition-transform active:scale-95 focus:outline-none"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
        body {
          font-family: "Montserrat", sans-serif;
        }
        @keyframes show {
          0%,
          49.99% {
            opacity: 0;
            z-index: 1;
          }
          50%,
          100% {
            opacity: 1;
            z-index: 5;
          }
        }
        .animate-show {
          animation: show 0.7s;
        }
      `}</style>
    </div>
  );
};

export default AuthForm;
