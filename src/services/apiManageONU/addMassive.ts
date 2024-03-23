import axios from "axios";
import { formatDateToISOFormat } from "../../config/formatDate";
import dayjs from "dayjs";

export async function addMassive(data: any){

    console.log(data.forecastDateToISO)

    /*
    const response = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/massive`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {

        }
    }).then(() => {

    }).catch((err) => {

    });
    */
}