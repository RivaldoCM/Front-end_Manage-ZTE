import axios from "axios";

import { propsApi } from "../../interfaces/api";

export const verifyIfOnuExists = async (props: propsApi) => {
    props.startLoading();

    type olt = { ip: string[], accessPointId: number } | undefined 

    let dataOlt: olt = {ip: [], accessPointId: 0};
    if(props.typeOnu === 'zte'){
        const oltData = props.OltInfo.find(option => option.name === props.city ? props.city : '')!;
        dataOlt?.ip.push(oltData.host)
        dataOlt.accessPointId = oltData.voalleAccessPointId;
    }else{
        props.OltInfo.map((subArray) => {
            return subArray.map((option: any) => {
                const verifyCity = option.name
                if(props.city === 'TOMBOS'){
                    if(option.city_id === 22){
                        const ip = option.host;
                        const accessPoint = option.voalleAccessPointId;
                        dataOlt.ip.push(ip);
                        dataOlt.accessPointId = accessPoint;
                    }
                }else if(verifyCity === props.city){
                    const ip = option.host;
                    const accessPoint = option.voalleAccessPointId;
                    dataOlt.ip.push(ip);
                    dataOlt.accessPointId = accessPoint;
                }
            });
        })
    }

    await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/findOnu`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            ip: dataOlt?.ip,
            serialNumber: props.matchSerialNumber,
            modelOlt: props.typeOnu
        }
    }).then(response => {
        if(typeof(response.data) === 'string'){
            props.stopLoading();
            props.handleError(response.data);
            //RETORNA ONU NAO ENCONTRADA
            return;
        }
        response.data[0].push(dataOlt?.accessPointId)
        //console.log(response.data)
        props.stopLoading();
        props.setDataFromApi(response.data);
    })
    .catch(error => {
        //SÓ ENTRA AQUI SE A CONEXÃO CAIR NO MEIO DA EXECUÇÃO DE TAREFAS
        props.stopLoading();
        props.handleError(error.code);
    });
}