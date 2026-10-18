import z from "zod";

const GetUserByIdSchema=z.object({
    userId: z.string(),
});

export default GetUserByIdSchema;