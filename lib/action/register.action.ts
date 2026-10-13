"use server";

import User from "@/db/user.model";
import dbConnect from "../dbConnect";
import registerSchema from "../schema/registerSchema";
import validateBody from "../validateBody";
import { actionError } from "../response";
import bcrypt from "bcryptjs";

export async function Register(params: {
    username: string,
    name: string,
    email: string,
    password: string
}) : Promise<{
    success: boolean;
    message?: string;
    details?: object | null;
}>{
    try{
         await dbConnect();
        const validatedData=validateBody(params, registerSchema);
        const {username, name, email, password}=validatedData.data;

        const passwordHash= await bcrypt.hash(password,10);

        const existingEmail=await User.findOne({email})

        if(existingEmail){
            throw new Error("Email already exists");
        }

        const existingUser=await User.findOne({username});

        if(existingUser){
            throw new Error("Username already exists");
        }

        await User.create({
            username,
            name,
            email,
            passwordHash,
        });

        return {
            success: true,
            message: "Account register successfully",
        }

    }catch(e){
        return actionError(e);
    }

}