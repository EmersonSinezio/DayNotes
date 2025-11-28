import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-zinc-200 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <span className="font-bold text-lg text-zinc-800">DayNotes</span>
        </div>
        <p className="text-zinc-400 text-sm">
          © 2025 DayNotes Inc. Todos os direitos reservados.
        </p>
        <div className="flex gap-6 text-zinc-400">
          <FaTwitter
            size={24}
            className="hover:text-brand cursor-pointer transition-colors"
          />
          <FaInstagram
            size={24}
            className="hover:text-brand cursor-pointer transition-colors"
          />
          <FaLinkedin
            size={24}
            className="hover:text-brand cursor-pointer transition-colors"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
