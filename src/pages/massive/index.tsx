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