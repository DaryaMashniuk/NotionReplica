import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../components/UserContextProvider";
import Note from "../components/Note/Note";
import { Link } from "react-router-dom";
import API from "../utils/API";

function Notes() {
  const [notes, setNotes] = useState([]);
  const userContext = useContext(UserContext);
  const userId = userContext.user.id;

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const fetchedNotes = await API.fetchNotes(userId);
      setNotes(fetchedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDelete = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="w-[75%] max-w-2xl prose mx-auto">
        <h1 className="text-center">Notes</h1>
        <Link to="/createNewNote" className="text-center block mb-4">Add new note</Link>
        {notes.length > 0 ? (
          notes.slice().reverse().map((note) => {
            return <Note key={note.id} note={note} onDelete={() => handleDelete(note.id)} />;
          })
        ) : (
          <div className="text-center">You don't have any notes</div>
        )}
      </div>
    </div>
  );
}

export default Notes;