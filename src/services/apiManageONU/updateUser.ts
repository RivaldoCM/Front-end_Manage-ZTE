import axios from "axios";

export async function updateUser({id, userName, email, accessLevel, status}: any){
    const res = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/users`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            id: id,
            name: userName,
            email: email,
            rule: accessLevel,
            status: status,
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return res;
}
