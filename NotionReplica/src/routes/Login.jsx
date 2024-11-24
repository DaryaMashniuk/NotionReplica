import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import { UserContext } from "../components/UserContextProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userContext = useContext(UserContext)
  const handleLogin = async () => {
    const response = await fetch(`http://localhost:5001/users?email=${email}`);
    const users = await response.json();
    const user = users[0];

    if (!user) {
      setError("Пользователь не существует");
      return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      setError("Неверный пароль");
      return;
    }

    userContext.onChange(user)
    navigate("/")
  };
  console.log(password)
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-8 border border-gray-200 rounded-md">
        <div className="prose flex flex-col gap-5">
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
          {error && <div className="text-red-400 text-center">{error}</div>}
          <button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Войти
          </button>
          <Link to="/register" className="text-center block">Регистрация</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;