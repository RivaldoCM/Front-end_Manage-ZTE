import axios from "axios";

import { MANAGE_ONU_API_CONFIG } from "../apiConfig";
import { propsApi } from "../../interfaces/api";

export const verifyIfOnuExists = async (props: propsApi) => {
    props.startLoading();
    const oltData = props.OltInfo.find(option => option.label === props.city ? props.city : '')!;

    await axios.post(`${MANAGE_ONU_API_CONFIG.baseURL}/searchONU`, {
        ip: oltData.ip,
        serialNumber: props.matchSerialNumber.toUpperCase(), //NECESSÁRIO PARA OLT's ZTE
    })
    .then(response => {
        if(typeof(response.data) === 'string'){
            props.handleError(response.data);
            //RETORNA ONU NAO ENCONTRADA
        }
        props.stopLoading();
        props.setDataFromApi(response.data);
    })
    .catch(error => {
        //SÓ ENTRA AQUI SE A CONEXÃO CAIR NO MEIO DA EXECUÇÃO DE TAREFAS
        props.stopLoading();
        props.handleError(error.code);
    });
}