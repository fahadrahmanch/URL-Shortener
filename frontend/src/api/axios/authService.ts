
import authAPI from "./authAPI";
import { ENDPOINTS } from "../../constants/endpoints";

export async function registerAPI(email:string,password:string){
    return authAPI.post(ENDPOINTS.AUTH.REGISTER, { email, password });
}

export async function loginAPI(email:string,password:string){
    return authAPI.post(ENDPOINTS.AUTH.LOGIN, { email, password });
}