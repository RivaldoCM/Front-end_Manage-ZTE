import React, { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Autocomplete, { AutocompleteChangeDetails } from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import { useResponse } from '../../../../hooks/useResponse';
import { ICities } from '../../../../interfaces/ICities';
import { getCities } from '../../../../services/apiManageONU/getCities';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import LocationOn from '@mui/icons-material/LocationOn';

import { getTicketTypes } from '../../../../services/apiManageONU/getTicketTypes';
import { Option, Select, Textarea } from '@mui/joy';
import { getNetworkTopology } from '../../../../services/apiManageONU/getNetworkTopology';
import { useAuth } from '../../../../hooks/useAuth';
import { AddTicketStyle, FinishTicketStyle } from '../style';
import { addTicket } from '../../../../services/apiManageONU/addTicket';
import { ITickets, ITicketsForm, ITicketTypes } from '../../../../interfaces/ITickets';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SelectChangeEvent } from '@mui/material';
import { updateTicket } from '../../../../services/apiManageONU/updateTicket';

type EditTicketPropsLocal = {
    open: boolean;
    ticket: ITickets;
    handleClose: () => void;
}

export default function FinishTicket(props: EditTicketPropsLocal) {
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [cities, setCities] = useState<ICities[]>([]);
    const [ticketType, setTicketType] = useState<ITicketTypes[]>([]);
    const [fiberNetwork, setFiberNetwork] = useState<IFiberNetwork[]>([]);
    const [form, setForm] = useState<ITicketsForm>({
        userId: user?.uid,
        ticketId: props.ticket.id,
        originDepartmentId: user?.rule,
        destinationDepartmentId: props.ticket.Destination_department.id,
        cityId: props.ticket.Tickets_city.id,
        ticketTypeId: props.ticket.Ticket_Types.id,
        ctoId: props.ticket.Tickets_cto ? props.ticket.Tickets_cto.id : null,
        localization: props.ticket.localization,
        description: props.ticket.description,
    });

    useEffect(() => {
        async function getData(){
            const problemTypeData = getTicketTypes(props.ticket.Destination_department.id);
            const citiesData = getCities();
            const getCtos = getNetworkTopology({cityId: props.ticket.Tickets_city.id});
            const [ticketType, cities, ctos] = await Promise.all([problemTypeData, citiesData, getCtos]);

            if(ticketType && ticketType.success) setTicketType(ticketType.responses.response);
            if(cities && cities.success) setCities(cities.responses.response);
            if(ctos && ctos.success) setFiberNetwork(ctos.responses.response);
        }
        getData(); 
    }, []);

    useEffect(() => {
        async function getData(){
            const getCtos = await getNetworkTopology({cityId: form.cityId!});
            if(getCtos && getCtos.success) setFiberNetwork(getCtos.responses.response);
        }
        getData(); 
    },[form.cityId]);

    const handleChangeType = (_e: unknown, value: number | null) => { setForm({...form, ticketTypeId: value}); }
    const handleChangeCity = (_e: unknown, value: number | null) => { setForm({...form, cityId: value}); }
    const handleChangeCto = (_e: unknown, value: number | null) => { setForm({...form, ctoId: value}); }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await updateTicket(form);
        if(response){
            if(response.success){
                props.handleClose();
                setFetchResponseMessage(response.responses.status);
            } else {
                setFetchResponseMessage(response.messages.message);
            }
        } else {
            setFetchResponseMessage('error/no-connection-with-API');
        }
    }

    return (
        <React.Fragment>
            <Modal
                className="flex"
                open={props.open}
                onClose={props.handleClose}
            >
                <Sheet variant="outlined" sx={{ minWidth: 300, borderRadius: 'md', p: 3 }}>
                    <ModalClose variant="outlined" />
                    <Typography
                        component="h2"
                        level="h4"
                        textColor="inherit"
                        sx={{ fontWeight: 'lg' }}
                    >
                        Ticket {props.ticket.id}
                    </Typography>
                    <FinishTicketStyle>
                        {
                            /*
                                SE PRECISAR CONFIGURO ISSO AQ, ATE O MOMENTO VAI SÓ MARCAR COMO FINALIZAR E PRONTO.
                            */
                        }
                    </FinishTicketStyle>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}