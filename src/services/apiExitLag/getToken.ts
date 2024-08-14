import axios from "axios";

export async function getToken():Promise<string | null>{
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_EXITLAG_URL}/auth/login`,
        data:{
            username: `${import.meta.env.VITE_EXITLAG_USER}`,
            password: `${import.meta.env.VITE_EXITLAG_PASSWORD}`,
        }
    }).then((response) => {
        return response.data.token;
    }).catch(() => {
        return null;
    });
    return res;
}

