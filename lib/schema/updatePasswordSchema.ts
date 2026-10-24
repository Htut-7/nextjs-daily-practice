import z from "zod";

const updatePasswordSchema=z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
});

export default updatePasswordSchema;