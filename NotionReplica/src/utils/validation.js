import { z } from "zod";

export const UserLogin = z.object({
    email: z.string().email({message: "Enter valid email"}),
    password: z.string().min(8),
  });

  export const UserRegister = z.object({

    email: z.string().email({message: "Invalid email format"}),
    password: z
    .string()
    .min(8,"Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
    repeatPassword: z.string(),
  })
  .refine((data)=> data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  })


// export const validate = () => {
//   try {
//     const user = User.parse({
//       email,
//       password,
//     });
//     setErrors(null);
//     return true;
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       setErrors(err.format());
//     }
//     return false;
//   }
// };
