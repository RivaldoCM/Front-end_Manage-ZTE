import axios from "axios";

export async function addOlt(form){
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/olt`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            newOlt: form
        }
    }).then((response) => {
        return response;
    }).catch((err) =>{
        return err;
    });

    return res;
}
