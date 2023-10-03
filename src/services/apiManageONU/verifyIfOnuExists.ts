import axios from "axios";

import { propsApi } from "../../interfaces/api";

const API_BASE_URL = import.meta.env.VITE_BASEURL_MANAGE_ONU;

export const verifyIfOnuExists = async (props: propsApi) => {
    props.startLoading();
    const oltData = props.OltInfo.find(option => option.label === props.city ? props.city : '')!;

    await axios.post(`${API_BASE_URL}/searchONU`, {
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