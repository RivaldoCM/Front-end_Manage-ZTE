import { useEffect, useState } from "react";

import { Card, Cards, OffCard, CardController, Container } from "./style";
import { Alert, CircularProgress, IconButton } from "@mui/material";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { getMassive } from "../../services/apiManageONU/getMassive";
import { AddMassive } from "./addMassive";
import { useResponse } from "../../hooks/useResponse";

export function Massive(){
    const { response, setFetchResponseMessage, responseMassage, severityStatus } = useResponse();

    const [massives, setMassives] = useState<any>([]);
    const [showOffCard, setShowOffCard] = useState(true);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
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

                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }
        }
        massives();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <Container>
            <Cards>
                {
                    massives.map((massive: any, index: number) => {
                        return(
                            <CardController className="flex" key={index}>
                                <Card className="flex ">
                                    <div className="header flex">
                                        <h2>{massive.type}</h2>
                                        <p>{massive.city_name}</p>
                                    </div>
                                    <div className="content">
                                        <div className="basic-info">
                                            <p>{massive.affected_local}</p>
                                        </div>
                                        <div className="description flex">
                                            <p>{massive.description}</p>
                                        </div>
                                    </div>
                                </Card>
                                <OffCard className="flex" offCardOpen={showOffCard}>
                                    <IconButton
                                        className="off-card-button" 
                                        color="primary"
                                        onClick={() => setShowOffCard(!showOffCard)}
                                    >
                                        <KeyboardArrowUpOutlinedIcon />
                                    </IconButton>
                                </OffCard>
                            </CardController>
                        )
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