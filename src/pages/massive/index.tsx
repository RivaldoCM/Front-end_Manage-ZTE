import { useEffect, useState } from "react";

import { Card, Cards, OffCard, CardController, Container } from "./style";
import { IconButton } from "@mui/material";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { getMassive } from "../../services/apiManageONU/getMassive";
import { AddMassive } from "./addMassive";

export function Massive(){
    const [massives, setMassives] = useState<any>([]);
    const [showOffCard, setShowOffCard] = useState(true);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        async function massives(){
            const activeMassives = await getMassive();

            if(activeMassives){
                setMassives(activeMassives);
            }
        }
        massives();

    }, []);

    console.log(massives)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <Container>
            <Cards>
                {
                    massives.map((massive, index) => {
                        return(
                            <CardController className="flex" key={index}>
                            <Card className="flex ">
                                <div className="header flex">
                                    <h2>{massive.type}</h2>
                                    <p>{massive.city_name}</p>
                                </div>
                                <div className="content">
                                    <div className="basic-info">
                                        <p>Afetado: bairro do rque, santa cecilia, jao clara e area de lazer lo</p>
                                    </div>
                                    <div className="description flex">
                                       <p>Poste pegou fogo, parou total de 300 clientes</p>
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
            >
            </AddMassive>
        </Container>
    );
}