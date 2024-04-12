import { useEffect, useState } from "react"
import { useSocket } from "../../hooks/useSocket";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { ActionButton, BackDrop, BreakTimeContainer, BreakTimeOptions, CardBreakTime, ViewActiviesBreakTimes } from "./style";
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

    
    useEffect(() => {
        verifyUserInBrakeTime();
    }, [breakTimeData]);

    const verifyUserInBrakeTime = () => {
        if(breakTimeData){
            const userIn = breakTimeData.find(userIn => userIn.user_id === user?.uid);
            
            if(userIn){
                const TimeRemaining = dayjs(userIn.created_at).format('HH:mm:ss');
                const formated = TimeRemaining.split(':') as any;
                const timeInSeconds = convertToSeconds(formated[0]*1, formated[1]*1, formated[2]*1);

                setUserInBrakeTime(timeInSeconds);
                setOpenBackDrop(true);
                return timeInSeconds;
            }
        }
    }

    const verifyUserInBrakeTimeTeste = (param: any) => {
        console.log(param,'dewbt=')
        const TimeRemaining = dayjs(param).format('HH:mm:ss');
        const formated = TimeRemaining.split(':') as any;
        const timeInSeconds = convertToSeconds(formated[0]*1, formated[1]*1, formated[2]*1);

        return timeInSeconds;
        
    }
    
    const handleSubmit = async () => {
        const response = await addBreakTime()
    }

    function convertToSeconds( hours, minutes, seconds ) {
        return hours * 3600 + minutes * 60 + seconds;
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
                                <Button variant="contained" size="small" endIcon={<MoreTimeRoundedIcon />} onClick={handleSubmit}>
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
                <div className="break-times-container flex">
                    {
                        breakTimeData && breakTimeData.map((user: any) => {
                            return(
                                <CardBreakTime className="flex" key={user.id}>
                                    <div className="flex">
                                        <div>
                                            Nome: {user.User.name}
                                        </div>
                                        <div>
                                            Pausa: {user.break_Time_Types.name}
                                        </div>
                                        <div>
                                            Tempo Excedido: 
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <Timer initialTime={verifyUserInBrakeTimeTeste(user.created_at)} isBackDrop={false}/>
                                        </div>
                                        <div>
                                            <Timer initialTime={verifyUserInBrakeTimeTeste(user.created_at)} isBackDrop={false}/>
                                        </div>
                                    </div>
                                </CardBreakTime>
                            )
                        })
                    }
                </div>
            </ViewActiviesBreakTimes>
            {
                userInBrakTime ?
                    <div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openBackDrop}
                        >
                            <BackDrop className="backdrop flex">
                                <Timer initialTime={userInBrakTime} isBackDrop={true}/>
                                <Button variant="contained" endIcon={<CheckIcon />}>
                                    Finalizar
                                </Button>
                            </BackDrop>
                        </Backdrop>

                    </div>
                : 
                    <></>
                    
            }
        </BreakTimeContainer>
    )
}