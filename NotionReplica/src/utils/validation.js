import { z } from "zod";

export const UserLogin = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});

export const UserRegister = z
  .object({
    email: z.string().email({ message: "Неверный формат email" }),
    password: z
      .string()
      .min(8, "Пароль должен быть не менее 8 символов")
      .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
      .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
      .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
    repeatPassword: z.string(),
    name: z.string().min(2, "Имя должно содержать хотя бы 2 символа"),
    nickname: z.string().min(2, "Никнейм должен содержать хотя бы 2 символа"),
    age: z.number().min(18, "Возраст должен быть не менее 18").max(120, "Слишком большой возраст"),
    gender: z.enum(["Male", "Female", "Other"]),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли должны совпадать",
    path: ["repeatPassword"],
  });
