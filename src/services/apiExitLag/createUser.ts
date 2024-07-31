import axios from "axios";
import { getTokenExitLag } from "../apiManageONU/getTokenExitlag";
import { getToken } from "./getToken";
import { sendToken } from "../apiManageONU/sendTokenExitLag";

export async function getExitLagUsers(token:string){
    const res = await axios({
        method: 'get',
        url: `https://stg-providers-api.exitlag.net/business/user`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then((response) => {
        console.log(response.data, 'deu bom')
        return response.data;
    }).catch(async (error) =>{
            if(error.response.data.error==='Unauthorized'){
               const token = await getToken();
                if (token){
                    sendToken(token)
                    getExitLagUsers(token)
                }else{
                    
                }

            }
        return null;
    });
    return res;
}

