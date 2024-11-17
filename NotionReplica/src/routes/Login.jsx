import React from "react";
import { useState } from "react";
import { z } from "zod";
import { User } from "../utils/validation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const validation = () => {
    try {
      const user = User.parse({
        email,
        password,
      });
      console.log(user);
      setErrors(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(err.format());
      }
    }
  };
  function handleLogin() {
    validation();
    const query = new URLSearchParams({
        email,
        password
    }).toString()
    fetch(`http://localhost:5001/users?${query}`)
    .then((r)=> r.json())
    .then((users)=> users[0])
    .then((user)=> {
        if (user) {

        } else {
            setErrors('Invalid user')
        }
    })
  }
  return (
    <div className="prose flex flex-col gap-5">
      <h1>Login</h1>
      <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {errors?.email && <div className="text-red-400">{errors?.email?._errors}</div>}
      
      <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {errors?.password && <div className="text-red-400">{errors?.password?._errors}</div>}

      <button onClick={handleLogin}>Login</button>
      {errors && <div style={{color: 'red'}}>{errors}</div>}
    </div>
  );
}

export default Login;
