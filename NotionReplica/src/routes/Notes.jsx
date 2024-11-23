import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import Note from "../components/Note/Note";
import { Link } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const userContext = useContext(UserContext);
  const userId = userContext.user.id;

  useEffect(() => {
    const newNotes = getNotes();
    setNotes(newNotes);
  }, []);

  const getNotes = async () => {
    const res = await fetch(`http://localhost:5001/notes?userId=${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    });
    if (!res.ok) {
      throw new Error("Failed to get notes.");
    }

    const notes = await res.json();
    setNotes(notes);
    console.log(notes);
    return notes;
  };

  const handleDelete = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div className="prose flex flex-col gap-1">
      <h1>Notes</h1>
      <Link to="/createNewNote">Add new note</Link>
      {notes.length > 0 ? (
        notes.map((note) => {
          return <Note key={note.id} note={note} onDelete={()=>handleDelete(note.id)}/>;
        })
      ) : (
        <div>You don't have any notes</div>
      )}
    </div>
  );
}

export default Notes;
