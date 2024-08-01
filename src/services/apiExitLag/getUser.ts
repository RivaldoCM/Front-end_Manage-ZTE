import axios from "axios";

export async function getExitLagUsers(token:string){
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
        console.log(error)
        return error;
    });
    return res;
}