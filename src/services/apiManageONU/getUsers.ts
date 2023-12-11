import axios from "axios";

import { IUsers } from "../../interfaces/users";

export async function getUsers(): Promise<IUsers[]>{
    const userData = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/getUsers`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {},
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data.messages.message;
    });
    return userData;
}