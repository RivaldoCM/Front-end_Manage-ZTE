import axios from "axios";

import { VOALLE_PORTAL_CONFIG } from "../apiConfig";

export const getToken = async () => {
    await axios.get(`${VOALLE_PORTAL_CONFIG.baseURL}/portal_authentication?`, {
        params:{
            verify_token: `${VOALLE_PORTAL_CONFIG.token}`,
            client_id: `${VOALLE_PORTAL_CONFIG.client_id}`,
            client_secret: `${VOALLE_PORTAL_CONFIG.client_secret}`,
            grant_type: 'client_credentials',
            username: '12748829662',
            password: '12748829662',
        }
    })
    .then(response => {
        console.log(response.data)
    })
}