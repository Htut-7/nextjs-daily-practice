import { Schema, Document, models, model } from "mongoose";

export interface IUser{
    username?: string,
    name: string,
    email: string,
    passwordHash?: string,
}

export interface IUserDoc extends IUser, Document {}

const userSchema= new Schema(
    {
        username: {
            type: String,
        },
        name:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        passwordHash:{
            type: String,
        },
        
    },{timestamps: true}
);

const User= models?.User || model<IUser>("User",userSchema);
export default User;