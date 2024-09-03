import axios from "axios";

export async function getVendors(mac:string): Promise<any>{
    const response = await axios({
        method: 'get',
        url: `https://allorigins.win/get?url=${encodeURIComponent(`https://api.macvendors.com/${mac}`)}`,
                headers: {
            'Content-Type': 'application/json',
        },
    }).then(response =>{ 
        console.log(response)
        return response.data.response;
    }).catch(() => {
        return null;
    });
    return response;
}