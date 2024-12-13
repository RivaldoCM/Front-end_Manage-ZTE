import { Controller, InfoCard } from "./style";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';

export function Tickets(){
    return(
        <Controller>
            <header>
                <Button 
                    startDecorator={<Add />} 
                    color="success"
                    size="sm"
                >
                    Novo ticket
                </Button>
            </header>
            <section className="flex">
                <InfoCard>
                    <p>Abertos</p>
                    <p>0</p>
                </InfoCard>
                <InfoCard>
                    <p>Encerram hoje</p>
                    <p>2</p>
                </InfoCard>
                <InfoCard>
                    <p>Em atraso</p>
                    <p>5</p>
                </InfoCard>
                <InfoCard>
                    <p>Em atraso</p>
                    <p>5</p>
                </InfoCard>
            </section>
        </Controller>
    )
}