"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import updatePasswordSchema from "../schema/updatePasswordSchema";
import User from "@/db/user.model";
import bcrypt from "bcryptjs";

export async function updatePassword(params: {
    currentPassword: string;
    newPassword: string;
}) : Promise<{
    success: boolean;
    message?: string;
    details?: object | null;
}>{
    await dbConnect();

    const session=await auth();

    if(!session?.user?.id){
        throw new Error("Unauthorized");
    }

    const userId=session.user.id;

    try{
        const validatedData=validateBody(params,updatePasswordSchema);
        const {currentPassword, newPassword}=validatedData.data;

        const user=await User.findById(userId).select("passwordHash");

        if(!user){
            throw new Error("User not found");
        }

        if(!user.passwordHash){
            throw new Error("This account does not have password. Please use the password setup flow");
        }

        const isPasswordValid=await bcrypt.compare(currentPassword,user.passwordHash);

        if(!isPasswordValid){
            throw new Error("Password is not valid");
        }

        const newPasswordHash=await bcrypt.hash(newPassword,10);
        
        user.passwordHash=newPasswordHash;

        await user.save();

        return{
            success: true,
            message: "Password update successfully",
        }

    }catch(e){
        return actionError(e);
    }

}