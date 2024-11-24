import React, { useContext, useState } from "react";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { UserRegister } from "../utils/validation";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../components/UserContextProvider";

export default  function Register() {
  const userContext=useContext(UserContext);
  const date = new Date();
  const [formData, setFormData] = useState({
    id: uuidv4(),
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
    nickname: "",
    age: "",
    gender: "Other",
    registerDate: date.toLocaleDateString("en-GB")
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    try {
      UserRegister.parse({
        ...formData,
        age: parseInt(formData.age, 10),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const hashedPassword = await bcrypt.hash(formData.password, 10);

    const user = {
      ...formData,
      password: hashedPassword,
      age: parseInt(formData.age, 10),
    };

    const response = await fetch("http://localhost:5001/users");
    const users = await response.json();

    const emailExists = users.some((u) => u.email === user.email);

    if (emailExists) {
      setErrors({ email: { _errors: ["Email уже используется"] } });
      return;
    }

    await fetch("http://localhost:5001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    userContext.onChange(user)
    navigate("/")
  };

  return (
    <div className="p-4 md:max-w-md mx-auto mt-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Регистрация</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="p-2 border rounded"
        />
        {errors?.email && <div className="text-red-400">{errors.email._errors[0]}</div>}

        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="p-2 border rounded"
        />
        {errors?.password && <div className="text-red-400">{errors.password._errors[0]}</div>}

        <input
          name="repeatPassword"
          type="password"
          placeholder="Повторите пароль"
          value={formData.repeatPassword}
          onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}
          className="p-2 border rounded"
        />
        {errors?.repeatPassword && <div className="text-red-400">{errors.repeatPassword._errors[0]}</div>}

        <input
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="p-2 border rounded"
        />
        {errors?.name && <div className="text-red-400">{errors.name._errors[0]}</div>}

        <input
          name="nickname"
          placeholder="Никнейм"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          className="p-2 border rounded"
        />
        {errors?.nickname && <div className="text-red-400">{errors.nickname._errors[0]}</div>}

        <input
          name="age"
          type="number"
          placeholder="Возраст"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="p-2 border rounded"
        />
        {errors?.age && <div className="text-red-400">{errors.age._errors[0]}</div>}

        <select
          name="gender"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="Male">Мужской</option>
          <option value="Female">Женский</option>
          <option value="Other">Другое</option>
        </select>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/login" className="block text-center mt-4">Уже есть аккаунт? Войти</Link>
    </div>
  );
}

;
