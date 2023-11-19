import axios from "axios";
import { Olt } from "../../interfaces/olt";

export async function getOlt(type: string): Promise<Olt[]>{
    const oltData = await axios.post(`http://localhost:4000/getOlt`, {
        type: type
    })
    .then(response => {
        return response.data;
    });

    return oltData;
}