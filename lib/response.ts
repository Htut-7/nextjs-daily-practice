import { ZodError } from "zod";

const actionError=(e:unknown)=>{
    let message=e instanceof Error ? e.message : "Internal server error";
    let details=null;

    if(e instanceof ZodError){
        details=e.flatten().fieldErrors;
        message="Validation Error";
    }

    return{
        message,
        details,
        success: false,
    }
}

export {actionError}