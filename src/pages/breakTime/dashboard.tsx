import { Button, IconButton } from "@mui/material";
import { formatTimeInSeconds } from "../../config/formatDate";
import { useBreakTime } from "../../hooks/useBreakTime";
import { CardBreakTime, CardTypes, Dashboard } from "./style";
import { Timer } from "./timer";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export function BreakTimeDashboard(){
    const { breakTimes, breakTypes } = useBreakTime();

    return(
        <Dashboard className="flex">
            <div className="section-controller flex">
                <section className="flex">
                    <p><b>Tipos de Pausa</b></p>
                    <div className="add-button flex">
                        <Button variant="contained" endIcon={<AddOutlinedIcon />}>
                            Adicionar Pausa
                        </Button>
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
                                                <IconButton aria-label="add" color="primary">
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                            </div>
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
                        oiii historico
                </section>
            </div>
            
            <aside className="flex">
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
            </aside>
        </Dashboard>
    )
}