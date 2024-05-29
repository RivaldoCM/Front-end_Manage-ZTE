import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function signIn({ email, password }: {email: string, password: string}): Promise<IResponseData | IResponseError>{
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
        console.log(err)
        return null;
    });
    return res;
}
