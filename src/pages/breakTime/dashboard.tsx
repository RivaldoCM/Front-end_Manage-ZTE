import { formatTimeInSeconds } from "../../config/formatDate";
import { useBreakTime } from "../../hooks/useBreakTime";
import { CardBreakTime, Dashboard } from "./style";
import { Timer } from "./timer";

export function BreakTimeDashboard(){
    const { breakTimes, breakTypes } = useBreakTime();

    return(
        <Dashboard className="flex">
            <main>
                
            </main>
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