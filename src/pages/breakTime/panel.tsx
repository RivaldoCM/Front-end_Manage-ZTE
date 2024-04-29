import { useBreakTime } from "../../hooks/useBreakTime"
import { formatTimeInSeconds } from "../../config/formatDate";
import { Timer } from "./timer";
import { Panel, CardBreakTime } from "./style";

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