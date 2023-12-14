import axios from "axios";
import { getToken } from "./getToken";

export async function getPeopleId(cpf:string): Promise<any>{
    const peopleId = await axios({
        headers: {
            'Authorization': "Bearer " + await getToken()
        },
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_TP}:45715/external/integrations/thirdparty/people/txid/${cpf}`,
    }).then((response) =>{ 
        if(!response.data.response){
            return null;
        }
        return response.data.response.id;
    }).catch((_err) => {
        return null;
    });

    return peopleId;
}