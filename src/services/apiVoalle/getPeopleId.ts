import axios from "axios";

export async function getPeopleId(req: any, _res: any,){
    const { cpf } = req.body

    await axios({
        headers: {
            'Authorization': `Bearer TOKEN HERE`
        },
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_TP}:45715/external/integrations/thirdparty/people/txid/${cpf}`,
    }).then((response) =>{ response.data.id })
}