import React, { useState } from "react";

import { Modal } from "@mui/material";
import { QRCodeScanner } from "../../../../components/qrCodeScanner";

import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Input from '@mui/joy/Input';
import { Controller, QRCodeResult } from "../style";

export function ModalQRCodeViwer(props: any){
    const [qrCode, setQRCode] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(true);

    const handleScanSuccess = (decodedText: string) => {
        setQRCode(decodedText);
        setIsScanning(false);
    };

    const handleScanError = (_error: string) => {};

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

                                <form className="flex" action="">
                                    <div>
                                        <Input 
                                            size="sm" 
                                            type="number" 
                                            placeholder="N° CTO" 
                                            sx={{margin: '.5rem 0'}}
                                        />
                                        <Input type="number" placeholder="N° Porta CTO" size="sm"/>
                                    </div>
                                    <ButtonGroup variant="soft" color="primary">
                                        <Button>Salvar</Button>
                                        <Button onClick={props.handleClose}>Fechar</Button>
                                    </ButtonGroup>
                                </form>
                            </QRCodeResult>
                        )
                    }
                </Controller>
            </Modal>
        </React.Fragment>
    )
}