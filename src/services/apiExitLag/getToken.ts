import axios from "axios";

export async function getToken(){
    const res = await axios({
        method: 'post',
        url: `https://stg-providers-api.exitlag.net/auth/login`,
        data:{
            username: 'acessenet_api@acesse.net',
            password: 'p^=X[@z!#G|q',
        }
    }).then((response) => {
        return response.data.token;
    }).catch(() =>{
        return null;
    });
    return res;
}

