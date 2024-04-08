import { useEffect, useState } from "react"
import { useSocket } from "../../hooks/useSocket";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { BreakTimeContainer, BreakTimeOptions, TimerContainer, TimerWrapper } from "./style";
import { addBreakTime } from "../../services/apiManageONU/addBreakTime";
import { getBreakTime } from "../../services/apiManageONU/getBreakTime";

const Timer = () => {
    const [time, setTime] = useState({ hh: 0, mm: 1, ss: 10 });
    const [timeIsRunning, setTimeIsRunning] = useState(true);
    const tempo = 1000;
  
    useEffect(() => {
        if(timeIsRunning){
            const cron = setInterval(() => {
                timer();
            }, tempo);

            return () => {
                clearInterval(cron);
            };
        }
    }, [timeIsRunning]);
  
    const timer = () => {
        setTime(prevTime => {
            let { hh, mm, ss } = prevTime;
            if (hh === 0 && mm === 0 && ss === 1) {
                // Quando chegar a 00:00:01, pare o contador
                setTimeIsRunning(false);
            }

            if (ss > 0) {
                ss--;
            } else {
                ss = 59;
                if (mm > 0) {
                    mm--;
                } else {
                    mm = 59;
                    if (hh > 0) {
                        hh--;
                    }
                }
            }
            return { hh, mm, ss };
        });
    };
  
    return (
        <TimerContainer className="flex">
            <TimerWrapper className="flex">
                <p>{`${time.hh < 10 ? '0' + time.hh : time.hh}`}</p>
                <p>Horas</p>
            </TimerWrapper>
            <TimerWrapper className="flex">
                <p>{`${time.mm < 10 ? '0' + time.mm : time.mm}`}</p>
                <p>Minutos</p>
            </TimerWrapper>
            <TimerWrapper className="flex">
                <p>{`${time.ss < 10 ? '0' + time.ss : time.ss}`}</p>
                <p>Segundos</p>
            </TimerWrapper>
        </TimerContainer>
    );
  };

export function BreakTime(){
    const { user } = useAuth();
    const { socket } = useSocket();
    const local = useLocation();

    const [breakTimeData, setBreakTimeData] = useState<any[] | null>(null);
    const [userInBrakTime, setUserInBrakeTime] = useState<Boolean>(false);

    if(socket){
        socket.emit("select_room", {
            uid: user?.uid,
            room: local.pathname
        });
    }

    useEffect(() => {
        const getData = async () => {
            const response = await getBreakTime(true);
            if(response.success){
                setBreakTimeData(response.responses.response);
            }
        }
        getData();
    }, []);

    useEffect(() => {
        verifyUserInBrakeTime();
    }, [breakTimeData]);

    const verifyUserInBrakeTime = () => {
        if(breakTimeData){
            const userIn = breakTimeData.find(user => user.user_id === user?.uid);
            if(userIn){
                setUserInBrakeTime(userIn);
            }
        }
    }

    const handleSubmit = async () => {
        const response = await addBreakTime()
    }


    return(
        <BreakTimeContainer className="flex">
            <Timer />

            {
                breakTimeData ? <div>100%</div> : <></>
            }
            <BreakTimeOptions className="flex">
                <div>Menu de pausa</div>
                <button onClick={handleSubmit}>teste</button>
            </BreakTimeOptions>
        </BreakTimeContainer>
    )
}