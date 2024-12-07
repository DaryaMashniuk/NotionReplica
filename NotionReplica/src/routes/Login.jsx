import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/user/actions/actions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, errorLogin } = useSelector((store) => store.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await dispatch(loginUser(email, password));
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 border border-gray-200 rounded-md">
        <form onSubmit={handleLogin} className="prose flex flex-col gap-5">
          <h1 className="text-center text-2xl">Вход</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          {loading && <div>Loading...</div>}
          {errorLogin && <div className="text-red-400 text-center">{errorLogin}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            Войти
          </button>
          <Link to="/register" className="text-center block">
            Регистрация
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
