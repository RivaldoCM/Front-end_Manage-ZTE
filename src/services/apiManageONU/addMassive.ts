import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function addMassive(props: any): Promise<IResponseData | IResponseError>{
    const response = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/massive`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {
            failure_date: props.failureDateToISO,
            forecast_return: props.forecastDateToISO,
            status: true,
            type: props.problemType,
            city_id: props.cityId,
            city_name: props.city_name,
            affected_local: props.affectedLocals,
            description: props.description,
            created_by: props.user,
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return response;
}