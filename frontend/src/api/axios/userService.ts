
import userAPI from "./userAPI";
import { ENDPOINTS } from "../../constants/endpoints";

export async function shortenURLAPI(url:string){
    return userAPI.post(ENDPOINTS.USER.SHORTEN, { url });
}

export async function getAllUrlsAPI(){
    return userAPI.get(ENDPOINTS.USER.GET_ALL);
}