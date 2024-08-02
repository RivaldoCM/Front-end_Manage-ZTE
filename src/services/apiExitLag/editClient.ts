import axios from "axios";

export async function editClient({token, email, status}: {token: string, email: string, status: string}){
    const res = await axios({
        method: 'POST',
        url: `https://stg-providers-api.exitlag.net/user/register`,
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
        console.log(response)
        return response;
    }).catch(async (error) => {
        return error.response;
    });
    return res;
}