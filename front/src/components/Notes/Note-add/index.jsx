import React, { useEffect } from "react";
import "../../../styles/notes/notepad-add/notes.css";
import { useState } from "react";
import api from "../../../services/api";
import { useParams } from "react-router-dom";
const NotesAdd = ({ onNoteAdded }) => {
  // Add callback prop
  const [titleText, setTitleText] = useState("");
  const [info, setInfo] = useState("");
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

      // Reset form
      setTitleText("");
      setInfo("");

      // Notify parent component about the new note
      if (onNoteAdded) {
        onNoteAdded();
      }
    } catch (error) {
      console.error("[FRONTEND] Erro completo:", error);
      alert(error.response?.data?.details || "Erro desconhecido");
    }
  }

  return (
    <div className="notepad-add-content">
      <form onSubmit={handleSubmit} className="form">
        <h1>Notes</h1>
        <div className="inpt">
          <label htmlFor="">Titulo da anotação</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="Digite sua anotação"
            onChange={(e) => setTitleText(e.target.value)}
            value={titleText}
          />
        </div>
        <div className="inpt">
          <label htmlFor="">Informações</label>
          <textarea
            name=""
            id=""
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Digite os detalhes"
            value={info}
          ></textarea>
        </div>
        <div className="add-btn">
          <button type="submit">Adicionar</button>
        </div>
      </form>
    </div>
  );
};

export default NotesAdd;
