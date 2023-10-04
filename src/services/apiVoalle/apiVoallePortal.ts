import axios from "axios";

export const getToken = async () => {
    await axios.get(`http://api.acesse.net.br/portal_authentication?`, {
        params:{
            verify_token: 'TWpNMU9EYzVaakk1T0dSaU1USmxaalprWldFd00ySTFZV1JsTTJRMFptUT06V2tkS2JHSllRWGROUkUwMVRuYzlQUT09OlpUaGtNak0xWWprMFl6bGlORE5tWkRnM01EbGtNalkyWXpBeE1HTTNNR1U9',
            client_id: '9_4qqfdftepfcw0oc0gs4kcgswoks4k0ksggksckwkgocgckg4cg',
            client_secret: '3xmnp6ao70yssww0kcggg4okoc4oo0cgs4gkkcgc8ook8ko0sg',
            grant_type: 'client_credentials',
            username: '12748829662',
            password: '12748829662',
        }
    })
    .then(response => {
        console.log(response.data)
    })
}