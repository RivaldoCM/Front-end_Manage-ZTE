import React, { useEffect, useState } from "react"
import { useSocket } from "../../hooks/useSocket";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { ActionButton, BackDrop, BreakTimeContainer, BreakTimeOptions, ViewActiviesBreakTimes } from "./style";
import { addBreakTime } from "../../services/apiManageONU/addBreakTime";
import { getBreakTime } from "../../services/apiManageONU/getBreakTime";
import { Backdrop, Button } from "@mui/material";
import dayjs from "dayjs";
import { Timer } from "./timer";
import MoreTimeRoundedIcon from '@mui/icons-material/MoreTimeRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import CheckIcon from '@mui/icons-material/Check';
import { getBreakTimeTypes } from "../../services/apiManageONU/getBreakTimeTypes";

export function BreakTime(){
    const { user } = useAuth();
    const { socket } = useSocket();
    const local = useLocation();

    const [breakTimeData, setBreakTimeData] = useState<any[] | null>(null);
    const [breakTimeTypes, setBreakTimeTypes] = useState<any[] | null>(null);
    const [userInBrakTime, setUserInBrakeTime] = useState<any | null>(null);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    
    const handleClose = () => {
        setOpenBackDrop(false);
    };
    const handleOpen = () => {
        setOpenBackDrop(true);
    };

    if(socket){
        socket.emit("select_room", {
            uid: user?.uid,
            room: local.pathname
        });
    }

    useEffect(() => {
        const getData = async () => {
            const getTimes = getBreakTime(true);
            const getTypes = getBreakTimeTypes();

            const [ times, types ] = await Promise.all([getTimes, getTypes]);

            if(times.success){
                setBreakTimeData(times.responses.response);
            }

            if(types.success){
                setBreakTimeTypes(types.responses.response);
            }
        }
        getData();
    }, []);

/*
    useEffect(() => {
        verifyUserInBrakeTime();
    }, [breakTimeData]);
*/

    const verifyUserInBrakeTime = () => {
        if(breakTimeData){
            const userIn = breakTimeData.find(userIn => userIn.user_id === user?.uid);
            if(userIn){
                const TimeRemaining = dayjs(userIn.created_at).format('HH:mm:ss');
                const formated = TimeRemaining.split(':') as any;

                setUserInBrakeTime({
                    hours: formated[0]*1,
                    minutes: formated[1]*1,
                    seconds: formated[2]*1
                });
                setOpenBackDrop(true);
            }
        }
    }

    const handleSubmit = async () => {
        const response = await addBreakTime()
    }

    return(
        <BreakTimeContainer className="flex">
            <BreakTimeOptions className="flex">
                <div><p><b>HORÁRIOS DE PAUSA</b></p></div>
                <div className="flex">
                {
                    breakTimeTypes && breakTimeTypes.map((type: any) => {
                        return(
                            <ActionButton className="flex" key={type.id}>
                                <Button variant="contained" size="small" endIcon={<MoreTimeRoundedIcon />}>
                                    {type.name}
                                </Button>
                                <div className="flex">
                                    <QueryBuilderRoundedIcon fontSize="small"/>{type.duration + ' min'} 
                                </div>
                            </ActionButton>
                        )
                    })
                }
                </div>
            </BreakTimeOptions>
            <ViewActiviesBreakTimes>
                <div>
                    <b>AGENTES EM PAUSA</b>
                </div>
                <div className="teste">
                    nego: drama<br/>
                    restante: 10 dias
                </div>

            </ViewActiviesBreakTimes>
            {
                /*
                userInBrakTime ?
                    <div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openBackDrop}
                                >
                                <BackDrop className="backdrop flex">
                                    <Timer initialTime={userInBrakTime}/>
                                    <Button variant="contained" endIcon={<CheckIcon />}>
                                        Finalizar
                                    </Button>
                                </BackDrop>
                        </Backdrop>

                    </div>
                : 
                    <></>
                    */
            }
        </BreakTimeContainer>
    )
}