import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function signUp({ userName, email, accessLevel, password }: {userName: string, email: string, accessLevel: number, password: string}): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/createUser`,
        data:{
            userName: userName,
            email: email,
            accessLevel: accessLevel,
            password: password
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });
    return res;
}
