import React, { useEffect, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Autocomplete from '@mui/joy/Autocomplete';
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

export default function AddTicket({ open, handleClose }: any) {
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [olts, setOlts] = useState<IOlt[]>([]);
    const [cities, setCities] = useState<ICities[]>([]);
    const [ticketType, setTicketType] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [fiberNetwork, setFiberNetwork] = useState([]);
    const [form, setForm] = useState({
        userId: user?.uid,
        originDepartmentId: user?.rule,
        destinationDepartmentId: null,
        cityId: null,
        ticketTypeId: null,
        oltId: null,
        ctoId: null,
        location: '',
        description: '',
    });

    const [openOlts, setOpenOlts] = useState(false);
    const [openCities, setOpenCities] = useState(false);
    const [openTicketType, setOpenTicketType] = useState(false);
    const [openDepartments, setOpenDepartments] = useState(false);
    const [openFiberNetwork, setOpenFiberNetwork] = useState(false);
    const [ticketTypeDisabled, setTicketTypeDisabled] = useState(true);
    const [oltDisabled, setOltDisabled] = useState(true);
    const [fiberNetworkDisabled, setFiberNetworkDisabled] = useState(true);
    
    const loadingOlts = openOlts && olts.length === 0;
    const loadingCities = openCities && cities.length === 0;
    const loadingTicketType = openTicketType && ticketType.length === 0;
    const loadingDepartments = openDepartments && departments.length === 0;
    const loadingFiberNetwork = openFiberNetwork && fiberNetwork.length === 0; 

    useEffect(() => {
        let active = true;
        
        if(!loadingOlts){ return undefined};
        (async () => {
            const res = await getOlt({id: form.cityId, vlans: false});
            if(active){
                if(res.success){
                    setOlts(res.responses.response);
                }
            }
        })();

        return () => { active = false; }
    },[loadingOlts]);

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
            const res = await getNetworkTopology({oltId: form.oltId});
            if(active){
                if(res.success){
                    setFiberNetwork(res.responses.response);
                }
            }
        })();

        return () => { active = false; }
    },[loadingFiberNetwork]);

    useEffect(() => { 
        setOlts([]);
        setForm({...form, oltId: null});
        form.cityId !== null ? setOltDisabled(false) : setOltDisabled(true);
    },[form.cityId]);

    useEffect(() => { 
        setTicketType([]);
        setForm({...form, ticketTypeId: null}); 
        form.departmentId !== null ? setTicketTypeDisabled(false) : setTicketTypeDisabled(true);
    },[form.departmentId]);

    useEffect(() => { 
        setFiberNetwork([]);
        setForm({...form, ctoId: null});
        form.oltId !== null ? setFiberNetworkDisabled(false) : setFiberNetworkDisabled(true);
    },[form.oltId]);

    const handleChangeDepartment = (_e: any, value: any) => {
        value ? setForm({...form, destinationDepartmentId: value.id}) : setForm({...form, destinationDepartmentId: value});
    }

    const handleChangeCity = (_e: any, value: any) => {
        value ? setForm({...form, cityId: value.id}) : setForm({...form, cityId: value});
    }

    const handleChangeOlt = (_e: any, value: any) => {
        value ? setForm({...form, oltId: value.id}) : setForm({...form, oltId: value});
    }

    const handleChangeFiberNetwork = (_e: any, value: any) => {
        value ? setForm({...form, ctoId: value.id}) : setForm({...form, ctoId: value});
    }

    const handleChangeTicketType = (_e: any, value: any) => {
        value ? setForm({...form, ticketTypeId: value.id}) : setForm({...form, ticketTypeId: value});
    }

    const handleChange = (e: any) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(form);

        const response = await addTicket(form);
        if(response){
            if(response.success){
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
                            <Autocomplete
                                placeholder='OLT'
                                open={openOlts}
                                disabled={oltDisabled}
                                onOpen={() => { setOpenOlts(true); }}
                                onClose={() => { setOpenOlts(false); }}
                                onChange={handleChangeOlt}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                getOptionLabel={(option) => option.name}
                                loading={loadingOlts}
                                options={olts}
                                sx={{ marginBottom: '.2rem' }}
                                endDecorator={
                                    loadingOlts ? (
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
                                loadingOlts ? (
                                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                ) : null
                            }
                        />
                        <Input
                            name='location'
                            placeholder="Localização"
                            onChange={handleChange}
                            startDecorator={
                                <Button variant="soft" color="neutral" startDecorator={<LocationOn />}></Button>
                            }
                            sx={{ marginBottom: '.5rem' }}
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