import React from "react";
import { useState, useContext } from "react";
import { z } from "zod";
import { UserRegister } from "../utils/validation";
import { Form, Link, redirect , useNavigate, useActionData} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../components/UserContextProvider";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")
    const [errors, setErrors] = useState(null);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const actionData = useActionData();

    const validate = () => {
        try {
          UserRegister.parse({
            email,
            password,
            repeatPassword
          });
          setErrors(null);
          return true;
        } catch (err) {
          if (err instanceof z.ZodError) {
            setErrors(err.format());
          }
          return false;
        }
      };

      if (actionData) {
        userContext.onChange(actionData);
        navigate('/')
      }

  return (
    <div className="prose flex flex-col gap-5">
      <h1>Sign up</h1>
      <Form action="/register" method="post" onSubmit={(e) => {
          if (!validate()) {
            e.preventDefault();
          }
        }}>
        <input name="email" type="Email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors?.email && <div className="text-red-400">{errors?.email?._errors[0]}</div>}

        <input name="password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors?.password && <div className="text-red-400">{errors?.password?._errors[0]}</div>}

        <input placeholder="Repeat password" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
        {errors?.repeatPassword && <div className="text-red-400">{errors?.repeatPassword?._errors[0]}</div>}
        <input type="hidden" name="registerDate" value={Date().toLocaleString()}/>
        <button type="submit">Register</button>
      </Form>
      <Link to="/login">Already have an account? Log in</Link>
    </div>
  );
}

const registerUser =async ({id, email, password, registerDate})=> {
  const res = await fetch(`http://localhost:5001/users` , {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({ id, email, password, registerDate })
  })
  if (!res.ok) {
    throw new Error("Failed to register user.");
  }
  const newUser = await res.json()

  return newUser;
}

const registerUserAction =async ({request}) => {

  const formData = await request.formData();

  const newUser = {
    id: uuidv4(),
    email: formData.get('email'),
    password: formData.get('password'),
    registerDate: formData.get('registerDate')
  }
  const postUser = await registerUser(newUser)
  return postUser//redirect("/")
}
export {Register , registerUserAction};