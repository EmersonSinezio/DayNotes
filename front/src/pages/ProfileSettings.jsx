import React, { useState } from "react";
import {
  FaUser,
  FaPen,
  FaWhatsapp,
  FaChevronDown,
  FaEnvelope,
  FaBriefcase,
  FaCamera,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
// Importando o Navbar para consistência
import UserNavbar from "../components/UserNavbar";
import UserAvatar from "../components/UserAvatar";

const ProfileSettings = () => {
  const { user } = useAuth();
  const [formData] = useState({
    fullName: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "Developer", // Exemplo default
  });

  // Estilos de animação
  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    @keyframes shimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-shimmer { background-size: 200% 200%; animation: shimmer 6s ease infinite; }
  `;

  return (
    <div className="min-h-screen bg-[#F3F6FD] font-sans text-slate-700 relative overflow-hidden flex flex-col">
      <style>{animationStyles}</style>

      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="flex-1 flex flex-col p-4 md:p-8 gap-8 z-10 overflow-y-auto custom-scrollbar">
        {/* Navbar for navigation */}
        <UserNavbar
          title="Perfil"
          secondaryTitle="Configurações"
          onNewTask={() => {}} // No action
        />

        <div className="w-full max-w-4xl mx-auto space-y-8 pb-10">
          {/* --- SECTION 1: PROFILE HEADER --- */}
          <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-sm border border-white/60 overflow-hidden animate-fade-in-up group">
            {/* Animated Gradient Banner */}
            <div className="h-40 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 relative animate-shimmer">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              <button className="absolute top-6 right-6 bg-white/30 backdrop-blur-md p-2.5 rounded-full text-white hover:bg-white hover:text-purple-600 transition-all shadow-sm border border-white/40">
                <FaPen size={14} />
              </button>
            </div>

            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 mb-6 gap-6">
                {/* Profile Photo with Camera Button */}
                <div className="relative group/avatar">
                  <div className="w-32 h-32 rounded-full border-[6px] border-white shadow-lg overflow-hidden relative bg-slate-200">
                    <UserAvatar
                      name={formData.fullName || "Usuário"}
                      className="w-full h-full text-4xl group-hover/avatar:scale-110 transition-transform duration-500"
                    />
                    {/* Edit Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer">
                      <FaCamera className="text-white text-2xl" />
                    </div>
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                </div>

                <div className="flex-1 mb-2">
                  <h2 className="text-3xl font-bold text-slate-800">
                    {formData.fullName || "Nome do Usuário"}
                  </h2>
                  <p className="text-slate-500 font-medium">{formData.role}</p>
                </div>

                <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition shadow-sm">
                    Remover Foto
                  </button>
                  <button className="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-sm font-bold text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all">
                    Carregar Nova
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECTION 2: FORM (DISABLED) --- */}
          <div
            className="bg-gray-100/50 backdrop-blur-sm rounded-[2.5rem] border border-gray-200 p-8 md:p-10 animate-fade-in-up opacity-75 pointer-events-none select-none grayscale-[0.5]"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-600">
                  Informações Pessoais
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Gerencie seus detalhes pessoais e informações de contato.
                </p>
              </div>
              <button className="text-sm font-bold text-slate-400 flex items-center gap-2 cursor-not-allowed">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>{" "}
                Indisponível
              </button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Full Name */}
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    disabled
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-200/50 border border-transparent rounded-2xl text-slate-500 font-semibold placeholder-slate-400 cursor-not-allowed"
                    placeholder="Digite seu nome"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                  Endereço de Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-200/50 border border-transparent rounded-2xl text-slate-500 font-semibold placeholder-slate-400 cursor-not-allowed"
                    placeholder="nome@exemplo.com"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="group md:col-span-1">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                  Número de Celular
                </label>
                <div className="flex relative items-center rounded-2xl bg-slate-200/50 border border-transparent cursor-not-allowed">
                  {/* Prefix / Icon */}
                  <div className="flex items-center gap-2 pl-4 pr-3 py-3.5 border-r border-slate-300/50">
                    <div className="bg-slate-400 rounded-full p-1.5 text-white">
                      <FaWhatsapp size={10} />
                    </div>
                    <span className="text-sm font-bold text-slate-500">
                      +55
                    </span>
                    <FaChevronDown className="text-slate-400 text-[10px]" />
                  </div>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    disabled
                    className="flex-1 px-4 py-3.5 bg-transparent border-none focus:outline-none text-slate-500 font-semibold placeholder-slate-400 w-full cursor-not-allowed"
                    placeholder="11 91234 5678"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                  Cargo / Título
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaBriefcase className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    disabled
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-200/50 border border-transparent rounded-2xl text-slate-500 font-semibold placeholder-slate-400 cursor-not-allowed"
                    placeholder="ex: Desenvolvedor"
                  />
                </div>
              </div>

              {/* Save Button (Disabled) */}
              <div className="md:col-span-2 flex justify-end mt-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  disabled
                  className="px-8 py-3 bg-slate-300 text-slate-500 font-bold rounded-xl shadow-none cursor-not-allowed w-full md:w-auto"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
