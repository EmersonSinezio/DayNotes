import React, { useState } from "react";

//Components
import Notes from "../components/Notes/Note-list";

import "../styles/homepage/homepage.css";

//  api
import api from "../services/api";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotesAdd from "../components/Notes/Note-add";

function Homepage() {
  const [refreshTrigger, setRefreshTrigger] = React.useState(0);
  const handleNoteAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };
  return (
    <div id="app">
      <aside className="notepad-add-container">
        <NotesAdd onNoteAdded={handleNoteAdded} />
      </aside>
      <aside className="notes-container">
        <Notes key={refreshTrigger} />
      </aside>
    </div>
  );
}

export default Homepage;
