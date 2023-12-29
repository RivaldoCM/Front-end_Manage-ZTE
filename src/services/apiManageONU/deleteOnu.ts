import axios from "axios";

export async function deleteOnu(dataOlt): Promise<boolean>{
    const data = await axios({
        method: 'delete',
        url: 'http://localhost:4000/deleteOnu',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: { 
            dataOlt
        },
    }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return data;
}