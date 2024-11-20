import React, { useContext } from "react";
import { useState } from "react";
import { z } from "zod";
import { UserLogin  } from "../utils/validation";
import { UserContext } from "../components/UserContextProvider";
import { useNavigate, Link} from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const validate = () => {
    try {
      const user = UserLogin.parse({
        email,
        password,
      });
      setErrors(null);
      return true;
    } catch (err) {
      console.log(err)
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
      return false;
    }
  };
  function handleLogin() {
    if (!validate()) {
      console.log("hello")
        return false;
    }
    const query = new URLSearchParams({
        email,
        password
    }).toString()
    console.log(query)
    fetch(`http://localhost:5001/users?${query}`)
    .then((r)=> r.json())
    .then((users)=> users[0])
    .then((user)=> {
        if (user) {
            userContext.onChange(user)
            console.log("hi")
            navigate("/")
        } else {
            setErrors('Invalid user')
        }
    })
  }
  return (
    <div className="prose flex flex-col gap-5">
      <h1>Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {errors?.email && <div className="text-red-400">{errors?.email?._errors[0]}</div>}

      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errors?.password && <div className="text-red-400">{errors?.password?._errors[0]}</div>}

      <button onClick={handleLogin}>Login</button>
      <Link to="/register">Зарегистрироваться</Link>
    </div>
  );
}

export default Login;
