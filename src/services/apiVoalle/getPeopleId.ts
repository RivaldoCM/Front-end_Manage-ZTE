import axios from "axios";
import { getToken } from "./getToken";

export async function getPeopleId(cpf:string): Promise<any>{
    const formatedCpf = cpf.replace(/\D/g, '');
    const peopleId = await axios({
        headers: {
            'Authorization': "Bearer " + await getToken()
        },
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_TP}:45715/external/integrations/thirdparty/people/txid/${formatedCpf}`,
    }).then((response) =>{ 
        if(!response.data.response){
            return null;
        }
        return response.data.response;
    }).catch(() => {
        return null;
    });
    return peopleId;
}