import React, { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./NotesStyles/NotesStyles.css";
import "./NotesStyles/NotesStyles-Priority.css";
import api from "../../services/api";

function Notes({ data, handleDelete, handleChangePriority}) {
  const [changedNotes, setChangedNotes] = useState("");

  async function handleSave(e, notes) {
    if (changedNotes && changedNotes !== notes) {
      await api.post(`/contents/${data._id}`, {
        notes: changedNotes,
      });
    }
    e.style.cursor = 'default'
    e.style.boxShadow = "none"
  }

  function handleEdit(e,priority){
    e.style.cursor = 'text';
    e.style.borderRadius = '5px';

    priority ? e.style.boxShadow = '0 0 5px white' : e.style.boxShadow = '0 0 5 px gray'
  }

  return (
    <>
      <li
        className={data.priority ? "notepad-infos-priority" : "notepad-infos"}
      >
        <div>
          <strong>{data.title}</strong>
          <div>
            <BsFillTrashFill size={24} onClick={()=>handleDelete(data._id)}/>
          </div>
        </div>
        <textarea
          defaultValue={data.notes}
          onClick={e=>handleEdit(e.target, data.priority)}
          onChange={(e) => setChangedNotes(e.target.value)}
          onBlur={e => handleSave(e.target, data.notes)}
        />
        <span>
          <AiOutlineExclamationCircle size={24} onClick={()=>handleChangePriority(data._id)}/>
        </span>
      </li>
    </>
  );
}

export default Notes;
