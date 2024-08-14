import axios from "axios";

export async function addClient({token, name, email}: {token: string, name: string, email: string}){
    const res = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_EXITLAG_URL}/user/register`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: [{
            firstName: name,
            email: email.toLocaleLowerCase(),
            confirmEmail: email.toLocaleLowerCase(),
            contractId: 179,
        }]
    }).then((response) => {
        return {
            success: true,
            data: response.data
        }
    }).catch(async (error) => {
        if(error.response && error.response.data.error==='Unauthorized'){
            return {success: false, data: null}
        }
        return null;
    });
    return res;
}