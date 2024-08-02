import axios from "axios";

export async function createUser({token, name, email}: {token: string, name: string, email: string}){

    const data = [{
        firstName: name,
        contractId: 179,
        externalId: 1
    }]

    const teste = JSON.stringify(data)
    console.log(teste)

    const res = await axios({
        method: 'POST',
        url: `https://stg-providers-api.exitlag.net/user/register`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data:{
            teste
        }
    }).then((response) => {
        return response;
    }).catch(async (error) => {
        return error.response;
    });
    return res;
}