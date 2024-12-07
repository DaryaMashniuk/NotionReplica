import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import bin from "../assets/delete.png";
import edit from "../assets/edit.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchNoteById ,deleteNote } from "../redux/notes/actions/actions";

function ViewNote() {
  const { id } = useParams();
  const [note, setNote] = useState({
    title: "",
    body:"",
    id:"",
    userId:"",
    created: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notes } = useSelector((store) => store);
  const currentNote = notes.currNote;
  console.log(notes)
  useEffect(() => {
    dispatch(fetchNoteById(id));
  }, [id, dispatch]);

  console.log(id)
  useEffect(() => {
    if (currentNote && currentNote.id) {
      setNote({
        title: currentNote.title || "",
        body: currentNote.body || "",
        id: currentNote.id || "",
        userId: currentNote.userId || "",
        created: currentNote.created || "",
      });
    }
  }, [currentNote]);

  console.log(notes)
  // useEffect(() => {
  //   const fetchNote = async () => {
  //     try {
  //       console.log("Fetching note with id:", id);
  //       const fetchedNote = await API.fetchNoteById(id);
  //       setNote(fetchedNote);
  //     } catch (error) {
  //       console.error("Failed to fetch note", error);
  //     }
  //   };

  //   fetchNote();
  // }, [id]);

  // const deleteNote = async () => {
  //   try {
  //     await API.deleteNote(id);
  //     navigate("/notes");
  //   } catch (error) {
  //     console.error("Failed to delete note", error);
  //   }
  // };
  const handleDelete = () => {
    dispatch(deleteNote(id))
    navigate("/notes");
  };
  if (notes.loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  console.log(currentNote)
  return (
    <div className="container mx-auto p-4">
      <Link to="/notes" className="text-black hover:underline mb-4 self-start">
        Back
      </Link>
      <div className="bg-white shadow-md rounded-lg p-6 w-[75%] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-center flex-1 break-all px-4">{note.title}</h1>
          <div className="flex space-x-4">
            <button onClick={handleDelete} aria-label="Delete" className="hover:bg-gray-100 rounded-full p-1">
              <img src={bin} alt="Delete" className="h-6 w-6" />
            </button>
            <Link to={`/notes/${id}/edit`} aria-label="Edit">
              <img src={edit} alt="Edit" className="h-6 w-6" />
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-4">
          <p className="text-gray-700 break-all">{note.body}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewNote;
