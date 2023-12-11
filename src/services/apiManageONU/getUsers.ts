import axios from "axios";

import { IUsers } from "../../interfaces/users";

export async function getUsers(): Promise<IUsers[]>{
    const userData = await axios({
        method: 'post',
        url: 'http://localhost:4000/getUsers',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {},
    }).then((response) => {
        return response.data;
    });
    return userData;
}