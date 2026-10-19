"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import validateBody from "../validateBody";
import UpdateProfileSchema from "../schema/updateProfileSchema";
import User from "@/db/user.model";

export async function UpdateProfile(params:{
    username: string;
    name: string;
    email: string;
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
        const validatedData=validateBody(params,UpdateProfileSchema);
        const {username,name,email}=validatedData.data;

        const user=await User.findById(userId);

        if(!user){
            throw new Error("User not found");
        }

        const existingUser=await User.findOne({username});

        if(existingUser && existingUser._id.toString() !== user._id.toString()){
            throw new Error("Username already exists");
        }

        user.username=username;
        user.name=name;
        user.email=email;

        await user.save();

        return{
            success: true,
            message: "Profile update successfully",
        }

        
    }catch(e){
        return actionError(e);
    }
}