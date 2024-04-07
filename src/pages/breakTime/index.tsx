import { useEffect, useState } from "react"
import { useSocket } from "../../hooks/useSocket";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";

const Timer = () => {
    const [time, setTime] = useState({ hh: 0, mm: 0, ss: 10 });
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
        <div>
            <p>{`${time.hh < 10 ? '0' + time.hh : time.hh}:${time.mm < 10 ? '0' + time.mm : time.mm}:${time.ss < 10 ? '0' + time.ss : time.ss}`}</p>
        </div>
    );
  };

export function BreakTime(){
    const { user } = useAuth();
    const local = useLocation();
    const { socket } = useSocket();

    if(socket){
        socket.emit("select_room", {
            uid: user?.uid,
            room: local.pathname
        });
    }

    setTimeout(() => {
        socket.emit("leave_room", {
            uid: user?.uid,
            room: local.pathname
        });
    }, 5000)

    return(
        <div>
            <Timer />
        </div>
    )
}