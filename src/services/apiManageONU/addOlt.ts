import axios from "axios";
import { IOlt } from "../../interfaces/IOlt";

export async function addOlt(form: IOlt){
    // ISSO ACONTECE PQ TODO INPUT RETORNA STRING, E NESTE CASO PRECISA DE NUMBER
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/olt`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            data: form
        }
    }).then((response) => {
        return response.data;
    }).catch((err) =>{
        return err;
    });

    return res;
}
