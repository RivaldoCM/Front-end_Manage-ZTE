import axios from "axios";
import { getContracts } from "./getContracts";

export async function createClient({token, name, email}: {token: string, name: string, email: string}){
    
    const teste = await getContracts(token)
    console.log(teste)

    
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
        console.log(response)
        return response;
    }).catch(async (error) => {
        return error.response;
    });
    return res;
}