import dayjs from "dayjs";

import { useMassive } from "../../hooks/useMassive";

import { 
    Card, 
    Cards, 
    CardController, 
    Container,
    CardPanel, 
} from "./style";

import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';

export function MassivePanel(){
    const { massives } = useMassive();

    return(
        <Container>
            <Cards>
                {
                    massives.map((massive, index: number) => {
                        return(
                            <CardController className="flex" key={index}>
                                <CardPanel className="flex">
                                    <div className="header flex">
                                        <h2>{massive.type} - {dayjs(massive.failure_date).add(3, "hour").format('HH:mm') + 'h'}</h2>
                                        <p>{massive.Cities.name}</p>
                                    </div>
                                    <div className="content">
                                        <div className="basic-info flex">
                                            <LocationCityOutlinedIcon color="action" />
                                            <p>{massive.affected_local}</p>
                                        </div>  
                                        <div className="description flex">
                                            <DrawOutlinedIcon color="action" />
                                            <p>{massive.description}</p>
                                        </div>
                                        <div className="flex acknowledge">
                                            <p>
                                                Data da falha: {dayjs(massive.failure_date).add(3, "hour").format('DD/MM')}
                                            </p>
                                            <p>Previsão: {dayjs(massive.forecast_return).add(3, "hour").format('DD/MM [às] HH:mm') + 'h'}</p>
                                        </div>
                                    </div>
                                </CardPanel>
                            </CardController>
                        );
                    })
                }
            </Cards>
        </Container>
    );
}