import { useEffect, useState } from "react"
import { useSocket } from "../../hooks/useSocket";
import { useAuth } from "../../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { BreakTimeContainer, BreakTimeOptions } from "./style";
import { addBreakTime } from "../../services/apiManageONU/addBreakTime";
import { getBreakTime } from "../../services/apiManageONU/getBreakTime";
import { Backdrop } from "@mui/material";
import dayjs from "dayjs";
import { Timer } from "./timer";

export function BreakTime(){
    const { user } = useAuth();
    const { socket } = useSocket();
    const local = useLocation();

    const [breakTimeData, setBreakTimeData] = useState<any[] | null>(null);
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
            const response = await getBreakTime(true);
            if(response.success){
                setBreakTimeData(response.responses.response);
            } else {
                setBreakTimeData(null);
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
            {
                userInBrakTime ?
                    <div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={openBackDrop}
                            >
                                <Timer initialTime={userInBrakTime}/>
                        </Backdrop>
                    </div>
                : 
                    <></>
            }
            <BreakTimeOptions className="flex">
                <div>Menu de pausa</div>
                <button onClick={handleSubmit}>teste</button>
            </BreakTimeOptions>
        </BreakTimeContainer>
    )
}