import axios from "axios";

export const getToken = async () => {
    await axios.post('http://localhost:4000/getDataClient', {
        peopleID: '134473'
    })

    .then(response => {
        console.log(response.data)
    })
}