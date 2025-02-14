import React, { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Autocomplete, { AutocompleteChangeDetails } from '@mui/joy/Autocomplete';
import { IOlt } from '../../../../interfaces/IOlt';
import { getOlt } from '../../../../services/apiManageONU/getOlt';
import CircularProgress from '@mui/joy/CircularProgress';
import { useResponse } from '../../../../hooks/useResponse';
import { ICities } from '../../../../interfaces/ICities';
import { getCities } from '../../../../services/apiManageONU/getCities';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import LocationOn from '@mui/icons-material/LocationOn';

import Add from '@mui/icons-material/Add';

import { getDepartments } from '../../../../services/apiManageONU/getDepartments';
import { getTicketTypes } from '../../../../services/apiManageONU/getTicketTypes';
import { Textarea } from '@mui/joy';
import { getNetworkTopology } from '../../../../services/apiManageONU/getNetworkTopology';
import { useAuth } from '../../../../hooks/useAuth';
import { AddTicketStyle } from '../style';
import { addTicket } from '../../../../services/apiManageONU/addTicket';
import { ITicketsForm, ITicketTypes } from '../../../../interfaces/ITickets';

export function CreateTicket({ open, handleClose }: any) {
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [cities, setCities] = useState<ICities[]>([]);
    const [ticketType, setTicketType] = useState<ITicketTypes[]>([]);
    const [departments, setDepartments] = useState<IDepartments[]>([]);
    const [fiberNetwork, setFiberNetwork] = useState<IFiberNetwork[]>([]);
    const [form, setForm] = useState<ITicketsForm>({
        userId: user!.uid,
        originDepartmentId: user!.rule,
        destinationDepartmentId: null,
        cityId: 0 || null,
        ticketTypeId: null,
        ctoId: 0 || null,
        localization: '',
        description: '',
    });

    const [openCities, setOpenCities] = useState(false);
    const [openTicketType, setOpenTicketType] = useState(false);
    const [openDepartments, setOpenDepartments] = useState(false);
    const [openFiberNetwork, setOpenFiberNetwork] = useState(false);
    const [ticketTypeDisabled, setTicketTypeDisabled] = useState(true);
    const [fiberNetworkDisabled, setFiberNetworkDisabled] = useState(true);
    
    const loadingCities = openCities && cities.length === 0;
    const loadingTicketType = openTicketType && ticketType.length === 0;
    const loadingDepartments = openDepartments && departments.length === 0;
    const loadingFiberNetwork = openFiberNetwork && fiberNetwork.length === 0; 

    useEffect(() => {
        let active = true;
        if(!loadingCities){ return undefined};
        (async () => {
            const res = await getCities();
            if(active){
                if(res && res.success){
                    setCities(res.responses.response);
                }
            }
        })();

        return () => { active = false; }
    },[loadingCities]);

    useEffect(() => {
        let active = true;

        if(!loadingDepartments){ return undefined};
        (async () => {
            const res = await getDepartments();
            if(active){
                if(res.success){
                    setDepartments(res.responses.response);
                }
            }
        })();

        return () => { active = false; }
    },[loadingDepartments]);

    useEffect(() => {
        let active = true;

        if(!loadingTicketType){ return undefined};
        (async () => {
            const res = await getTicketTypes(form.destinationDepartmentId);
            if(active){
                if(res.success){
                    setTicketType(res.responses.response);
                }
            }
        })();

        return () => { active = false; }
    },[loadingTicketType]);

    useEffect(() => {
        let active = true;

        if(!loadingFiberNetwork){ return undefined};
        (async () => {
            const res = await getNetworkTopology({cityId: form.cityId!});
            if(active){
                if(res.success){
                    setFiberNetwork(res.responses.response);
                }
            }
        })();

        return () => { active = false; }
    },[loadingFiberNetwork]);

    useEffect(() => { 
        setTicketType([]);
        setForm({...form, ticketTypeId: null}); 
        form.destinationDepartmentId !== null ? setTicketTypeDisabled(false) : setTicketTypeDisabled(true);
    },[form.destinationDepartmentId]);

    useEffect(() => { 
        setFiberNetwork([]);
        setForm({...form, ctoId: null}); 
        form.cityId !== null ? setFiberNetworkDisabled(false) : setFiberNetworkDisabled(true);
    },[form.cityId]);

    const handleChangeDepartment = (_e: unknown, value: IDepartments | null) => {
        value ? setForm({...form, destinationDepartmentId: value.id}) : setForm({...form, destinationDepartmentId: value});
    }

    const handleChangeCity = (_e: unknown, value: ICities | null) => {
        value ? setForm({...form, cityId: value.id}) : setForm({...form, cityId: value});
    }

    const handleChangeFiberNetwork = (_e: unknown, value: IFiberNetwork | null) => {
        value ? setForm({...form, ctoId: value.id}) : setForm({...form, ctoId: value});
    }

    const handleChangeTicketType = (_e: unknown, value: ITicketTypes | null) => {
        value ? setForm({...form, ticketTypeId: value.id}) : setForm({...form, ticketTypeId: value});
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await addTicket(form);
        if(response){
            if(response.success){
                handleClose();
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
                open={open}
                onClose={handleClose}
            >
                <Sheet variant="outlined" sx={{ minWidth: 300, borderRadius: 'md', p: 3 }}>
                    <ModalClose variant="outlined" />
                    <Typography
                        component="h2"
                        level="h4"
                        textColor="inherit"
                        sx={{ fontWeight: 'lg' }}
                    >
                        Novo Ticket
                    </Typography>
                    <AddTicketStyle onSubmit={handleSubmit}>
                        <Autocomplete
                            placeholder='Para quem?'
                            open={openDepartments}
                            onOpen={() => { setOpenDepartments(true); }}
                            onClose={() => { setOpenDepartments(false); }}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            getOptionLabel={(option) => option.name}
                            loading={loadingDepartments}
                            options={departments}
                            onChange={handleChangeDepartment}
                            sx={{ marginBottom: '.5rem' }}
                            endDecorator={
                                loadingDepartments ? (
                                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                ) : null
                            }
                        />
                        <Autocomplete
                            placeholder='Qual o problema?'
                            disabled={ticketTypeDisabled}
                            open={openTicketType}
                            onOpen={() => { setOpenTicketType(true); }}
                            onClose={() => { setOpenTicketType(false); }}
                            onChange={handleChangeTicketType}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            getOptionLabel={(option) => option.name}
                            loading={loadingTicketType}
                            options={ticketType}
                            sx={{ marginBottom: '.5rem' }}
                            endDecorator={
                                loadingTicketType ? (
                                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                ) : null
                            }
                        />
                        <div>
                            <Autocomplete
                                placeholder='Cidade'
                                open={openCities}
                                onOpen={() => { setOpenCities(true); }}
                                onClose={() => { setOpenCities(false); }}
                                onChange={handleChangeCity}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                getOptionLabel={(option) => option.name}
                                loading={loadingCities}
                                options={cities}
                                sx={{ marginBottom: '.5rem' }}
                                endDecorator={
                                    loadingCities ? (
                                        <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                    ) : null
                                }
                            />
                        </div>
                        <Autocomplete
                            placeholder='CTO'
                            open={openFiberNetwork}
                            disabled={fiberNetworkDisabled}
                            onOpen={() => { setOpenFiberNetwork(true); }}
                            onClose={() => { setOpenFiberNetwork(false); }}
                            onChange={handleChangeFiberNetwork}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            getOptionLabel={(option) => option.name}
                            loading={loadingFiberNetwork}
                            options={fiberNetwork}
                            sx={{ marginBottom: '.2rem' }}
                            endDecorator={
                                loadingFiberNetwork ? (
                                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                ) : null
                            }
                        />
                        <Input
                            name='localization'
                            placeholder="Localização"
                            onChange={handleChange}
                            sx={{ marginBottom: '.5rem' }}
                            startDecorator={
                                <Button variant="soft" color="neutral" startDecorator={<LocationOn />}></Button>
                            }

                        />
                        <Textarea 
                            name="description"
                            onChange={handleChange} 
                            placeholder="Descrição"
                            variant="outlined" 
                            minRows={3}    
                        />
                        <Button
                            startDecorator={<Add />}
                            variant='soft'
                            type='submit'
                        >
                            Gerar Ticket
                        </Button>
                    </AddTicketStyle>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}