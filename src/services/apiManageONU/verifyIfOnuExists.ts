import axios from "axios";
import { IVerifyIfOnuExistisProps } from "../../interfaces/api";

export const verifyIfOnuExists = async (props: IVerifyIfOnuExistisProps) => {
    const { ip, oltType, matchSerialNumber } = props;

    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/findOnu`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            ips: ip,
            serialNumber: matchSerialNumber,
            modelOlt: oltType 
        }
    }).then(response => {
        return response.data;
    })
    .catch(() => {
        //SÓ ENTRA AQUI SE ANÃO TIVER CONEXÃO COM A API
        return undefined;
    });

    return res;
}