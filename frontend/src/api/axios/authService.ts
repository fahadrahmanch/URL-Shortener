
import authAPI from "./authAPI";

export async function registerAPI(email:string,password:string){
    return authAPI.post("/register", { email, password });
}

export async function loginAPI(email:string,password:string){
    return authAPI.post("/login", { email, password });
}