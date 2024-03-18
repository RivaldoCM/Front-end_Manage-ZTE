import { useEffect, useState } from "react";
import { getOnuLogs } from "../../services/apiManageONU/getOnuLogs";
import dayjs from "dayjs";
import { CardMyOnus, Container, HelpButton } from "./style";
import { Button, Typography, Popover, IconButton, Divider } from "@mui/material";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

export function MyAuthorizedOnusMobile(){
    const [onu, setOnu] = useState<IOnuLogs[]>([]);

    useEffect(() => {
        async function getData(){
            const response = await getOnuLogs({initialDate: dayjs().subtract(10, 'day').format('DD-MM-YYYY'), lastDate: dayjs().format('DD-MM-YYYY'), userId: 150439});
            if(response){
                if(response.success){
                    setOnu(response.responses.response);
                } else {
                    setOnu([]);
                }
            } else {
                setOnu([]);
            }
        };
        getData();
    }, []);

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => { setAnchorEl(null); };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleSignal = (signal: string) => {
        console.log(parseFloat(signal) < 24)
        if(parseFloat(signal) < -24.00){
            return true;
        } else {
            return false;
        }
    }

    return (
        <Container className="flex">
            <HelpButton className="flex">
            <IconButton aria-label="delete" onClick={handleClick}>
                <HelpOutlineOutlinedIcon fontSize="large" color="primary"/>
            </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 4, background: '#fffff0', color: '#000' }}>
                        Aqui aparecerá as ONU's provisionadas por você nos últimos 2 dias.<br/>
                        <Divider />
                        Se você provisionou uma ONU agora, pode demorar até 15 segundos para que você consiga vê-la aqui.
                    </Typography>
                </Popover>
            </HelpButton>
            {
                onu.reverse().map((onu) => {
                    return (
                        <CardMyOnus>
                            <div className="header flex">
                                <div className="flex">
                                    <p>Serial: {onu.serial_onu}</p>
                                    <p>PPPoE: {onu.pppoe}</p>
                                </div>
                                <div className="flex">
                                    <p>Sinal (olt rx): </p><p className="color" signalColor={true}>{onu.rx_power}</p>
                                    <p>Sinal (onu rx): </p><p className="color" signalColor={handleSignal(onu.onuRx_power)}>{onu.onuRx_power}</p>
                                </div>
                            </div>
                            <div className="content flex">
                                {/*
                                <Button variant="contained">Verificar Perda Atual</Button>
                                */}
                                <div>
                                    {onu.created_at}
                                </div>
                            </div>
                        </CardMyOnus>
                    );
                })
            }
        </Container>
    )
}