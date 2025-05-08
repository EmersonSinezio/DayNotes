import React, { useState } from "react";
//  Styles
import "../components/styles/container.css";
import "../components/styles/sidebar.css";
import "../components/styles/main.css";
//Components
import Notes from "../components/Notes";
//  api
import api from "../services/api";
import { useEffect } from "react";
import RadioButton from "../components/Notes/RadioButton";
import { useParams } from "react-router-dom";

function Homepage({ user, logout }) {
  const [selectedValue, setSelectedValue] = useState("all");
  const [titleText, setTitleText] = useState("");
  const [notesText, setNotesText] = useState(""); // Renomeado para evitar conflito
  const [allNotes, setAllNotes] = useState([]);
  const { userid } = useParams();

  // Verificação de segurança reforçada
  useEffect(() => {
    if (userid !== user?.userid) {
      logout();
      window.location.href = "/login";
    }
  }, [userid, user, logout]);

  useEffect(() => {
    getAllNotes();
  }, [userid]); // Adicione userid como dependência

  async function getAllNotes() {
    try {
      const response = await api.get(`/users/${userid}/notes`);
      setAllNotes(response.data);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
    }
  }

  async function loadNotes(option) {
    try {
      const response = await api.get(`/users/${userid}/notes`, {
        params: { priority: option },
      });
      setAllNotes(response.data);
    } catch (error) {
      console.error("Erro ao filtrar notas:", error);
    }
  }

  async function handleSubmit(event) {
    try {
      console.log("[FRONTEND] Tentando criar nota...");
      console.log("UserID:", userid);
      console.log("Dados:", { title: titleText, notes: notesText });

      const token = localStorage.getItem("token");
      console.log("Token JWT:", token);

      const response = await api.post(`/users/${userid}/notes`, {
        title: titleText,
        notes: notesText,
        priority: false,
      });

      console.log("[FRONTEND] Resposta da API:", response);
      // ... restante do código
    } catch (error) {
      console.error("[FRONTEND] Erro completo:", error);
      console.log("Resposta de erro:", error.response);
      alert(error.response?.data?.details || "Erro desconhecido");
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/users/${userid}/notes/${id}`);
      setAllNotes(allNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
    }
  }

  async function handleChangePriority(id) {
    try {
      await api.post(`/users/${userid}/notes/${id}/priority`);
      if (selectedValue !== "all") {
        await loadNotes(selectedValue);
      } else {
        await getAllNotes();
      }
    } catch (error) {
      console.error("Erro ao alterar prioridade:", error);
    }
  }
  return (
    <div id="app">
      <aside>
        <strong>Caderno de notas</strong>
        <form action="" onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="title">Titulo da anotação</label>
            <input
              type="text"
              name=""
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
              required
              maxLength="30"
            />
          </div>

          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              required
            />
          </div>

          <button type="submit" id="btn-submit">
            Salvar
          </button>
        </form>
        <RadioButton selectValue={selectedValue} handleChange={loadNotes} />
      </aside>

      <main>
        <ul>
          {allNotes.map((data) => (
            <Notes
              data={data}
              key={data._id}
              handleDelete={handleDelete}
              handleChangePriority={handleChangePriority}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Homepage;
