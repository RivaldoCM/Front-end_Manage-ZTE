import axios from "axios";

export async function getClients(token:string){
    const res = await axios({
        method: 'get',
        url: `https://stg-providers-api.exitlag.net/business/user`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
    }).then((response) => {
        return {
            success: true,
            data: response.data
        }
    }).catch((error) => {
        if(error.response && error.response.data.error==='Unauthorized'){
            return {success: false, data: null}
        }
        return null;
    });
    return res;
}