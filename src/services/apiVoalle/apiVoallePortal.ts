import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL_PORTAL_VOALLE;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID_PORTAL_VOALLE;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET_PORTAL_VOALLE;
const PORTAL_TOKEN = import.meta.env.VITE_PORTAL_TOKEN;

export const getToken = async () => {
    await axios.get(`${API_BASE_URL}/portal_authentication?`, {
        params:{
            verify_token: PORTAL_TOKEN,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'client_credentials',
            username: '12748829662',
            password: '12748829662',
        }
    })
    .then(response => {
        console.log(response.data)
    })
}