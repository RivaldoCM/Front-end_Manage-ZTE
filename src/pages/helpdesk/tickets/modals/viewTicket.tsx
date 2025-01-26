import { Box, Button, Checkbox, Divider, IconButton, List, ListItem, ListItemDecorator, Modal, ModalClose, Option, Radio, RadioGroup, Select, Sheet, Textarea, Typography } from "@mui/joy";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useResponse } from "../../../../hooks/useResponse";
import { ChatLog, ViewTicketController, ViewTicketStyle } from "../style";
import { ITickets } from "../../../../interfaces/ITickets";
import dayjs from "dayjs";
import { updateTicket } from "../../../../services/apiManageONU/updateTicket";
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
    const { setFetchResponseMessage } = useResponse();

    const [isOpenedChat, setIsOpenedChat] = useState(false);
    const [isOpenedFilter, setIsOpenedFilter] = useState(false);

    const [filterStatus, setFilterStatus] = useState('')

    useEffect(() => {
        async function updateData(){
            if(!props.ticket.is_viwed && user.rule === props.ticket.Destination_department.id){
                await updateTicket({ ticketId: props.ticket.id, isViwed: true});
            }
        }
        updateData();
    }, []);


    const handleFilterChange = (e: any) => { setFilterStatus(e.target.value); }
    const handleClearFilter = () => { setFilterStatus(''); }

    const handleOpenChatLog = () => setIsOpenedChat(true);
    const handleCloseChatLog = () => setIsOpenedChat(false);
    const handleOpenFilter = () => setIsOpenedFilter(true);
    const handleCloseFilter = () => setIsOpenedFilter(false);

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
                        <p>{props.ticket.Ticket_Types.name}</p>
                        <ModalClose variant="outlined" />
                    </header>
                    <section>
                        <div>
                            <PushPinOutlinedIcon fontSize="small" color="secondary"/>
                            {props.ticket.User_appropriated_by?.name}
                        </div>
                        <div>
                            <p> Aberto por: {props.ticket.User_created_by.name} </p>
                            <p><CalendarMonthIcon fontSize="small" color="secondary"/> {dayjs(props.ticket.created_at).add(3, "hour").format('DD/MM/YY [às] HH:mm') + 'hrs'}</p>
                        </div>
                        <div>

                        </div>
                        <div>
                            <p>Descrição:</p>
                            <Textarea placeholder="Descrição" minRows={3} disabled value={props.ticket.description}/>
                        </div>
                        
                    </section>
                    <footer className="flex">
                        <div>
                            Prazo:
                        </div>
                        |
                        <div className="flex">
                            <Select size="md" variant="outlined">
                                <Option value="dog">Dog</Option>
                                <Option value="cat">Cat</Option>
                                <Option value="fish">Fish</Option>
                                <Option value="bird">Bird</Option>
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
                                            <RadioGroup onChange={handleFilterChange} value={filterStatus}>
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
                                                            value='onlyMessages'
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
                                                            value='onlyLogs'
                                                            label='Somente Registros'
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
                                                        onClick={handleClearFilter}
                                                    >
                                                        Limpar seleção
                                                    </Button>
                                                </List>
                                            </RadioGroup>
                                        </Sheet>
                                    )
                                }
                            </header>
                            <Divider />
                            <div>

                            </div>
                            <footer>
                                <Textarea
                                    placeholder="Digite aqui..."
                                    minRows={1}
                                    maxRows={1}
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
                                            <IconButton sx={{ ml: 'auto' }} variant="plain">
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
