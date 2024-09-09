import axios from "axios";

export async function getVendors(mac:string): Promise<any>{
    const response = await axios({
        method: 'get',
        url: `https://api.macvendors.com/${mac}`,
                headers: {
            'Content-Type': 'application/json',
        },
    }).then(response =>{ 
        return response.data;
    }).catch((err) => {
        return null;
    });
    return response;
}