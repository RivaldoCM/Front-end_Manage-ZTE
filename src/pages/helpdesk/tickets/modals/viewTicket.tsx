import { Button, Modal, ModalClose } from "@mui/joy";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useResponse } from "../../../../hooks/useResponse";
import { ViewTicketStyle } from "../style";

export function ViewTicketModal(props: any){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    return(
        <Modal
            className="flex"
            open={props.open}
            onClose={props.handleClose}
        >
            <ViewTicketStyle>
                <header>
                    <p>ID: 02010001</p>
                    <p>CTO PARADO</p>
                    <ModalClose variant="outlined" />
                </header>
                <section>
                    <p>Aberto por: </p>
                    <p>Apropriado por: </p>
                    <p>localização: </p>
                    <p>Descrição: </p>
                </section>
                <footer>
                    FINALIZAR
                </footer>
            </ViewTicketStyle>
        </Modal>
    )
}
