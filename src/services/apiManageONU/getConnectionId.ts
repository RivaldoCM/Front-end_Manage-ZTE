import axios from "axios";

export async function getConnectionId(peopleId: any, pppoe: string): Promise<any>{
    const connectionId = await axios.post(`http://localhost:4000/getConnectionId`, {
        peopleId: peopleId,
        pppoe: pppoe
    })
    .then(response => {
        console.log(response)
        return response.data;
    });

    return connectionId;
}