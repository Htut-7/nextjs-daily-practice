import z from "zod";

const UpdateProfileSchema=z.object({
    username: z.string(),
    name: z.string(),
    email: z.string(),
});

export default UpdateProfileSchema;