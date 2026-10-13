import z from "zod";

const registerSchema=z.object({
    username: z.string(),
    name: z.string(),
    email: z.email(),
    password: z.string(),
});

export default registerSchema;