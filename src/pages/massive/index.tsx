import { useEffect, useState } from "react";

import { Card, Cards, OffCard, CardController, Container } from "./style";
import { Alert, IconButton } from "@mui/material";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { getMassive } from "../../services/apiManageONU/getMassive";
import { AddMassive } from "./addMassive";
import { useResponse } from "../../hooks/useResponse";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import dayjs from "dayjs";

export function Massive(){
    const { response, setFetchResponseMessage, responseMassage, severityStatus } = useResponse();

    const [open, setOpen] = useState(false);
    const [massives, setMassives] = useState<any>([]);
    const [showOffCard, setShowOffCard] = useState<number[]>([]);

    
    useEffect(() => {
        if(!open){
            async function massives(){
                const activeMassives = await getMassive();
                if(activeMassives){
                    if(activeMassives.success){
                        if(activeMassives.responses.response){
                            setMassives(activeMassives.responses.response);
                        } else {
                            setMassives([]);
                        }
                    } else {
                        setMassives([]);
                    }
                } else {
                    setFetchResponseMessage('error/no-connection-with-API');
                }
            }
            massives();
        }
    }, [open]);

    const handleShowOffCard = (whichCard: number) => {
        if (showOffCard.includes(whichCard)) {
            //CASO ESTEJA ABERTO, ENTRA AQ
            //NESSE CASO, PARA FECHAR, GERA UM NOVO ARRAY COM TODOS OS VALORES, MENOS O DO CARD CLICADO.
            setShowOffCard(showOffCard.filter(cardIndex => cardIndex !== whichCard));
        } else {
            setShowOffCard([...showOffCard, whichCard]);
        }
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <Container>
            <Cards>
                {
                    massives.map((massive: any, index: number) => {
                        return(
                            <CardController className="flex" key={index}>
                                <Card className="flex" offCardOpen={showOffCard.includes(index)}>
                                    <div className="header flex">
                                        <h2>{massive.type}</h2>
                                        <p>{massive.city_name}</p>
                                    </div>
                                    <div className="content">
                                        <div className="basic-info">
                                            <p>Locais afetados: {massive.affected_local}</p>
                                        </div>
                                        <div className="description flex">
                                            <p>{massive.description}</p>
                                        </div>
                                        <div className="teste flex">
                                            <p>Previsão de retorno: {dayjs(massive.forecast_return).format('DD/MM/YY - HH:mm') + 'h'}</p>
                                        </div>
                                    </div>
                                </Card>
                                <OffCard className="flex" offCardOpen={showOffCard.includes(index)}>
                                    <IconButton
                                        className="off-card-button" 
                                        size="small"
                                        color="primary"
                                        onClick={() => handleShowOffCard(index)}
                                    >
                                        {showOffCard.includes(index) ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
                                    </IconButton>
                                    
                                </OffCard>
                            </CardController>
                        );
                    })
                }
            </Cards>
            <AddMassive
                handleOpen={handleOpen}
                open={open}
                handleClose={handleClose}
            />
            {
                (response ? 
                    <Alert className="alert" severity={severityStatus}>{responseMassage}</Alert> 
                    : 
                    <></>
                )
            }
        </Container>
    );
}