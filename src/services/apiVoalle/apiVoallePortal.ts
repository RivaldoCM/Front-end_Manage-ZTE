import axios from "axios";

export const getToken = async () => {
    axios.get(`${import.meta.env.VITE_BASE_URL_PORTAL_VOALLE}/portal_authentication?`, {
        params:{
            verify_token: import.meta.env.VITE_PORTAL_TOKEN,
            client_id: import.meta.env.VITE_CLIENT_ID_PORTAL_VOALLE,
            client_secret: import.meta.env.VITE_CLIENT_SECRET_PORTAL_VOALLE,
            grant_type: 'client_credentials',
            username: '12748829662',
            password: '12748829662',
        }
    })
    .then(response => {
        console.log(response.data)
    })
}