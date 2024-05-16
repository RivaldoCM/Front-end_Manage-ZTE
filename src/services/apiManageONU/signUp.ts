import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function signUp({ userName, email, accessLevel, password }: {userName: string, email: string, accessLevel: number, password: string}): Promise<IResponseData | IResponseError>{
    console.log(userName, email, accessLevel, password)
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/users`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data:{
            name: userName,
            email: email,
            rule: accessLevel,
            password: password
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });
    return res;
}
