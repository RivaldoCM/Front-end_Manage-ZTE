import axios from "axios"

export const getToken = async () => {
    await axios.post(`${import.meta.env.VITE_BASEURL_TP}:45700/connect/token`, {
        grant_type: 'client_credentials',
        scope: 'syngw',
        client_id: import.meta.env.VITE_CLIENTID_TP,
        client_secret: import.meta.env.VITE_CLIENTSECRET_TP,
        syndata: import.meta.env.VITE_VERIFYTOKEN_TP
    })
    .then(response => {
        console.log(response.data)
    }).catch(err => {
        console.log(err)
    })
}