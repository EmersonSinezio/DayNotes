import React from "react";
import "../../../styles/notes/notes-list/notes.css";
const Notes = () => {
  return (
    <div className="notes-container">
      {/* Barra de pesquisa das notas */}
      <div className="search-bar">
        <input type="text" name="" id="search" />
      </div>
      {/* Lista de notas do usuário no banco de dados */}
      <div className="notes-list">
        <div className="note">
          <h3>Titulo da nota</h3>
          <p>Conteudo da nota</p>
          <span>data</span>
        </div>
        <div className="note">
          <h3>Titulo da nota</h3>
          <p>Conteudo da nota</p>
          <span>data</span>
        </div>
      </div>
    </div>
  );
};

export default Notes;
