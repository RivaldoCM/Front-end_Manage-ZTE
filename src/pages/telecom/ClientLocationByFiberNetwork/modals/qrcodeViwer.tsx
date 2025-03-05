import React, { useEffect, useState } from "react";

import { ListItem, Modal } from "@mui/material";
import { QRCodeScanner } from "../../../../components/qrCodeScanner";

import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Input from '@mui/joy/Input';
import { Controller, QRCodeResult } from "../style";
import { useAuth } from "../../../../hooks/useAuth";
import { addClientUpdate } from "../../../../services/apiManageONU/addClientUpdate";
import { useResponse } from "../../../../hooks/useResponse";
import { Autocomplete } from "@mui/joy";
import { ICities } from "../../../../interfaces/ICities";
import { getCities } from "../../../../services/apiManageONU/getCities";

export function ModalQRCodeViwer(props: any){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [open, setOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [cities, setCities] = useState<ICities[]>([]);
    const [qrCode, setQRCode] = useState<string | null>(null);
    const [form, setForm] = useState({
        userId: user?.uid,
        pppoe: '',
        cityId: '' as number | '' | null,
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

    const handleOpen = () => {
        setOpen(true);
        (async () => {

            (async () => {
                const response = await getCities();
                
                if(response){
                    if(response.success){
                        setCities(response.responses.response);
                    }
                } else {
                    setFetchResponseMessage('error/no-connection-with-API');
                }

            })();

          setCities(cities);
        })();
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const loadingCities = open && cities.length === 0;
    useEffect(() => {
        let active = true;
        if (!loadingCities) {
            return undefined;
        }

        (async () => {
            const response = await getCities();
            if (active) {
                if(response){
                    if(response.success){
                        setCities(response.responses.response);
                    }
                } else {
                    setFetchResponseMessage('error/no-connection-with-API');
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingCities]);

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

    const handleCityChange = (_e: unknown, value: ICities | null) => {
        if(value){
            setForm({
                ...form,
                cityId: value.id
            });
        }else{
            setForm({
                ...form,
                cityId: value
            });
        }
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
                sx={{ zIndex: 0 }}
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
                                        <Autocomplete
                                            required
                                            open={open}
                                            sx={{ width: 300 }}
                                            placeholder="Cidade"
                                            onOpen={handleOpen}
                                            onClose={handleClose}
                                            onChange={handleCityChange}
                                            isOptionEqualToValue={(option, value) => option.id === value.id}
                                            getOptionLabel={(option) => option.name}
                                            options={cities}
                                            loading={loadingCities}
                                            renderOption={(props, option) => (
                                                <ListItem 
                                                    {...props}
                                                    sx={{
                                                        padding: '8px 16px',
                                                        marginBottom: '4px',
                                                        '&:hover': {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                                        },
                                                    }}
                                                >
                                                    {option.name}
                                                </ListItem> // renderiza as opções personalizadas
                                            )}
                                        />
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