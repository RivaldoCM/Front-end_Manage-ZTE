
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { useAuth } from "../../hooks/useAuth";
import { useSocket } from "../../hooks/useSocket";
import { useResponse } from "../../hooks/useResponse";

import { getOnuLogs } from "../../services/apiManageONU/getOnuLogs";

import { CardMyOnus, Container, HelpButton } from "./style";
import { Typography, Popover, IconButton, Divider } from "@mui/material";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

export function MyAuthorizedOnusMobile(){
    const { user } = useAuth();
    const { socket } = useSocket();
    const { setFetchResponseMessage } = useResponse();

    const [onu, setOnu] = useState<IOnuLogs[]>([]);

    useEffect(() => {
        async function getData(){
            const response = await getOnuLogs({initialDate: dayjs().subtract(2, 'day').format('DD-MM-YYYY'), lastDate: dayjs().format('DD-MM-YYYY'), userId: user?.uid, state: 'true'});
            if(response){
                if(response.success){
                    setOnu(response.responses.response);
                } else {
                    setOnu([]);
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
                setOnu([]);
            }
        };
        getData();
    }, []);

    if(socket){
        socket.emit('select_room', {
            uid: user?.uid,
            room: '/my_auth_onus'
        });
        socket.on('update', data => {
            setOnu(data);
        });
    }

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => { setAnchorEl(null); };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Container className="flex">
            <HelpButton className="flex">
                <IconButton onClick={handleClick}>
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
                        Aguarde que os sinais da ONU serão carregados automaticamente alguns segundos após o provisionamento.
                    </Typography>
                </Popover>
                <IconButton onClick={() => {window.location.reload()}}>
                    <RefreshOutlinedIcon fontSize="medium" color="primary"/>
                </IconButton>
            </HelpButton>
            {
                onu.reverse().map((onu) => {
                    return (
                        <CardMyOnus key={onu.id}>
                            <div className="header flex">
                                <div className="flex">
                                    <p>Serial: {onu.serial_onu}</p>
                                    <p>PPPoE: {onu.pppoe}</p>
                                </div>
                                <div className="flex">
                                    <p>Sinal (olt rx): {onu.rx_olt}</p>
                                    <p>Sinal (onu rx): {onu.rx_onu}</p>
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