import axios from "axios";

import { propsApi } from "../../interfaces/api";

export const verifyIfOnuExists = async (props: propsApi) => {
    props.startLoading();

    let dataOlt = [];
    if(props.typeOnu === 'zte'){
        const oltData = props.OltInfo.find(option => option.name === props.city ? props.city : '')!;
        dataOlt.push(oltData.host);
    }else{
        props.OltInfo.map((subArray) => {
            return subArray.map((option: any) => {
                const verifyCity = option.name
                if(props.city === 'TOMBOS'){
                    if(option.city_id === 22){
                        dataOlt.push(option.host) 
                    }
                }else if(verifyCity === props.city){
                    const ip = option.host
                    dataOlt.push(ip);
                }
            });
        })
    }

    await axios.post(`http://localhost:4000/searchONU`, {
        ip: dataOlt,
        serialNumber: props.matchSerialNumber,
        modelOlt: props.typeOnu
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