import axios from "axios";
import { SetStateAction } from 'react';

export async function getOlt(type: string): Promise<SetStateAction<never[]>>{
    const oltData = await axios.post(`http://localhost:4000/getOlt`, {
        type: type
    })
    .then(response => {
        return response.data;
    });

    return oltData;
}