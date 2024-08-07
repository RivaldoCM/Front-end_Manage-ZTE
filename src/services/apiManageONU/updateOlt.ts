import axios from "axios";
import { IOltProps } from "../../interfaces/IOlt.js";

export async function updateOlt(form: IOltProps, vlans: IVlans[]){
    const res = await axios({
        method: 'put',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/olt`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            dataOlt: form,
            vlansOlt: vlans
        }
    }).then((response) => {
        return response.data;
    }).catch(() =>{
        return null;
    });

    return res;
}
