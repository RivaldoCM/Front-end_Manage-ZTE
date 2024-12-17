import React, { useState } from "react";

import { Modal } from "@mui/material";
import { Controller, QRCodeResult } from "./style";
import { QRCodeScanner } from ".";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


export function ModalQRCodeViwer(props: any){
    const [qrCode, setQRCode] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(true);

    const handleScanSuccess = (decodedText: string) => {
        setQRCode(decodedText);
        console.log(decodedText)
        setIsScanning(false);
    };

    const handleScanError = (error: any) => {
        console.error("Erro ao ler QR Code:", error);
    };

    return(
        <React.Fragment>
            <Modal
                open={true}
                onClose={props.handleClose}
            >
                <Controller className="flex">
                    {
                        isScanning && (
                            <QRCodeScanner
                                handleClose={props.handleClose}
                                onScanSuccess={handleScanSuccess} 
                                onScanError={handleScanError} 
                            />
                        )
                    }
                    {
                        !isScanning && (
                            <QRCodeResult className="flex">
                                <h1>Resultado:</h1>
                                <div>
                                    <p>{qrCode}</p>
                                </div>
                                <ButtonGroup variant="contained">
                                    <Button>Salvar</Button>
                                    <Button onClick={props.handleClose}>Fechar</Button>
                                </ButtonGroup>
                            </QRCodeResult>
                        )
                    }
                </Controller>
            </Modal>
        </React.Fragment>
    )
}