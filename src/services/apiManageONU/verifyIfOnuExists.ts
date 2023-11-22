import axios from "axios";

import { propsApi } from "../../interfaces/api";

export const verifyIfOnuExists = async (props: propsApi) => {
    props.startLoading();
    const oltData = props.OltInfo.find(option => option.name === props.city ? props.city : '')!;

    await axios.post(`${import.meta.env.VITE_BASEURL_MANAGE_ONU}/searchONU`, {
        ip: oltData.host,
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