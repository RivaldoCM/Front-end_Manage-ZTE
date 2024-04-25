import { ReactNode, createContext, useEffect, useState } from "react";
import { getBreakTime } from "../services/apiManageONU/getBreakTime";
import { getBreakTimeTypes } from "../services/apiManageONU/getBreakTimeTypes";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "../hooks/useAuth";

export const BreakTimeContext = createContext<{
    breakTimes: IBreaktime[],
    breakTypes: IBreaktimeTypes[]
} | undefined>(undefined);

export function BreakTimeContextProvider({ children }: { children: ReactNode }){
    const { user } = useAuth();
    const { socket } = useSocket();
    const [breakTimes, setBreakTimes] = useState<IBreaktime[]>([]);
    const [breakTypes, setBreakTypes] = useState<IBreaktimeTypes[]>([]);

    useEffect(() => {
        const getData = async () => {
            const getTimes = getBreakTime(true);
            const getTypes = getBreakTimeTypes();
            const [ times, types ] = await Promise.all([getTimes, getTypes]);

            times.success ? setBreakTimes(times.responses.response) : setBreakTimes([]);
            types.success ? setBreakTypes(types.responses.response) : setBreakTypes([]);
        }
        getData();
    }, []);

    if(socket){
        socket.emit("select_room", {
            uid: user?.uid,
            room: '/break_time'
        });
    
        socket.on('update', data => {
            setBreakTimes(data.responses.response);
        });
    }

    return(
        <BreakTimeContext.Provider value={{ breakTimes, breakTypes }}>
            { children }
        </BreakTimeContext.Provider>
    )
}