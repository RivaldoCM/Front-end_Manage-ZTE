import axios from "axios";
import { IOltProps } from "../../interfaces/IOltProps";

export async function editOlt(form: IOltProps){

    const res = await axios({
        method: 'put',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/olt`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            dataOlt: form
        }
    }).then((response) => {
        return response.data;
    }).catch((err) =>{
        return err;
    });

    return res;
}
