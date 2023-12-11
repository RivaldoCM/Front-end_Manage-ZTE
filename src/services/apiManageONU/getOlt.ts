import axios from "axios";
import { SetStateAction } from 'react';
import { Olt } from "../../interfaces/olt";

export async function getOlt(type: string): Promise<SetStateAction<Olt[]>>{
    const oltData = await axios({
        method: 'post',
        url: 'http://localhost:4000/getOlt',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            type: type
        },
    }).then((response) => {
        return response.data;
    });
    return oltData;
}