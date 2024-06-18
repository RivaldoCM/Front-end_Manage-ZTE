import axios from "axios";

export const verifyIfOnuExists = async ({matchSerialNumber, cityId}: {matchSerialNumber: string, cityId: number}) => {
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/findOnu`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data: {
            serialNumber: matchSerialNumber,
            cityId: cityId
        }
    }).then(response => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return res;
}