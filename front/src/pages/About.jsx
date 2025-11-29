import React from "react";
import {
  FaReact,
  FaNodeJs,
  FaCode,
  FaRocket,
  FaLayerGroup,
} from "react-icons/fa";
import { SiTailwindcss, SiMongodb } from "react-icons/si";
import UserNavbar from "../components/UserNavbar";

const About = () => {
  return (
    <div className="min-h-screen bg-[#F3F6FD] font-sans flex text-slate-700 relative overflow-hidden">
      {/* Estilos de Animação Injetados */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      {/* Decorative Blobs (Fundo) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float delay-300" />

      <div className="flex-1 flex flex-col p-4 md:p-8 gap-8 h-screen overflow-hidden z-10">
        {/* Header */}
        <UserNavbar
          title="Sobre"
          secondaryTitle="Informações do Projeto"
          onNewTask={() => {}}
        />

        <div className="flex-1 overflow-y-auto custom-scrollbar pb-12">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Intro Section - Hero */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white animate-fade-in-up">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                    Versão 2.0
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
                    DayNotes{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                      Reimaginado
                    </span>
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-8 font-light">
                    Bem-vindo à evolução. Esta não é apenas uma atualização; é
                    uma revisão arquitetônica completa. Pegamos a alma do
                    projeto legado e demos a ele um novo corpo usando as
                    tecnologias web mais avançadas disponíveis hoje.
                  </p>

                  <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute w-1 h-full left-0 top-0 bg-blue-500" />
                    <FaRocket className="text-2xl text-blue-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="font-medium text-slate-700 italic">
                        "Refatorar não é apenas limpar o código; é sobre
                        entender melhor o problema e resolvê-lo de forma mais
                        eficiente."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual Element for Hero */}
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative w-48 h-48 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-[2rem] rotate-3 shadow-2xl flex items-center justify-center animate-float">
                    <FaCode className="text-6xl text-white opacity-90" />
                    <div className="absolute -z-10 w-full h-full bg-blue-500/30 blur-2xl top-4 left-4 rounded-[2rem]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Tech Stack Section (Grid Layout) */}
              <div className="lg:col-span-7 space-y-6 animate-fade-in-up delay-100">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2 px-2">
                  <FaLayerGroup className="text-blue-500" /> Stack Poderosa
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* React Card */}
                  <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                      <FaReact className="text-3xl text-blue-500 group-hover:text-white transition-colors duration-300 animate-spin-slow" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-800">
                      React.js
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      UI baseada em componentes com Hooks & Context API para
                      gerenciamento de estado perfeito.
                    </p>
                  </div>

                  {/* Tailwind Card */}
                  <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors duration-300">
                      <SiTailwindcss className="text-3xl text-cyan-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-800">
                      Tailwind CSS
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      Motor utility-first garantindo um sistema de design
                      bonito, responsivo e consistente.
                    </p>
                  </div>

                  {/* Node Card */}
                  <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors duration-300">
                      <FaNodeJs className="text-3xl text-green-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-800">
                      Node.js
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      Runtime de alta performance construído no motor V8 do
                      Chrome para a API backend.
                    </p>
                  </div>

                  {/* Mongo Card */}
                  <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors duration-300">
                      <SiMongodb className="text-3xl text-green-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h4 className="font-bold text-lg text-slate-800">
                      MongoDB
                    </h4>
                    <p className="text-sm text-slate-500 mt-1">
                      Esquema NoSQL flexível permitindo evolução de dados
                      escalável e rápida.
                    </p>
                  </div>
                </div>
              </div>

              {/* Evolution/Why Section */}
              <div className="lg:col-span-5 bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-sm animate-fade-in-up delay-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                  Por que a Mudança?
                </h3>

                <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before: md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                  {/* Item 1 */}
                  <div className="relative flex items-start group">
                    <div className="absolute left-0 mt-1 ml-2.5 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-slate-200 bg-white group-hover:border-blue-500 group-hover:scale-125 transition-all"></div>
                    <div className="ml-10">
                      <h4 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        Arquitetura Modular
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Mudança de código monolítico confuso para componentes
                        limpos e reutilizáveis.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="relative flex items-start group">
                    <div className="absolute left-0 mt-1 ml-2.5 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-slate-200 bg-white group-hover:border-cyan-500 group-hover:scale-125 transition-all"></div>
                    <div className="ml-10">
                      <h4 className="text-base font-bold text-slate-800 group-hover:text-cyan-600 transition-colors">
                        UX/UI Aprimorada
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Uma atualização visual completa focando em
                        acessibilidade, espaçamento e micro-interações.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="relative flex items-start group">
                    <div className="absolute left-0 mt-1 ml-2.5 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-slate-200 bg-white group-hover:border-purple-500 group-hover:scale-125 transition-all"></div>
                    <div className="ml-10">
                      <h4 className="text-base font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                        Estado Global
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Substituindo o "prop-drilling" por uma implementação
                        robusta da Context API.
                      </p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="relative flex items-start group">
                    <div className="absolute left-0 mt-1 ml-2.5 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-slate-200 bg-white group-hover:border-green-500 group-hover:scale-125 transition-all"></div>
                    <div className="ml-10">
                      <h4 className="text-base font-bold text-slate-800 group-hover:text-green-600 transition-colors">
                        Performance
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        Ciclos de renderização otimizados e tamanho de bundle
                        reduzido para velocidade relâmpago.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
