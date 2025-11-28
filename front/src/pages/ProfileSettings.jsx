import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPen,
  FaWhatsapp, // Usando como ícone de telefone verde
  FaChevronDown,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"; // Ícone parecido com o do email da imagem

const ProfileSettings = () => {
  // Estado para os campos do formulário
  const [formData, setFormData] = useState({
    fullName: "Ayman Shaltoni",
    email: "aymanshaltoni@gmail.com",
    phone: "5502938123",
    role: "Senior Product designer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-800 flex justify-center items-start">
      <div className="w-full max-w-2xl space-y-6">
        {/* --- SEÇÃO 1: CARTÃO DE FOTO --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Banner Gradiente */}
          <div className="h-32 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 relative">
            <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-sm hover:bg-white transition text-slate-600">
              <FaPen size={12} />
            </button>
          </div>

          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-4 gap-4">
              {/* Foto de Perfil */}
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/300?img=11" // Imagem placeholder
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
                />
              </div>
            </div>

            <div className="mt-2">
              <h2 className="text-xl font-bold text-slate-800">Your Photo</h2>
              <p className="text-sm text-slate-500 mb-6">
                This will be displayed on your profile
              </p>

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition shadow-sm">
                  Upload New
                </button>
                <button className="px-6 py-2 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm shadow-blue-200">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- SEÇÃO 2: INFORMAÇÕES PESSOAIS --- */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            Personal information
          </h2>

          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-slate-800 text-lg" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLogOut className="text-slate-800 text-lg rotate-180" />{" "}
                  {/* Simulando o ícone da imagem */}
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium transition-all"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mobile number
              </label>
              <div className="flex relative items-center border border-slate-200 rounded-xl bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all overflow-hidden">
                {/* Prefixo / Ícone */}
                <div className="flex items-center gap-2 pl-3 pr-2 py-3 border-r border-slate-100 bg-white">
                  <div className="bg-green-500 rounded-full p-1 text-white">
                    <FaWhatsapp size={10} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">
                    +966
                  </span>
                  <FaChevronDown className="text-slate-400 text-xs cursor-pointer hover:text-slate-600" />
                </div>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 bg-white border-none focus:outline-none text-slate-700 font-medium"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Role
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium transition-all"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
