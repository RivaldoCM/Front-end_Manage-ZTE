import { useEffect, useState } from "react"
import { io } from "socket.io-client";

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
    const socket = io('http://localhost:4000/breakTime');

    socket.on("connect", () => {
        console.log('aq')
        console.log(socket.id)
    });

    return(
        <>
        <Timer />
        </>
    )
}