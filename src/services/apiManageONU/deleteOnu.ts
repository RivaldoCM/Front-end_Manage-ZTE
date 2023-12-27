import axios from "axios";

export async function deleteOnu(city, serialNumber, type): Promise<boolean>{
    const data = await axios({
        method: 'post',
        url: 'http://localhost:4000/deleteOnu',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {
            city, 
            serialNumber, 
            type
        },
    }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return data;
}