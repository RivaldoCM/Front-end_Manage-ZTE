import axios from "axios";

export async function getBreakTime(isRunning: Boolean){
    const res = await axios({
        method: 'GET',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/breakTime`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        params: {
            isRunning: isRunning
        }
    }).then((response) => {
        return response.data;
    }).catch((err) =>{
        return err;
    });

    return res;
}
