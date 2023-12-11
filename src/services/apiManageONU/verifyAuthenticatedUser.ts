import axios from "axios";

export async function verifyUserAuth(): Promise<boolean>{
    const userAuth = await axios({
        method: 'post',
        url: 'http://localhost:4000/verifyJWT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {},
    }).then(() => {
        return true;
    }).catch(() => {
        return false;
    });

    return userAuth;
}