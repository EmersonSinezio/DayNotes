import React, { useState, useEffect, useCallback } from "react";
import "../../../styles/notes/notes-list/notes.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

const Notes = () => {
  const [allnotes, setAllNotes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const { userid } = useParams();

  const getAllNotes = useCallback(async () => {
    try {
      const response = await api.get(`/users/${userid}/notes`);
      setAllNotes(response.data);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
    }
  }, [userid]);

  useEffect(() => {
    getAllNotes();
  }, [getAllNotes]);

  const deleteNote = useCallback(
    async (id) => {
      const confirmation = window.confirm("Tem certeza que deseja deletar?");
      if (!confirmation) return;

      try {
        await api.delete(`/users/${userid}/notes/${id}`);
        getAllNotes();
      } catch (error) {
        console.error("Erro ao deletar nota:", error);
      }
    },
    [userid, getAllNotes]
  );

  const openEditModal = (note) => {
    setEditingNote(note);
    setEditTitle(note.title);
    setEditContent(note.notes);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingNote(null);
    setEditTitle("");
    setEditContent("");
  };

  const handleUpdateNote = async () => {
    if (!editingNote || !editTitle.trim()) {
      alert("O título é obrigatório");
      return;
    }

    try {
      await api.put(`/users/${userid}/notes/${editingNote._id}`, {
        title: editTitle,
        notes: editContent,
      });
      getAllNotes();
      closeEditModal();
    } catch (error) {
      console.error("Erro ao atualizar nota:", error);
    }
  };

  return (
    <div className="notes-container">
      {/* Modal de Edição */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h2>Editar Nota</h2>
              <div className="modal-inputs">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Título"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Conteúdo"
                />
              </div>
              <div className="modal-buttons">
                <button className="cancel-btn" onClick={closeEditModal}>
                  Cancelar
                </button>
                <button className="save-btn" onClick={handleUpdateNote}>
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de Notas */}
      <div className="notes-content">
        <div className="notes-list">
          {allnotes.length > 0 ? (
            allnotes.map((note) => (
              <div className="note" key={note._id}>
                <div className="icon-container">
                  <FaEdit
                    size={25}
                    className="icon"
                    onClick={() => openEditModal(note)}
                  />
                  <FaTrashAlt
                    size={25}
                    className="icon"
                    onClick={() => deleteNote(note._id)}
                  />
                </div>
                <div className="note-content">
                  <h3>{note.title}</h3>
                  <p>{note.notes}</p>
                </div>
                <div className="note-date">
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-notes">
              <h2>Nenhuma nota encontrada</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
