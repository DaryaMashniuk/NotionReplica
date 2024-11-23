import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../components/UserContextProvider";

function ViewNote(props) {
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const userContext = useContext(UserContext)
    const userId = userContext.user.id;

    const newNote = {
        //id : uuidv4(),
        userId: userId,
        title : title,
        body : body,
        created: Date().toLocaleString()
    }

    const addNewNote= async()=> {
        const res = await fetch(`http://localhost:5001/notes`, {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(newNote)
        })
        if (!res.ok) {
            throw new Error("Failed to add note")
        }
        const postNewNote = await res.json();
        return postNewNote
    }

  return (
    <div className="prose flex flex-col gap-5">
      <Link to="/notes">Back</Link>
      <h1>Note</h1>
      <input type="text" placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Note text..." type="test" value={body} onChange={(e) => setBody(e.target.value)} />

      <button onClick={addNewNote}>Add new note</button>

    </div>
  );
}

export default ViewNote;
