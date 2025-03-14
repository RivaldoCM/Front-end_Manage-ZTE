import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useBreakTime } from "../../hooks/useBreakTime";
import { useResponse } from "../../hooks/useResponse";
import { getBreakTime } from "../../services/apiManageONU/getBreakTime";
import { addBreakTimeTypes } from "../../services/apiManageONU/addBreakTimeTypes";
import { deleteBreakTimeTypes } from "../../services/apiManageONU/deleteBreakTypes";
import { isNumeric } from "../../config/regex";
import { formatDateToISOFormat, formatTimeInSeconds } from "../../config/formatDate";
import { Timer } from "./timer";
import { AddBreakType, CardBreakTime, CardTypes, Dashboard } from "./style";
import { IconButton, Modal, TextField } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useAuth } from "../../hooks/useAuth";

export function BreakTimeDashboard(){
    const { user } = useAuth();
    const { breakTimes, breakTypes } = useBreakTime();
    const { setFetchResponseMessage } = useResponse();

    const [open, setOpen] = useState(false);
    const [breaksHistoric, setBreakHistoric] = useState<IBreaktime[]>([]);
    const [form, setForm] = useState({
        name: '',
        duration: ''
    });

    useEffect(() => {
        setTimeout(() => {
            const getData = async () => {
                const getHistoric = await getBreakTime(false, formatDateToISOFormat(dayjs().format('DD-MM-YYYY'), false));
                if(getHistoric.success){
                    setBreakHistoric(getHistoric.responses.response);
                }
            }
            getData();
        }, 2000);
    }, []);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleDeleteType = async (id: number) => {
        const response = await deleteBreakTimeTypes({id: id, rule: user!.rule});

        if(response){
            if(!response.success){
                setFetchResponseMessage(response.messages.message);
            }
        } else {
            setFetchResponseMessage('error/internal-issue');
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!form.duration.match(isNumeric)){
            setFetchResponseMessage('error/invalid-input');
        } else {
            const response = await addBreakTimeTypes({name: form.name, duration: parseInt(form.duration), rule: user!.rule});
            if(response){
                if(response.success){
                    handleClose();
                } else {
                    setFetchResponseMessage(response.messages.message);
                }
            } else {
                setFetchResponseMessage('error/internal-issue');
            }
        }
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
                        <AddBreakType className="flex" onSubmit={handleSubmit}>
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
                                <IconButton type="submit" color="success">
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
                                <CardTypes key={type.id} className="flex">
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
                                            <IconButton onClick={() => handleDeleteType(type.id)} aria-label="add" sx={{ color: '#e64040' }}>
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
                <p><b>Pausas realizadas hoje</b></p>
                {
                    breaksHistoric && breaksHistoric.reverse().map((breaksHistoric) => {
                        return(
                            <CardBreakTime className="flex" key={breaksHistoric.id}>
                                <div className="flex">
                                    <div>
                                        <p><b>Nome: </b>{breaksHistoric.User.name}</p>
                                    </div>
                                    <div>
                                        <p><b>Pausa: </b>{breaksHistoric.break_Time_Types.name}</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    Restante: {(breaksHistoric.secondsLeft / 60).toFixed(2) + ' min'}
                                </div>
                            </CardBreakTime>  
                        )
                    })
                }
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