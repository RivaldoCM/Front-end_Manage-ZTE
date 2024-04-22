import axios from "axios";

export async function updateBreakTime(id: number | undefined, secondsLeft: number | null){
    const response = await axios({
        method: 'PATCH',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/breakTime`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data:{
            id: id,
            isActive: false,
            secondsLeft: secondsLeft
        }
    }).then(res => {
        return res.data;
    }).catch(() => {
        return null;
    });

    return response;
}
