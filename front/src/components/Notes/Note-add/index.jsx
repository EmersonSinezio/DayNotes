import React from "react";
import "../../../styles/notes/notepad-add/notes.css";
const NotesAdd = () => {
  return (
    <div className="notepad-add-content">
      <h1>Notes</h1>
      <form action="">
        <div className="inpt">
          <label htmlFor="">Titulo da anotação</label>
          <input type="text" name="" id="" placeholder="Digite sua anotação" />
        </div>
        <div className="inpt">
          <label htmlFor="">Informações</label>
          <textarea name="" id="" placeholder="Digite os detalhes"></textarea>
        </div>
      </form>
      <div className="add-btn">
        <button>Adicionar</button>
      </div>
    </div>
  );
};

export default NotesAdd;
