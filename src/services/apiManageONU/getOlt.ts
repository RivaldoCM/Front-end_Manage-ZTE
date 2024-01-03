import axios from "axios";
import { SetStateAction } from 'react';
import { Olt } from "../../interfaces/olt";

export async function getOlt(type: string): Promise<SetStateAction<Olt[]>>{
    const oltData = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/getOlt/${type}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        return err.response.data.messages.message;
    });

    console.log(oltData)
    return oltData;
}