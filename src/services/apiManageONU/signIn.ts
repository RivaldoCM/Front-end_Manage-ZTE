import axios from "axios";

export async function signIn({ email, password }){
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/login`,
        data:{
            email: email,
            password: password
        }
    }).then((response) => {
        return response.data;
    }).catch((err) =>{
        return err;
    });

    return res;
}
