import { FormProps } from "../../interfaces/Form";

import { cleanUpModelName, typePppoeZte } from "../../config/typesOnus";

import { InputContainer } from "../../styles/globalStyles";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useAuthOnu } from "../../hooks/useAuthOnu";

export function Form(props: FormProps){
    const { authOnu, setAuthOnu, onus } = useAuthOnu();

    console.log(onus)

    if(props.typeOnu === 'parks'){
        if (Array.isArray(props.item)){
            const [ pon, signal, serial, ip, accessPoint ] = props.item;
            return(
                <form onSubmit={props.handleSubmitWriteData} className="flex">
                    <InputContainer>
                        <div className="text">
                            <p>PPPoE do cliente: </p>
                        </div>
                        <div className="content">
                            <TextField  variant="standard" onChange={props.handlePppoeChange}></TextField>
                        </div>
                    </InputContainer>
                    <InputContainer>
                        <div className="text">
                            <p>CPF do Cliente: </p>
                        </div>
                        <div className="content">
                            <TextField
                                variant="standard" 
                                required
                                onChange={props.handleCpfChange}>
                            </TextField>
                        </div>
                    </InputContainer>
                    {
                        (props.isLoading ?
                            <CircularProgress className="MUI-CircularProgress" color="primary"/>
                        :
                            <div className="flex">
                                <Button
                                    type="submit" 
                                    variant="outlined" 
                                    endIcon={<AddOutlinedIcon />}
                                    onClick={() => {
                                        props.setDataOnu({
                                            placa: 1,
                                            pon: pon,
                                            serial: serial,
                                            model: 'parks',
                                            signal: signal,
                                            ip: ip,
                                            accessPoint: accessPoint
                                        });
                                    }}
                                >
                                    Provisionar
                                </Button>
                            </div>
                        )
                    }
                </form>
            )
        }
    }else{
        if (Array.isArray(props.item)) {
            const [ placa, pon, modelOnu, serial, accessPoint ] = props.item;
            const model = cleanUpModelName(modelOnu);

            if(model && typePppoeZte.includes(model)){
                return(
                    <form onSubmit={props.handleSubmitWriteData} className="flex">
                        <InputContainer>
                            <div className="text">
                                <p>Usuário PPPoE: </p>
                            </div>
                            <div className="content">
                                <TextField  
                                    variant="standard" 
                                    required
                                    onChange={props.handlePppoeChange}>
                                </TextField>
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Senha PPPoE: </p>
                            </div>
                            <div className="content">
                                <TextField 
                                    variant="standard" 
                                    required
                                    onChange={props.handlePppoePassChange}>
                                </TextField>
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>CPF do Cliente: </p>
                            </div>
                            <div className="content">
                                <TextField
                                    variant="standard" 
                                    required
                                    onChange={props.handleCpfChange}>
                                </TextField>
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Nome do Wifi:</p>
                            </div>
                            <div className="content">
                                <TextField 
                                    variant="standard"
                                    required
                                    onChange={props.handleWifiSSIDChange}>
                                </TextField>
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Senha do Wifi:</p>
                            </div>
                            <div className="content">
                                <TextField 
                                    variant="standard"
                                    required
                                    onChange={props.handleWifiPassChange}>
                                </TextField>
                            </div>
                        </InputContainer>
                        {
                            (props.isLoading && serial === props.serialNumber ?
                                <CircularProgress className="MUI-CircularProgress" color="primary"/>
                            :
                                <div className="flex">
                                    <Button 
                                        type="submit" 
                                        variant="outlined" 
                                        endIcon={<AddOutlinedIcon />}
                                        onClick={() => {
                                            props.setDataOnu({
                                                placa: placa,
                                                pon: pon,
                                                model: model,
                                                serial: serial,
                                                accessPoint: accessPoint
                                            });
                                        }}
                                    >
                                        Provisionar
                                    </Button>
                                </div>
                            )
                        }
                    </form>
                )
            }else{
                return(
                    <form onSubmit={props.handleSubmitWriteData} className="flex">
                        <InputContainer>
                            <div className="text">
                                <p>PPPoE do cliente: </p>
                            </div>
                            <div className="content">
                                <TextField  variant="standard" onChange={props.handlePppoeChange}></TextField>
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>CPF do Cliente: </p>
                            </div>
                            <div className="content">
                                <TextField 
                                    variant="standard" 
                                    onChange={props.handleCpfChange}>
                                </TextField>
                            </div>
                        </InputContainer>
                        {
                            (props.isLoading && serial === props.serialNumber ?
                                <CircularProgress className="MUI-CircularProgress" color="primary"/>
                            :
                                <div className="flex">
                                    <Button
                                        type="submit" 
                                        variant="outlined" 
                                        endIcon={<AddOutlinedIcon />}
                                        onClick={() => {
                                            props.setDataOnu({
                                                placa: placa,
                                                pon: pon,
                                                model: model,
                                                serial: serial,
                                                accessPoint: accessPoint
                                            });
                                        }}
                                    >
                                        Provisionar
                                    </Button>
                                </div>
                            )
                        }
                    </form>
                )
            }
        }
    }
}