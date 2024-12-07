import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/API";
import NoteForm from "../components/NoteForm";
import NotePageHeader from "../components/NotePageHeader";
import { fetchNoteById,updateNote } from "../redux/notes/actions/actions";
import { useSelector, useDispatch } from "react-redux";

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notes } = useSelector((store) => store);
  const currentNote = notes.currNote;
  const [note, setNote] = useState({
    title: "",
    body:"",
    id:"",
    userId:"",
    created: "",
  });

  useEffect(() => {
    dispatch(fetchNoteById(id));
  }, [id, dispatch]);

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

  const handleUpdate = () => {
    console.log(note)
    dispatch(updateNote(id,note));
    console.log(id);
    navigate(`/notes/${id}`);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <NotePageHeader to={`/notes/${id}`} />
      <h1 className="text-3xl font-bold mb-6">Edit Note</h1>
      {notes.loading ? (
        <div>...Loading</div>
      ) : (
        <NoteForm
          title={note.title}
          setTitle={(value) => setNote((prev) => ({ ...prev, title: value }))}
          body={note.body}
          setBody={(value) => setNote((prev) => ({ ...prev, body: value }))}
          onSubmit={handleUpdate}
          buttonText="Save Changes"
        />
      )}
    </div>
  );
}

export default UpdateNote;
