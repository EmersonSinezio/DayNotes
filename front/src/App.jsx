import React, { useState } from "react";
//  Styles
import "./components/styles/container.css";
import "./components/styles/sidebar.css";
import "./components/styles/main.css";
//Components
import Notes from "./components/Notes";
//  api
import api from "./services/api";
import { useEffect } from "react";
import RadioButton from "./components/Notes/RadioButton";

function App() {
  const [selectedValue, setSelectedValue] = useState("all");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    getAllNotes();
  }, []);
  async function getAllNotes() {
    const response = await api.get("/annotations");
    setAllNotes(response.data);
  }
  //  função para filtrar as rotas em ordem
  async function loadNotes(option) {
    const params = { priority: option };
    const response = await api.get("/priorities", { params });
    if (response) {
      setAllNotes(response.data);
    }
  }
  //Função para verificar quando se clica no radio
  function handleChange(e){
    setSelectedValue(e.value)
    if(e.checked && e.value !== 'all'){
      loadNotes(e.value)
    }else{
      getAllNotes()
    }
  }
  // função para resetar o titulo e as anotaçoes apos enviar
  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post("/annotations", {
      title,
      notes,
      priority: false,
    });
    setTitle("");
    setNotes("");

    if(selectedValue !== 'all'){
      getAllNotes()
    }else{
      setAllNotes([...allNotes, response.data]);
    }
    setSelectedValue('all')
  }
  //Use effect para colorir o botao 
  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById("btn-submit");
      btn.style.background = "#FFD3CA";
      if (title && notes) {
        btn.style.background = "#EB8F7A";
      }
    }
    enableSubmitButton();
  }, [title, notes]);
  //  Deletar
  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`);
    if (deletedNote) {
      setAllNotes(allNotes.filter((note) => note._id !== id));
    }
  }
  //  função para trocar as prioridades
  async function handleChangePriority(id) {
    const note = await api.post(`/priorities/${id}`);
    if (note && selectedValue !== 'all') {
      loadNotes(selectedValue)
    }else if(note){
      getAllNotes();
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </div>

          <button type="submit" id="btn-submit">
            Salvar
          </button>
        </form>
        <RadioButton selectValue={selectedValue} handleChange={handleChange}/>
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

export default App;
