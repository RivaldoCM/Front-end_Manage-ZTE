import axios from "axios";
import { IOlt } from "../../interfaces/IOlt";

export async function addOlt(form: IOlt, vlans: IVlans[]){
    
    const res = await axios({
        method: 'post',
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
    }).catch((err) =>{
        return err;
    });

    return res;
}
