import axios from "axios";
import { SetStateAction } from 'react';
import { Olt } from "../../interfaces/olt";

export async function getOlt(type: string): Promise<SetStateAction<Olt[]>>{
    const oltData = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/getOlt`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            type: type
        },
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data.messages.message;
    });
    return oltData;
}