import axios from "axios"

export async function getToken(){
    const token = await axios({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_TP}:45700/connect/token`,
        data: {
            'grant_type': 'client_credentials', 
            'scope': 'syngw', 
            'client_id': import.meta.env.VITE_CLIENTID_TP, 
            'client_secret': import.meta.env.VITE_CLIENTSECRET_TP, 
            'syndata': import.meta.env.VITE_VERIFYTOKEN_TP
        }
    }).then((response) =>{ 
        return response.data.access_token;
    });

    return token;
}