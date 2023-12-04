import axios from "axios";

import { IUsers } from "../../interfaces/users";

export async function getUsers(): Promise<IUsers[]>{
    const oltData = await axios.post(`http://localhost:4000/getUsers`)
    .then(response => {
        return response.data;
    }).catch((err) => {
        console.log(err)
    });
    return oltData;
}