import axios from "axios";

export async function updateMassive(props: any){
    console.log(props)
    const response = await axios({
        method: 'PUT',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/massive`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {
            id: props.massiveId,
            failure_date: props.failureDateToISO,
            forecast_return: props.forecastDateToISO,
            type: props.problemType,
            city_id: props.cityId,
            affected_local: props.affectedLocals,
            description: props.description,
            last_updated_by: props.user,
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return response;
}