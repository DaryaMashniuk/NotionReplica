import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginById } from "../redux/user/actions/actions";

function RequireAuth({ children }) {
  const { user, loading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id && !user) {
      console.log(id)
      dispatch(loginById(id));
      navigate("/")
    }
  }, [dispatch, user]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

export default RequireAuth;
