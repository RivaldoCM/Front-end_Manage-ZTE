import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { useAuth } from "../../../../hooks/useAuth";
import { useTickets } from "../../../../hooks/useTickets";
import { useResponse } from "../../../../hooks/useResponse";
import { Chat } from "../../../../components/Chat";
import { addChatLog } from "../../../../services/apiManageONU/addChatLog";
import { getTicketStatus } from "../../../../services/apiManageONU/getTicketStatus";
import { IChatLog, ITickets, ITicketStatus } from "../../../../interfaces/ITickets";
import { updateTicket } from "../../../../services/apiManageONU/updateTicket";
import { ChatLog, ViewTicketController, ViewTicketStyle } from "../style";

import { 
    Box, 
    Button, 
    Divider, 
    IconButton, 
    List, 
    ListItem, 
    ListItemDecorator, 
    Modal, 
    ModalClose, 
    Option, 
    Radio, 
    RadioGroup, 
    Select, 
    Sheet, 
    Textarea, 
    Typography 
} from "@mui/joy";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import SendIcon from '@mui/icons-material/Send';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import ForumIcon from '@mui/icons-material/Forum';
import BookIcon from '@mui/icons-material/Book';
import CloseIcon from '@mui/icons-material/Close';

type ViewTicketPropsLocal = {
    open: boolean;
    ticket: ITickets;
    handleClose: () => void;
}

