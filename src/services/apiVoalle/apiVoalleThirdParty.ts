import axios from "axios";

export function getToken(){
    return new Promise( async (resolve, _reject) => {
        await axios.post(`${import.meta.env.VITE_BASEURL_TP}:4500/connect/token`, {
            grant_type: 'client_credentials',
            scope: 'syngw',
            client_id: import.meta.env.VITE_CLIENTID_TP,
            client_secret: import.meta.env.VITE_CLIENTSECRET_TP,
            syndata: import.meta.env.VITE_VERIFYTOKEN_TP
        }).then(response => {
            console.log(response);
            resolve(response)
        }).then(err => {
            console.log(err);
        });
    });
}