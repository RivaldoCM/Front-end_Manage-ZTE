import React, { useEffect, useState } from "react";

import { Modal } from "@mui/material";
import { QRCodeScanner } from "../../../../components/qrCodeScanner";

import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Input from '@mui/joy/Input';
import { Controller, QRCodeResult } from "../style";
import { useAuth } from "../../../../hooks/useAuth";
import { addClientUpdate } from "../../../../services/apiManageONU/addClientUpdate";

export function ModalQRCodeViwer(props: any){
    const { user } = useAuth();

    const [isScanning, setIsScanning] = useState(false);
    const [qrCode, setQRCode] = useState<string | null>('G FHTT11002AB8 NULL fiberhome ---- 0.00 -11.20');
    const [form, setForm] = useState({
        userId: user?.uid,
        pppoe: '',
        ctoId: 0,
        portId: 0,
        serialNumber: '',
        oltPower: '',
        onuPower: ''
    });

    useEffect(() => {
        const slittedText = qrCode!.split(' ');
        setForm({
            ...form,
            serialNumber: slittedText[1],
            pppoe: slittedText[4],
            oltPower: slittedText[5],
            onuPower: slittedText[6],
        });
    }, [qrCode && qrCode?.length > 0]);

    console.log(form)

    const handleScanError = (_error: string) => {};
    const handleScanSuccess = (decodedText: string) => {
        setQRCode(decodedText);
        setIsScanning(false);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await addClientUpdate(form);

    }

    console.log(form)

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
                                <form className="flex" onSubmit={handleSubmit}>
                                    <div>
                                        <Input
                                            size="sm"
                                            name="ctoId"
                                            type="number"
                                            placeholder="N° CTO"
                                            sx={{margin: '.5rem 0'}}
                                            onChange={handleFormChange}
                                        />
                                        <Input
                                            size="sm"
                                            name="portId"
                                            type="number"
                                            placeholder="N° Porta CTO"
                                            onChange={handleFormChange}
                                        />
                                    </div>
                                    <ButtonGroup variant="soft" color="primary">
                                        <Button type="submit">Salvar</Button>
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