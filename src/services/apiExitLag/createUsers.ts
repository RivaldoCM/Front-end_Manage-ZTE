import axios from "axios";

export async function createUser({token, name, email}: {token: string, name: string, email: string}){


    const res = await axios({
        method: 'POST',
        url: `https://stg-providers-api.exitlag.net/user/register`,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data:{
            firstName: name,
            email: email,
            confirmEmail: email,
            contractId: 179
        }
    }).then((response) => {
        return response;
    }).catch(async (error) =>{
        return error.response;
    });
    return res;
}