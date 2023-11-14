import axios from "axios";

export async function getPeopleId(cpf:string): Promise<any>{
    await axios({
        headers: {
            'Authorization': `Bearer TOKEN HERE`
        },
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_TP}:45715/external/integrations/thirdparty/people/txid/${cpf}`,
    }).then((response) =>{ return response.data.id })
}