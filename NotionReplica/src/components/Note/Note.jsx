import React from "react";
import edit from "../../assets/edit.png";
import bin from "../../assets/delete.png";
import { Link } from "react-router-dom";
import styles from "./Note.module.css";
import API from "../../utils/API";

function Note({ note, onDelete }) {
  
  const deleteNote = () => {
    API.deleteNote(note.id);
    onDelete(note.id);
  };

  return (
    <div className={`bg-white shadow-md rounded p-4 mb-4 flex flex-col w-full max-w-lg mx-auto ${styles.noteContainer}`}>
      <div className="flex justify-between items-start">
        <div className={styles.title}>
          <Link to={`/notes/${note.id}`} className={styles.text}>
            <h5 className=" text-lg font-bold text-gray-800 mb-1 ">{note.title}</h5>
            <p className="text-gray-500 text-sm">{note.created}</p>
          </Link>
        </div>

        <div className="flex flex-row ml-4 space-x-2">
          <button className={styles.button} onClick={deleteNote}>
            <img src={bin} alt="Delete" className="h-6 w-6" />
          </button>
          <Link to={`/notes/${note.id}/edit`}>
            <img src={edit} alt="Edit" className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <Link to={`/notes/${note.id}`} className={styles.text}>
        <p className="text-gray-600 mt-2 break-all">{note.body}</p>
      </Link>
    </div>
  );
}

export default Note;