import React, { useEffect, useState } from "react";

import { Modal } from "@mui/material";
import { QRCodeScanner } from "../../../../components/qrCodeScanner";

import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Input from '@mui/joy/Input';
import { Controller, QRCodeResult } from "../style";
import { useAuth } from "../../../../hooks/useAuth";
import { addClientUpdate } from "../../../../services/apiManageONU/addClientUpdate";
import { useResponse } from "../../../../hooks/useResponse";

export function ModalQRCodeViwer(props: any){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [isScanning, setIsScanning] = useState(true);
    const [qrCode, setQRCode] = useState<string | null>(null);
    const [form, setForm] = useState({
        userId: user?.uid,
        pppoe: '',
        ctoId: 0,
        portId: 0,
        serialNumber: '',
        oltPower: '',
        ontPower: ''
    });

    useEffect(() => {
        if(qrCode !== null){
            const splittedText = qrCode!.split('\n');
            setForm({
                ...form,
                serialNumber: splittedText[1],
                pppoe: splittedText[4],
                oltPower: splittedText[5],
                ontPower: splittedText[6],
            });
        }
    }, [qrCode]);

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
        if(response){
            if(response.success){
                setFetchResponseMessage('success/data-created');
                setIsScanning(false);
                props.handleClose();
            } else {
                setFetchResponseMessage('error/data-not-created');
            }
        } else {
            setFetchResponseMessage('error/data-not-created');
        }
    }

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
                                            required
                                        />
                                        <Input
                                            size="sm"
                                            name="portId"
                                            type="number"
                                            placeholder="N° Porta CTO"
                                            onChange={handleFormChange}
                                            required
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