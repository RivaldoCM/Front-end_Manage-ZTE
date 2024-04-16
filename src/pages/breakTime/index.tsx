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

    if(socket){
        socket.emit("select_room", {
            uid: user?.uid,
            room: local.pathname
        });
    }

    const [breakTimeData, setBreakTimeData] = useState<any[] | null>(null);
    const [breakTimeTypes, setBreakTimeTypes] = useState<any[] | null>(null);
    const [realTimeData, setRealTimeData] = useState<any | null>(null);
    const [userInBrakTime, setUserInBrakeTime] = useState<any | null>(null);
    const [openBackDrop, setOpenBackDrop] = useState(false);
    const [stopTimers, setStopTimers] = useState(false);
    
    const handleClose = () => {
        setOpenBackDrop(false);
    };
    const handleOpen = () => {
        setOpenBackDrop(true);
    };

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
                const duration = userIn.break_Time_Types.duration;

                setUserInBrakeTime({timeInSeconds, duration});
                setOpenBackDrop(true);
                return timeInSeconds;
            }
        }
    }

    const formatTime = (param: any) => {
        const TimeRemaining = dayjs(param).format('HH:mm:ss');
        const formated = TimeRemaining.split(':') as any;

        const timeInSeconds = convertToSeconds(formated[0]*1, formated[1]*1, formated[2]*1);
        return timeInSeconds;
    }

    function convertToSeconds( hours: number, minutes: number, seconds: number ) {
        return hours * 3600 + minutes * 60 + seconds;
    }
    
    const handleSubmitInitBreakTime = async (typeId: number) => {
        const response = await addBreakTime({userId: user?.uid,  whichType: typeId});
    }

    const getFinishedData = ({inTime, outTime}: {inTime: number, outTime: number}) => {
        setRealTimeData({inTime, outTime});
    }

    const handleFinishBreakTime = async () => {
        console.log(realTimeData)
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
                                    <Button variant="contained" size="small" endIcon={<MoreTimeRoundedIcon />} onClick={() => handleSubmitInitBreakTime(type.id)}>
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
            <ViewActiviesBreakTimes isBackDrop={openBackDrop}>
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
                                            <p><b>Nome: </b>{user.User.name}</p>
                                        </div>
                                        <div>
                                            <p><b>Pausa: </b>{user.break_Time_Types.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <Timer 
                                                initialTime={{
                                                    timeInSeconds: formatTime(user.created_at), 
                                                    duration: user.break_Time_Types.duration,
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
            </ViewActiviesBreakTimes>
            {
                userInBrakTime ?
                    <div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
                            open={openBackDrop}
                        >
                            <BackDrop className="flex">
                                <Timer initialTime={userInBrakTime} isBackDrop={true} getFinishedData={getFinishedData}/>
                                <Button variant="contained" endIcon={<CheckIcon />} onClick={handleFinishBreakTime}>
                                    Finalizar
                                    {
                                        /*
                                            adicionar quandlo clicar no botao para retirar o endAt do LocalStorage
                                        */
                                    }
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