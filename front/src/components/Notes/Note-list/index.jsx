import React from "react";
import "../../../styles/notes/notes-list/notes.css";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const Notes = () => {
  return (
    <div className="notes-container">
      {/* Lista de notas do usuário no banco de dados */}
      <div className="notes-content">
        <div className="notes-list">
          <div className="note">
            <div className="icon-container">
              <input type="checkbox" name="" id="" />
              <FaEdit size={25} className="icon" />
              <FaTrashAlt size={25} className="icon" />
            </div>
            <div className="note-content">
              <h3>Titulo da nota</h3>
              <p>Conteudo da nota</p>
            </div>
            <div className="note-date">
              <span>data</span>
            </div>
          </div>
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
          <div className="note">
            <h3>Titulo da nota</h3>
            <p>Conteudo da nota</p>
            <span>data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
