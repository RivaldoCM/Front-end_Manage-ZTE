import axios from "axios";

export async function updateWifi({onu, form}: any) {
    console.log(onu, form);
    const res = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/updateWifi`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            oltId: onu.oltId,
            slot: parseInt(onu.slot),
            pon: parseInt(onu.pon),
            onuId: parseInt(onu.id),
            wifi28: form.wifi28,
            wifi58: form.wifi58,
            password24: form.password24,
            passwork58: form.passwork58,
            wifiBS: form.wifiBS,
            passwordBS: form.passwordBS,
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return res;
}
