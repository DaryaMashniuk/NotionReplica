import React, { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const context = useContext(UserContext);
  if (!context) {
    console.error("RequireAuth must be used within a UserContextProvider");
    return <Navigate to="/login" replace />;
  }
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
