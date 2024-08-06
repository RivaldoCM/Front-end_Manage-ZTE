import axios from "axios";

export async function editClient({token, email, status}: {token: string, email: string, status: string}){
    const res = await axios({
        method: 'POST',
        url: `https://stg-providers-api.exitlag.net/business/user/update`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: [{
            email: email,
            contractId: 164,
            status: status
        }]
    }).then((response) => {
        return {
            success: true,
            data: response.data
        }
    }).catch(async (error) => {
        if(error.response && error.response.data.error==='Unauthorized'){
            return {success: false, data: null}
        }
        return null;
    });
    return res;
}