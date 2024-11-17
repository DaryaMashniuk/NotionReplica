import { z } from "zod";

export const User = z.object({
    email: z.string().email({message: "Enter valid password"}),
    password: z.string().min(8),
  });