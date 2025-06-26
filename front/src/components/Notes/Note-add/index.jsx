import React from "react";
import "../../../styles/notes/notepad-add/notes.css";
import { useState } from "react";
import api from "../../../services/api";
import { useParams } from "react-router-dom";
import { FaPlusCircle, FaTimes } from "react-icons/fa";

const NotesAdd = ({ onNoteAdded }) => {
  const [titleText, setTitleText] = useState("");
  const [info, setInfo] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { userid } = useParams();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await api.post(`/users/${userid}/notes`, {
        title: titleText,
        notes: info,
        priority: false,
      });

      setTitleText("");
      setInfo("");

      if (onNoteAdded) {
        onNoteAdded();
      }
    } catch (error) {
      console.error("[FRONTEND] Erro completo:", error);
      alert(error.response?.data?.details || "Erro desconhecido");
    }
  }

  const clearForm = () => {
    setTitleText("");
    setInfo("");
  };

  return (
    <div className={`notepad-add-content ${isFocused ? "focused" : ""}`}>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-header">
          <h1>Nova Anotação</h1>
        </div>

        <div className="inpt">
          <input
            type="text"
            placeholder="Título"
            onChange={(e) => setTitleText(e.target.value)}
            value={titleText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        <div className="inpt">
          <textarea
            placeholder="Digite sua anotação aqui..."
            onChange={(e) => setInfo(e.target.value)}
            value={info}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></textarea>
        </div>

        <div className="add-btn">
          <button type="submit">
            <FaPlusCircle className="icon" />
            Adicionar Nota
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotesAdd;
