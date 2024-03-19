import { IconButton } from "@mui/material";
import { Card, Cards, OffCard, CardController } from "./style";

import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useState } from "react";

export function Massive(){
    const [showOffCard, setShowOffCard] = useState(true);

    return(
            <Cards>
                <CardController className="flex">
                    <Card className="flex ">
                        <div className="header flex">
                            <h2>PARADO - 16:52h</h2>
                            <p>PATRIMONIO DA PENHA</p>
                        </div>
                        <div className="content">
                            <div className="basic-info">
                                <p>Afetado: bairro do rque, santa cecilia, jao clara e area de lazer</p>
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
                <CardController className="flex">
                    <Card className="flex ">
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
                <CardController className="flex">
                    <Card className="flex ">
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
                <CardController className="flex">
                    <Card className="flex ">
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
                <CardController className="flex">
                    <Card className="flex ">
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
                <CardController className="flex">
                    <Card className="flex ">
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
                <CardController className="flex">
                    <Card className="flex ">
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
                <CardController className="flex">
                    <Card className="flex ">
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
                <CardController className="flex">
                    <Card className="flex ">
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
            </Cards>
    );
}