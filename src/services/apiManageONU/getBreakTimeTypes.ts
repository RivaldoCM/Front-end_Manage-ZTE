import axios from "axios";

export async function getBreakTimeTypes(){
    const res = await axios({
        method: 'GET',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/breakTimeTypes`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
    }).then((response) => {
        return response.data;
    }).catch((err) =>{
        return err;
    });
    return res;
}
