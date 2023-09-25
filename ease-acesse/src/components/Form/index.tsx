import { FormProps } from "../../interfaces/Form"

import { InputContainer } from "../../globalStyles";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export function Form(props: FormProps){
    if (Array.isArray(props.item)) {
        const [placa, pon, model, serial] = props.item;

        if(model && (model.includes('F670L') || model.includes('F6600') || model.includes('F680'))){
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
                            <p>N° Contrato:</p>
                        </div>
                        <div className="content">
                            <TextField
                                variant="standard" 
                                required
                                inputProps={{ inputMode: 'numeric' }}
                                onChange={props.handleContractNumberChange}>
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
                                        props.setDataOnu([{
                                            placa: placa,
                                            pon: pon,
                                            model: model,
                                            serial: serial,
                                        }]);
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
                            <p>Número do contrato: </p>
                        </div>
                        <div className="content">
                            <TextField 
                                variant="standard" 
                                inputProps={{ inputMode: 'numeric' }}
                                onChange={props.handleContractNumberChange}>
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
                                        props.setDataOnu([{
                                            placa: placa,
                                            pon: pon,
                                            model: model,
                                            serial: serial,
                                        }]);
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