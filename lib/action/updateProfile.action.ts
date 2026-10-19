"use server";

import { auth } from "@/auth";
import dbConnect from "../dbConnect";
<<<<<<< HEAD
import validateBody from "../validateBody";
import updateProfileSchema from "../schema/updateProfileSchema";
import User from "@/db/user.model";
import { actionError } from "../response";
=======
import { actionError } from "../response";
import validateBody from "../validateBody";
import UpdateProfileSchema from "../schema/updateProfileSchema";
import User from "@/db/user.model";
>>>>>>> day-04-profile-management

export async function UpdateProfile(params:{
    username: string;
    name: string;
<<<<<<< HEAD
    email: string
=======
    email: string;
>>>>>>> day-04-profile-management
}) : Promise<{
    success: boolean;
    message?: string;
    details?: object | null;
}>{
    await dbConnect();
<<<<<<< HEAD

    const session=await auth();
=======
    const session=await auth();

>>>>>>> day-04-profile-management
    if(!session?.user?.id){
        throw new Error("Unauthorized");
    }

    const userId=session.user.id;

    try{
<<<<<<< HEAD
        const validatedData=validateBody(params,updateProfileSchema);
        const {username, name, email}=validatedData.data;

        const user=await User.findById(userId);
=======
        const validatedData=validateBody(params,UpdateProfileSchema);
        const {username,name,email}=validatedData.data;

        const user=await User.findById(userId);

>>>>>>> day-04-profile-management
        if(!user){
            throw new Error("User not found");
        }

        const existingUser=await User.findOne({username});
<<<<<<< HEAD
=======

>>>>>>> day-04-profile-management
        if(existingUser && existingUser._id.toString() !== user._id.toString()){
            throw new Error("Username already exists");
        }

        user.username=username;
        user.name=name;
        user.email=email;

        await user.save();

<<<<<<< HEAD
        return {
            success: true,
            message: "Profile Update Successfully",
        }

    }catch(e){
        return actionError(e);
    }

=======
        return{
            success: true,
            message: "Profile update successfully",
        }

        
    }catch(e){
        return actionError(e);
    }
>>>>>>> day-04-profile-management
}