import { formatTimeInSeconds } from "../../config/formatDate";
import { useBreakTime } from "../../hooks/useBreakTime"
import { Panel, CardBreakTime } from "./style";
import { Timer } from "./timer";

export function BreakTimePanel(){
    const { breakTimes } = useBreakTime();

    return(
        <Panel className="flex">
            {
                breakTimes && breakTimes.map((single) => {
                    return(
                        <CardBreakTime className="flex" key={single.User.id}>
                        <div className="flex">
                            <div>
                                <p><b>Nome: </b>{single.User.name}</p>
                            </div>
                            <div>
                                <p><b>Pausa: </b>{single.break_Time_Types.name}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div>
                                <Timer
                                    dataUserInBrakTime={{
                                        startAt: formatTimeInSeconds(single.created_at), 
                                        duration: single.break_Time_Types.duration,
                                    }} 
                                    isBackDrop={false}
                                />
                            </div>
                        </div>
                    </CardBreakTime>
                    )
                })
            }
        </Panel>
    )
}