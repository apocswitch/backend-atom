import {z} from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  completed: z.boolean().default(false),
  userId: z.string().min(1, "El ID de usuario es obligatorio"),
});
