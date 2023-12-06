import axios from "axios";
import { SetStateAction } from 'react';
import { Olt } from "../../interfaces/olt";

export async function getOlt(type: string): Promise<SetStateAction<Olt[]>>{
    const oltData = await axios.post(`${import.meta.env.VITE_BASEURL_MANAGE_ONU}/getOlt`, {
        type: type
    })
    .then(response => {
        return response.data;
    });

    return oltData;   
}