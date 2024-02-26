import axios from "axios";
import { IOlt } from "../../interfaces/IOlt.js";

export async function editOlt(form: IOlt){
    form.voalleAccessPointId = form.voalleAccessPointId * 1
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
