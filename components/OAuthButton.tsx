"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";

function OAuthButton() {

    const [error,setError]=useState("");

    const OAuthSignIn=async(type: "google" | "github")=>{
        try{
            await signIn(type,{
                redirectTo: "/",
            })
        }catch{
            setError("Unable to login this time");
        }
    }

    return (
        <div className="space-y-3">

        {error && <p className="text-sm text-red-500">{error}</p>}

            <button onClick={()=>OAuthSignIn("google")}
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <span className="font-bold text-lg">G</span>
                Continue with Google
            </button>

            <button
            onClick={()=>OAuthSignIn("github")}
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12C24 5.37 18.63 0 12 0Z" />
                </svg>
                Continue with GitHub
            </button>
        </div>
    );
}

export default OAuthButton;
