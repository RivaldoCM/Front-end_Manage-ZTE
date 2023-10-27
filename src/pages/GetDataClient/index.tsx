import React from "react";

import { getToken } from "../../services/apiVoalle/apiVoalleThirdParty";

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await getToken();
}

export function GetDataClient(){
    return(
        <form onSubmit={handleSubmit}>
            <button>clique aqui</button>
        </form>
    )
}