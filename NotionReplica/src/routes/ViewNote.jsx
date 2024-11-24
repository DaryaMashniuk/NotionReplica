import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../utils/API";
import bin from "../assets/delete.png";
import edit from "../assets/edit.png";

function ViewNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        console.log("Fetching note with id:", id);
        const fetchedNote = await API.fetchNoteById(id);
        setNote(fetchedNote);
      } catch (error) {
        console.error("Failed to fetch note", error);
      }
    };

    fetchNote();
  }, [id]);

  const deleteNote = async () => {
    try {
      await API.deleteNote(id);
      navigate("/notes");
    } catch (error) {
      console.error("Failed to delete note", error);
    }
  };

  if (!note) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/notes" className="text-black hover:underline mb-4 self-start">
        Back
      </Link>
      <div className="bg-white shadow-md rounded-lg p-6 w-[75%] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center flex-1 break-all px-4">{note.title}</h1>
          <div className="flex space-x-4">
            <button onClick={deleteNote} aria-label="Delete" className="hover:bg-gray-100 rounded-full p-1">
              <img src={bin} alt="Delete" className="h-6 w-6" />
            </button>
            <Link to={`/notes/${id}/edit`} aria-label="Edit">
              <img src={edit} alt="Edit" className="h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Тело заметки как отдельный блок */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
          <p className="text-gray-700 break-all">{note.body}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewNote;
