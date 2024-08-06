import axios from "axios";

export async function addClient({token, name, email}: {token: string, name: string, email: string}){
    const res = await axios({
        method: 'POST',
        url: `https://stg-providers-api.exitlag.net/user/register`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: [{
            firstName: name,
            email: email,
            confirmEmail: email,
            contractId: 164,
            externalId: '1'
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