import React from "react";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { InputContainer } from "../../styles/global";

export function Form({ 
    handleSubmitWriteData, 
    handlePppoeChange, 
    handleContractNumberChange, 
    isLoading, 
    item, 
    serialNumber, 
    setDataOnu,
    handlePppoePassChange,
    handleWifiSSIDChange,
    handleWifiPassChange }){

        if(item[2].includes('F670L') || item[2].includes('F6600') || item[2].includes('F680')){
            return(
                <form onSubmit={handleSubmitWriteData} className="flex">
                    <InputContainer>
                        <div className="text">
                            <p>Usuário PPPoE: </p>
                        </div>
                        <div className="content">
                            <TextField  
                                variant="standard" 
                                required
                                onChange={handlePppoeChange}>
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
                                onChange={handlePppoePassChange}>
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
                                onChange={handleContractNumberChange}>
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
                                onChange={handleWifiSSIDChange}>
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
                                onChange={handleWifiPassChange}>
                            </TextField>
                        </div>
                    </InputContainer>
                    {
                        (isLoading && item[3] === serialNumber ?
                            <CircularProgress className="MUI-CircularProgress" color="primary"/>
                        :
                            <div className="flex">
                                <Button 
                                    type="submit" 
                                    variant="outlined" 
                                    endIcon={<AddOutlinedIcon />}
                                    onClick={() => {
                                        setDataOnu([item[0], item[1], item[2], item[3]]);
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
                <form onSubmit={handleSubmitWriteData} className="flex">
                    <InputContainer>
                        <div className="text">
                            <p>PPPoE do cliente: </p>
                        </div>
                        <div className="content">
                            <TextField  variant="standard" onChange={handlePppoeChange}></TextField>
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
                                onChange={handleContractNumberChange}>
                            </TextField>
                        </div>
                    </InputContainer>
                    {
                        (isLoading && item[3] === serialNumber ?
                            <CircularProgress className="MUI-CircularProgress" color="primary"/>
                        :
                            <div className="flex">
                                <Button 
                                    type="submit" 
                                    variant="outlined" 
                                    endIcon={<AddOutlinedIcon />}
                                    onClick={() => {
                                        setDataOnu([item[0], item[1], item[2], item[3]]);
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