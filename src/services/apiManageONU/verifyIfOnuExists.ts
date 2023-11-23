import axios from "axios";

import { propsApi } from "../../interfaces/api";

export const verifyIfOnuExists = async (props: propsApi) => {
    props.startLoading();

    let data;
    if(props.typeOnu === 'zte'){
        const oltData = props.OltInfo.find(option => option.name === props.city ? props.city : '')!;
        data = oltData
    }else{
        props.OltInfo.map((subArray) => {
            return subArray.map((data) => {
                const verifyCity = data.name
                const ip = data.host
                if(verifyCity === props.city){
                    data = {host: ip}
                }
            });
        })
    }


    await axios.post(`http://localhost:4000/searchONU`, {
        ip: data.host,
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