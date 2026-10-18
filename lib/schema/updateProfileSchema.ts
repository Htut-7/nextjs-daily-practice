import z from "zod";

const updateProfileSchema=z.object({
    username: z.string(),
    name: z.string(),
    email: z.email(),
});

export default updateProfileSchema;