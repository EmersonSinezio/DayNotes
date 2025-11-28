import React from "react";
import {
  FaBolt,
  FaPlayCircle,
  FaStickyNote,
  FaFolder,
  FaMobileAlt,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-[#F5F6FA] text-zinc-800 overflow-x-hidden min-h-screen font-sans selection:bg-brand selection:text-white">
      {/* Hero Section */}
      <main className="pt-32 pb-20 relative glow-bg">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm mb-8 animate-fade-up opacity-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">
              Novidade: Notas inteligentes disponível
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 leading-tight mb-6 animate-fade-up delay-100 opacity-0 tracking-tight">
            Organize suas ideias <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-purple-400">
              sem complicação.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto mb-10 animate-fade-up delay-200 opacity-0 leading-relaxed">
            DayNotes é a plataforma de anotações que une simplicidade e poder.
            Capture suas ideias de forma rápida e organize-as visualmente.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20 animate-fade-up delay-300 opacity-0">
            <a
              href="/auth"
              className="w-full md:w-auto px-8 py-4 bg-brand hover:bg-brandDark text-white font-bold rounded-2xl shadow-xl shadow-brand/30 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <FaBolt size={24} />
              Acessar DayNotes
            </a>
            <button className="w-full md:w-auto px-8 py-4 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group">
              <FaPlayCircle
                size={24}
                className="text-zinc-400 group-hover:text-brand transition-colors"
              />
              Ver Demonstração
            </button>
          </div>

          {/* Image Mockup */}
          <div className="relative max-w-6xl mx-auto animate-fade-up delay-300 opacity-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand to-purple-400 rounded-3xl blur opacity-20"></div>

            <div className="relative bg-white rounded-2xl border border-zinc-200 shadow-2xl overflow-hidden p-2 md:p-4">
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="ml-4 w-full max-w-sm h-6 bg-zinc-100 rounded-md"></div>
              </div>

              <img
                src="https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Dashboard DayNotes"
                className="w-full rounded-lg shadow-inner border border-zinc-100"
              />

              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-b from-white/20 to-transparent transform rotate-45 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-10 border-t border-zinc-200/60 animate-fade-up delay-300 opacity-0">
            <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">
              Usado por pessoas produtivas
            </p>
            {/* Você pode adicionar logos aqui se desejar */}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="p-6 bg-[#F5F6FA] rounded-3xl hover:bg-indigo-50 transition-colors duration-300 group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand text-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <FaStickyNote size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-800">
              Notas Rápidas
            </h3>
            <p className="text-zinc-500 leading-relaxed">
              Capture ideias instantaneamente. Crie notas com formatação rica e
              organize-as com tags e categorias.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-[#F5F6FA] rounded-3xl hover:bg-orange-50 transition-colors duration-300 group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-500 text-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <FaFolder size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-800">
              Organização Visual
            </h3>
            <p className="text-zinc-500 leading-relaxed">
              Agrupe suas notas em cadernos e pastas. Encontre rapidamente o que
              precisa com busca inteligente.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-[#F5F6FA] rounded-3xl hover:bg-purple-50 transition-colors duration-300 group">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-purple-500 text-2xl shadow-sm mb-6 group-hover:scale-110 transition-transform">
              <FaMobileAlt size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-zinc-800">
              Sincronização
            </h3>
            <p className="text-zinc-500 leading-relaxed">
              Acesse suas notas em qualquer dispositivo. Todas as suas ideias
              sincronizadas em tempo real.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
