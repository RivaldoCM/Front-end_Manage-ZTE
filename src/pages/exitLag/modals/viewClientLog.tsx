import { useEffect, useState } from "react";

import { Modal } from "@mui/material";

import { ViewLogsClient } from "../style";


export function viewClientLog(props: any){

    const [client, setClient] = useState([]);

    useEffect(() => {

    }, []);

    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
          <ViewLogsClient>

          </ViewLogsClient>
        </Modal>
    )
}