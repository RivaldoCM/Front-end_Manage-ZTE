import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import { formatTimeInSeconds } from "../../config/formatDate";
import { useBreakTime } from "../../hooks/useBreakTime";
import { AddBreakType, CardBreakTime, CardTypes, Dashboard } from "./style";
import { Timer } from "./timer";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useState } from "react";


export function BreakTimeDashboard(){
    const { breakTimes, breakTypes } = useBreakTime();

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: '',
        duration: 0
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {

    }

    return(
        <Dashboard className="flex">
            <section>
                <p><b>Tipos de Pausa</b></p>
                <div className="add-button flex">
                    <IconButton aria-label="add" onClick={handleOpen} color="primary">
                            <AddOutlinedIcon />
                    </IconButton>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                            <AddBreakType className="flex">
                                <p><b>Adicionar Pausa</b></p>
                                <div>
                                    <TextField 
                                        required 
                                        name="name"
                                        variant="outlined" 
                                        label="Nome da Pausa" 
                                        onChange={(e) => handleChange(e)}
                                        value={form.name}
                                    />
                                </div>
                                <div>
                                    <TextField 
                                        required
                                        name="duration"
                                        variant="outlined"
                                        label="Duração em minutos" 
                                        onChange={(e) => handleChange(e)}
                                        value={form.duration}
                                    />
                                </div>
                                <div className="flex">
                                    <IconButton aria-label="delete" color="success">
                                        <CheckOutlinedIcon />
                                    </IconButton>
                                    <IconButton onClick={handleClose} color="error">
                                        <CloseOutlinedIcon />
                                    </IconButton>
                                </div>
                            </AddBreakType>
                    </Modal>
                </div>
                <div className="card-controller flex">
                    {
                        breakTypes && breakTypes.map((type) => {
                            return(
                                <CardTypes key={type.id}>
                                    <div className="flex">
                                        <div>
                                            <p><b>Tipo:</b> {type.name}</p>
                                        </div>
                                        <div>
                                            <p><b>Duração:</b> {type.duration + ' min'}</p> 
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <IconButton aria-label="add" sx={{ color: '#e64040' }}>
                                                <DeleteOutlinedIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                </CardTypes>    
                            )
                        })
                    }
                </div>
            </section>
            <section>
                <p><b>Pausas realizadas</b></p>
            </section>
            <section>
                <p><b>Agentes em Pausa</b></p>
                <div>
                    {
                        breakTimes && breakTimes.map((breakTime) => {
                            return(
                                <CardBreakTime className="flex" key={breakTime.User.id}>
                                    <div className="flex">
                                        <div>
                                            <p><b>Nome: </b>{breakTime.User.name}</p>
                                        </div>
                                        <div>
                                            <p><b>Pausa: </b>{breakTime.break_Time_Types.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <Timer
                                                dataUserInBrakTime={{
                                                    startAt: formatTimeInSeconds(breakTime.created_at), 
                                                    duration: breakTime.break_Time_Types.duration,
                                                }} 
                                                isBackDrop={false}
                                            />
                                        </div>
                                    </div>
                                </CardBreakTime>
                            )
                        })
                    }
                </div>
            </section>
        </Dashboard>
    )
}