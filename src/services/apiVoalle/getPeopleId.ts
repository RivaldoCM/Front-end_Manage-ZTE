import axios from "axios";
import { getToken } from "./getToken";

export async function getPeopleId(cpf:string): Promise<any>{
    let peopleId;
    await axios({
        headers: {
            'Authorization': "Bearer " + await getToken()
        },
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_TP}:45715/external/integrations/thirdparty/people/txid/${cpf}`,
    }).then((response) =>{ peopleId = response.data.response.id })

    return peopleId;
}