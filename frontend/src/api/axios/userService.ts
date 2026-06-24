
import userAPI from "./userAPI";

export async function shortenURLAPI(url:string){
    return userAPI.post('/shorten', { url });
}

export async function getAllUrlsAPI(){
    return userAPI.get('/urls');
}