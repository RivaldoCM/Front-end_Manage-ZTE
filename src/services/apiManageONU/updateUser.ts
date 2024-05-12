import axios from "axios";

export async function updateUser({id, name, rule, status, newPassword}: any){
    const res = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/getUsers`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            id: id,
            name: name,
            rule: rule,
            status: status,
            newPassword: newPassword
        }
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        return err;
    });

    return res;
}
