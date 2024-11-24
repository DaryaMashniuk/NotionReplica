import React from "react";
import { Link } from "react-router-dom";

function NotePageHeader({ to, children }) {
  return (
    <div className="text-black hover:underline mb-4 self-start">
      <Link to={to}>{children || "Back"}</Link>
    </div>
  );
}

export default NotePageHeader;
