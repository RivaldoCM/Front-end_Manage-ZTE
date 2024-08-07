import axios from "axios";

export async function getClients(token:string){
    const res = await axios({
        method: 'get',
        url: `https://stg-providers-api.exitlag.net/business/user`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: {
            size: 500
        }
    }).then((response) => {
        console.log(response)
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