export function ViewTicketModal(props: ViewTicketPropsLocal){
    const { user } = useAuth();
    const { setChatLogListener, chatLog } = useTickets();
    
    const [chatLogFiltered, setChatLogFiltered] = useState<IChatLog[]>([]);
    const [isOpenedChat, setIsOpenedChat] = useState(false);
    const [isOpenedFilter, setIsOpenedFilter] = useState(false);
    const [filterMessagesOnly, setFilterMessagesOnly] = useState('both');
    const [message, setMessage] = useState('');
    const [ticketStatus, setTicketStatus] = useState<ITicketStatus[]>([]);
    const [currentStatus, setCurrentStatus] = useState<number>(0);
    //POR MAIS QUE MUDE NA HORA QUE O COMPONENTE APARECER É PRECISO PARA O SELECT ESTAR SEMPRE 'CONTROLLED'

    useEffect(() => {
        setCurrentStatus(props.ticket.Ticket_status.id);
        async function updateData(){
            if(!props.ticket.is_viwed && user.rule === props.ticket.Destination_department.id){
                await updateTicket({ ticketId: props.ticket.id, isViwed: true });
            }
            const response = await getTicketStatus();
            if(response){
                if(response.success){
                    setTicketStatus(response.responses.response);
                }
            }
        }
        updateData();
    }, []);
    
    useEffect(() => {
        /*
            CRIADO SOMENTE PARA MONITORAR NOVAS MENSAGENS
            SERVE PARA ATUALIZAR O CHATLOG BASEADO NO FILTRO
            ESCOLHIDO PELO USUÁRIO, TORNANDO DINAMICO E 
            POSSIBILITANDO O FILTRO FUNCIONAR
        */
        setChatLogFiltered(chatLog);
    },[chatLog])

    const handleOpenChatLog = () => {
        setIsOpenedChat(true);
        setChatLogListener({
            ticketId: props.ticket.id,
            isOpened: true
        })
    }
    const handleCloseChatLog = () => setIsOpenedChat(false);
    const handleOpenFilter = () => setIsOpenedFilter(true);
    const handleCloseFilter = () => setIsOpenedFilter(false);
    const handleMessageChange = (e: any) => { setMessage(e.target.value); }
    const handleChangeTicketStatus = async (_e: unknown, value: number | null) => {
        if(value){ setCurrentStatus(value); }
        await updateTicket({
            userId: user.uid, 
            ticketId: props.ticket.id, 
            status: value, 
        });
    }

    const handleClearFilterChatLog = () => { setFilterMessagesOnly('both'), setChatLogFiltered(chatLog); }
    const handleChangeFilterMessages = (e: any) => {
        setFilterMessagesOnly(e.target.value); //ATUALIZANDO VIZUALMENTE

        if(e.target.value === 'messages'){
            setChatLogFiltered(chatLog.filter((row) => row.is_automatic === false))
        } else{
            setChatLogFiltered(chatLog.filter((row) => row.is_automatic === true))
        }
    }

    const handleSendMessage = async (e: any) => {
        e.preventDefault();
        setMessage('');

        if(message.match(/^(?!\s*$).+/)){
            await addChatLog({
                userId: user.uid, 
                ticketId: props.ticket.id, 
                message: message,
                isAutoMessage: false
            });
        }
    }

    return(
        <Modal
            className="flex"
            open={props.open}
            onClose={props.handleClose}
        >
            <ViewTicketController className="flex">
                <ViewTicketStyle>
                    <header>
                        <p>ID: {props.ticket.id}</p>
                        <p>{props.ticket.Tickets_city.name} - {props.ticket.Ticket_Types.name}</p>
                        <ModalClose variant="outlined" />
                    </header>
                    <section>
                        <div>
                            <div>
                                <PushPinOutlinedIcon fontSize="small" color="secondary"/>
                            </div>
                            <div>
                                {props.ticket.User_appropriated_by?.name}
                            </div>
                        </div>
                        <div className="flex">
                            <div>
                                <p> Aberto por: {props.ticket.User_created_by.name} </p>
                            </div>
                            <div className="flex">
                                <p> 
                                    <CalendarMonthIcon 
                                        fontSize="small" 
                                        color="secondary"
                                    /> 
                                </p>
                                <p>
                                    {dayjs(props.ticket.created_at).add(3, "hour").format('DD/MM/YY [às] HH:mm') + 'hrs'}
                                </p>
                            </div>
                        </div>
                        <div className="flex">
                            {
                                props.ticket.finished_at &&
                                <React.Fragment>
                                    <p> Finalizado por: {props.ticket.User_finished_by && props.ticket.User_finished_by.name}</p>
                                    <p>
                                        <CalendarMonthIcon 
                                            fontSize="small" 
                                            color="secondary"
                                        />
                                        {dayjs(props.ticket.finished_at).add(3, "hour").format('DD/MM/YY [às] HH:mm') + 'hrs'}
                                    </p>
                                </React.Fragment>
                            }
                        </div>
                    </section>
                    <section>
                        <h5>Informações do CTO:</h5>
                        {props.ticket.Tickets_cto ?
                            <React.Fragment>
                                <div className="flex">
                                    <div className="flex">
                                        <div>
                                            <p>Nome: {props.ticket.Tickets_cto.name}</p>
                                            <p>OLT: {props.ticket.Tickets_cto.Olts.name} - {props.ticket.Tickets_cto.Olts.host}</p>
                                        </div>
                                        <div>
                                            <p>N° CTO: {props.ticket.Tickets_cto.number}</p>
                                            <p>Portas: {props.ticket.Tickets_cto.slots}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>Localização do CTO:  
                                            <a 
                                                href={
                                                    `https://www.google.com/maps?q= ${props.ticket.Tickets_cto.lat.replace(',', '.')}, 
                                                    ${props.ticket.Tickets_cto.lng.replace(',', '.')}`
                                                } 
                                                target="_blank"> 
                                                    {props.ticket.Tickets_cto.lat + ', '+ props.ticket.Tickets_cto.lng}
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </React.Fragment>
                            : 'Nenhum CTO adicionado.'
                        }
                    </section>
                    <section>
                        <div>
                            Localização: {props.ticket.localization ?? props.ticket.localization}
                        </div>
                        <div>
                            <p>Descrição:</p>
                            <Textarea minRows={3} maxRows={3} value={props.ticket.description ??  ''} />
                            {/*
                                OPERADOR DE COALESCÊNCIA NULA PARA NÃO TERMOS ERRO DO TEXTEREA, 
                                E PARA COMEÇAR COM VALOR DEFAULT E NÃO SER POSSÍVEL ADICIONAR TEXTO.
                            */}
                        </div>
                    </section>
                    <footer className="flex">
                        <div>
                            Prazo: {props.ticket.Ticket_Types.deadLine} dia(s)
                        </div>
                        |
                        <div className="flex">
                            <Select 
                                size="md" 
                                variant="outlined"
                                value={currentStatus}
                                onChange={handleChangeTicketStatus} 
                                disabled={props.ticket.is_opened && user.rule === props.ticket.Destination_department.id ? false : true}
                            >
                                { 
                                    ticketStatus && ticketStatus.map((status, index) => {
                                        return <Option key={index} value={status.id} disabled={!status.is_choosable}>{status.name}</Option>
                                    })
                                }
                            </Select>
                        </div>
                        |
                        <div className="flex">
                            <Button size="sm" endDecorator={<ChatOutlinedIcon />} color="primary" onClick={handleOpenChatLog}>
                                Abrir ChatLog
                            </Button>
                        </div>
                    </footer>
                </ViewTicketStyle>
                {
                    isOpenedChat && (
                        <ChatLog>
                            <header>
                                {
                                    isOpenedFilter ? 
                                    <IconButton variant="soft" onClick={handleCloseFilter}>
                                        <CloseIcon color="error"/>
                                    </IconButton> : 
                                    <IconButton variant="soft" onClick={handleOpenFilter}>
                                        <FilterListOutlinedIcon color="secondary"/>
                                    </IconButton>
                                }
                                <IconButton variant="soft" onClick={handleCloseChatLog}>
                                    <KeyboardDoubleArrowLeftIcon color="action"/>
                                </IconButton>
                                {
                                    isOpenedFilter && (
                                        <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm', width: 300, position: 'absolute', top: 0, right: 0 }}>
                                            <Typography
                                                id="filter-status"
                                                sx={{
                                                    textTransform: 'uppercase',
                                                    fontSize: 'xs',
                                                    letterSpacing: 'lg',
                                                    fontWeight: 'lg',
                                                    color: 'text.secondary',
                                                    mb: 2,
                                                }}
                                            >
                                                Filtrar Chat
                                            </Typography>
                                            <RadioGroup onChange={handleChangeFilterMessages} value={filterMessagesOnly}>
                                                <List
                                                    sx={{
                                                    minWidth: 240,
                                                        '--List-gap': '0.5rem',
                                                        '--ListItem-paddingY': '1rem',
                                                        '--ListItem-radius': '8px',
                                                        '--ListItemDecorator-size': '32px',
                                                    }}
                                                >
                                                    <ListItem variant="outlined" sx={{ boxShadow: 'sm' }}>
                                                        <ListItemDecorator>
                                                            <ForumIcon color="primary"/>
                                                        </ListItemDecorator>
                                                        <Radio
                                                            overlay
                                                            value="messages"
                                                            label='Somente Mensagens'
                                                            sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                                                            slotProps={{
                                                                action: ({ checked }) => ({
                                                                    sx: (theme) => ({
                                                                        ...(checked && {
                                                                            inset: -1,
                                                                            border: '2px solid',
                                                                            borderColor: theme.vars.palette.primary[500],
                                                                        }),
                                                                    }),
                                                                }),
                                                            }}
                                                        />
                                                    </ListItem>
                                                    <ListItem variant="outlined" sx={{ boxShadow: 'sm' }}>
                                                        <ListItemDecorator>
                                                            <BookIcon color="secondary"/>
                                                        </ListItemDecorator>
                                                        <Radio
                                                            overlay
                                                            value="events"
                                                            label='Somente Eventos'
                                                            sx={{ flexGrow: 1, flexDirection: 'row-reverse' }}
                                                            slotProps={{
                                                                action: ({ checked }) => ({
                                                                    sx: (theme) => ({
                                                                        ...(checked && {
                                                                            inset: -1,
                                                                            border: '2px solid',
                                                                            borderColor: theme.vars.palette.primary[500],
                                                                        }),
                                                                    }),
                                                                }),
                                                            }}
                                                        />
                                                    </ListItem>
                                                    <Button
                                                        variant="outlined"
                                                        color="neutral"
                                                        size="sm"
                                                        sx={{ px: 1.5, mt: 1 }}
                                                        onClick={handleClearFilterChatLog}
                                                    >
                                                        Limpar
                                                    </Button>
                                                </List>
                                            </RadioGroup>
                                        </Sheet>
                                    )
                                }
                            </header>
                            <Divider />
                            <div>
                                <Chat messages={chatLogFiltered} me={user.uid} />
                            </div>
                            <footer>
                                <Textarea
                                    placeholder="Digite aqui..."
                                    onChange={handleMessageChange}
                                    minRows={1}
                                    maxRows={1}
                                    value={message}
                                    disabled={props.ticket.Ticket_status.id === 4 ? true : false}
                                    endDecorator={
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                gap: 'var(--Textarea-paddingBlock)',
                                                pt: 'var(--Textarea-paddingBlock)',
                                                borderTop: '1px solid',
                                                borderColor: 'divider',
                                                flex: 'auto',
                                            }}
                                        >
                                            <IconButton sx={{ ml: 'auto' }} variant="plain" onClick={handleSendMessage}>
                                                <SendIcon color="primary"/>
                                            </IconButton>
                                        </Box>
                                    }
                                />
                            </footer>
                        </ChatLog>
                    )
                }
            </ViewTicketController>
        </Modal>
    )
}
