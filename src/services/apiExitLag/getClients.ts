import axios from "axios";

export async function getClients(token:string){
    const res = await axios({
        method: 'get',
        url: `https://stg-providers-api.exitlag.net/business/user`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then((response) => {
        console.log(response.data)
        return response.data;
    }).catch(async (error) =>{
        return error;
    });
    return res;
}