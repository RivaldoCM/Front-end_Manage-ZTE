import axios from "axios";

export async function updatePassword({id, password}: {id: number, password: string}){
    const res = await axios({
        method: 'put',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/users`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            id: id,
            password: password
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return res;
}
