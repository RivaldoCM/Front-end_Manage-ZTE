import axios from "axios";
import { IOlt } from "../../interfaces/IOlt.js";

export async function updateOlt(form: IOlt, vlans: IVlans[]){
    const res = await axios({
        method: 'put',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/olt`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            data: form,
            vlans: vlans
        }
    }).then((response) => {
        return response.data;
    }).catch(() =>{
        return null;
    });

    return res;
}
