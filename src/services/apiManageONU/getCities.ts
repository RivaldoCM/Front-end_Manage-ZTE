import axios from "axios";
import { SetStateAction } from 'react';

export async function getCities(): Promise<SetStateAction<any>>{
    const citiesData = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/cities`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
    }).then((response) => {
        return response.data.responses.response;
    }).catch((err) => {
        return err.response.data.messages.message;
    });
    return citiesData;
}