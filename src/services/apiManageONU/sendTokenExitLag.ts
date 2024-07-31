import axios from "axios";
export async function sendToken(token:string){
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/exitLag`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            token:token
        }
    }).then((response) => {
        console.log(response);
        return response.data.token;
    }).catch(() =>{
        return null;
    });
    return res;
}

