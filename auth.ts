import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import loginSchema from "./lib/schema/loginSchema"
import dbConnect from "./lib/dbConnect";
import User from "./db/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google"; 
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    async authorize(credential){
        const validateField=loginSchema.safeParse(credential);

        if(validateField.success){
            const {email,password}=validateField.data;

            await dbConnect();

            const existingUser=await User.findOne({email}).select("+passwordHash");

            if(!existingUser?.passwordHash) return null;

            const validPassword=await bcrypt.compare(password, existingUser.passwordHash);

            if(validPassword){
                return{
                    id: existingUser._id.toString(),
                    name: existingUser.name,
                    email: existingUser.email,
                }
            }
        }
        return null;
    }
  }),
  Google, GitHub,
],
})