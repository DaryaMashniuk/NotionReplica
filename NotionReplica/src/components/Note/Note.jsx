import React from "react";
import edit from "../../assets/edit.png";
import bin from "../../assets/delete.png";
import { Link } from "react-router-dom";
import styles from "./Note.module.css";

function Note({ note , onDelete }) {
  const deleteNote = async (noteId) => {
    try {
      const res = await fetch(`http://localhost:5001/notes/${noteId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Failed to delete note.");
      }
      onDelete(note.id)
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className={`bg-white shadow-md rounded p-4 m-4 flex items-center justify-between ${styles.noteContainer}`}>
      <div className="flex flex-col w-full">
        <div className={styles.noteHeader}>
          <Link to="/viewNote">
            <h5 className="text-lg font-bold text-gray-800 mb-2">{note.title}</h5>
          </Link>
          <div className="flex flex-row">
            <button onClick={() => deleteNote(note.id)}>
              <img src={bin} alt="Delete" />
            </button>
            <Link to="/editNote">
              <img src={edit} alt="Edit" />
            </Link>
          </div>
        </div>
        <Link to="/viewNote">
          <p className="text-gray-600">{note.body}</p>
        </Link>
      </div>
    </div>
  );
}

export default Note;
