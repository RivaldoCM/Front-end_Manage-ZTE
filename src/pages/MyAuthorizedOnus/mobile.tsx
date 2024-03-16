import { useEffect, useState } from "react";
import { getOnuLogs } from "../../services/apiManageONU/getOnuLogs";
import dayjs from "dayjs";
import { CardMyOnus, Container, HelpButton } from "./style";
import { Button, Typography, Popover, IconButton } from "@mui/material";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

export function MyAuthorizedOnusMobile(){
    const [onu, setOnu] = useState<IOnuLogs[]>([]);

    useEffect(() => {
        async function getData(){
            const response = await getOnuLogs({initialDate: dayjs().subtract(7, 'day').format('DD-MM-YYYY'), lastDate: dayjs().format('DD-MM-YYYY'), userId: 150439});
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

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Container>
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
                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                </Popover>
            </HelpButton>
            {
                onu.map((onu) => {
                    return (
                        <CardMyOnus>
                            <div className="header flex">
                                <div className="flex">
                                    <p>Serial: {onu.serial_onu}</p>
                                    <p>PPPoE: {onu.pppoe}</p>
                                </div>
                                <div className="flex">
                                    <p>Sinal (olt rx): {onu.rx_power}</p>
                                    <p>Sinal (onu rx): {onu.onuRx_power}</p>
                                </div>
                            </div>
                            <div className="content flex">
                                <Button variant="contained">Verificar Perda Atual</Button>
                            </div>
                        </CardMyOnus>
                    );
                })
            }
        </Container>
    )
}