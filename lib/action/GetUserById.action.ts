"use server";

import User, { IUser } from "@/db/user.model";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import GetUserByIdSchema from "../schema/GetUserByIdSchema";

export async function GetUserById(params: {userId: string}) : Promise<{
    success: boolean;
    data?: {
        user: IUser;
    }
    message?: string;
    details?: object | null;
}>{
    await dbConnect();

    try{
        const validatedData=validateBody(params,GetUserByIdSchema);
        const {userId}=validatedData.data;

        const user=await User.findById(userId);
        if(!user){
            throw new Error("User not found");
        }

        return {
            success: true,
            data: {
                user,
            }
        }


    }catch(e){
        return actionError(e);
    }
}