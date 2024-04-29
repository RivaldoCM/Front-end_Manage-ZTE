import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth";

import { ActionButton, BackDrop, BreakTimeContainer, BreakTimeOptions, CardBreakTime, ViewActiviesBreakTimes } from "./style";
import { addBreakTime } from "../../services/apiManageONU/addBreakTime";

import { Backdrop, Button } from "@mui/material";
import { Timer } from "./timer";
import MoreTimeRoundedIcon from '@mui/icons-material/MoreTimeRounded';
import QueryBuilderRoundedIcon from '@mui/icons-material/QueryBuilderRounded';
import CheckIcon from '@mui/icons-material/Check';

import { updateBreakTime } from "../../services/apiManageONU/updateBreakTime";
import { useResponse } from "../../hooks/useResponse";
import { useBreakTime } from "../../hooks/useBreakTime";
import { formatTimeInSeconds } from "../../config/formatDate";

export function BreakTime(){
    const { user } = useAuth();
    const { breakTimes, breakTypes } = useBreakTime();
    const { setFetchResponseMessage } = useResponse();

    const [dataUserInBrakTime, setDataUserInBrakeTime] = useState<IDataUserInBreakTime | null>(null);
    const [realTimeData, setRealTimeData] = useState<number | null>(null);
    const [openBackDrop, setOpenBackDrop] = useState(false);

    useEffect(() => {
        verifyUserInBrakeTime();
    }, [breakTimes]);

    const handleOpenBackDrop = () => { setOpenBackDrop(true); };
    const handleCloseBackDrop = () => { setOpenBackDrop(false); };

    const verifyUserInBrakeTime = () => {
        if(breakTimes){
            const userIn = breakTimes.find(userIn => userIn.User.id === user?.uid);
            if(userIn){
                const id = userIn.id; //ID deste breakTime no DB, não do user, parametro para atualizar esta coluna no DB caso precise.
                const startAt = formatTimeInSeconds(userIn.created_at);
                const duration = userIn.break_Time_Types.duration;
                setDataUserInBrakeTime({id, startAt, duration});
                handleOpenBackDrop();

                return startAt;
            } else {
                handleCloseBackDrop();
            }
        }
    }


    const handleSubmitInitBreakTime = async (typeId: number) => {
        const response = await addBreakTime({userId: user?.uid,  whichType: typeId});
        if(response){
            if(!response.success){
                setFetchResponseMessage('error/data-not-created');
            }
        } else {
            setFetchResponseMessage('error/data-not-created');
        }
    }

    const getFinishedData = (secondsleft: number) => {
        /*
            NÃO É POSSÍVEL PASSAR DIRETAMENTE UM ESTADO PARA O COMPONENTE FILHO E ATUALIZAR
            ENTAO ESSA FUNÇÃO SERVE EXATAMENTE PARA RECEBER E ATUALIZAR OS DADOS PARA ENVIO
            A API DE FORMA SINCRONA.
        */
        setRealTimeData(secondsleft);
    }

    const handleFinishBreakTime = async () => {
        const response = await updateBreakTime(dataUserInBrakTime!.id, realTimeData);
        if(response){
            if(!response.success){
                setFetchResponseMessage('error/data-not-created');
            } else {
                handleCloseBackDrop();
            }
        } else {
            setFetchResponseMessage('error/data-not-created');
        }
    }

    return(
        <BreakTimeContainer className="flex">
            <BreakTimeOptions className="flex">
                <div><p><b>HORÁRIOS DE PAUSA</b></p></div>
                <div className="flex">
                    {
                        breakTypes && breakTypes.map((type) => {
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
                        breakTimes && breakTimes.map((user) => {
                            return(
                                <CardBreakTime className="flex" key={user.User.id}>
                                    <div className="flex">
                                        <div>
                                            <p><b>Nome: </b>{(user.User.name).substring(0,35)}</p>
                                        </div>
                                        <div>
                                            <p><b>Pausa: </b>{user.break_Time_Types.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <Timer 
                                                dataUserInBrakTime={{
                                                    startAt: formatTimeInSeconds(user.created_at), 
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
                (dataUserInBrakTime ?
                    <div>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 } }
                            open={openBackDrop}
                        >
                            <BackDrop className="flex">
                                <Timer dataUserInBrakTime={dataUserInBrakTime} isBackDrop={true} getFinishedData={getFinishedData}/>
                                <Button variant="contained" endIcon={<CheckIcon />} onClick={handleFinishBreakTime}>
                                    Finalizar
                                </Button>
                            </BackDrop>
                        </Backdrop>
                    </div>
                : 
                    <></>
                )
            }
        </BreakTimeContainer>
    )
}