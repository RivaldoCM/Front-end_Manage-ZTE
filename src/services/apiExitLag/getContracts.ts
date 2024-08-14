import axios from "axios";

export async function getContracts(token:string){
    const res = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_EXITLAG_URL}/business`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then((response) => {
        return response.data;
    }).catch(async (error) => {
        return error;
    });
    return res;
}