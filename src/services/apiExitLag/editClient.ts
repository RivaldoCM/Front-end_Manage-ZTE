import axios from "axios";

export async function editClient({token, email, status}: {token: string, email: string, status: string}){
    console.log(status, 'aq')
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
        return response;
    }).catch(async (error) => {
        return error.response.data;
    });
    return res;
}