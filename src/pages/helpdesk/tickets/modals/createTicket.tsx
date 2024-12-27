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
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import Add from '@mui/icons-material/Add';
import { AddModal } from '../../../telecom/FiberNetwork/style';
import { getDepartments } from '../../../../services/apiManageONU/getDepartments';
import { getTicketTypes } from '../../../../services/apiManageONU/getTicketTypes';

export default function CreateTicket({ open, handleClose }: any) {
    const { setFetchResponseMessage } = useResponse();

    const [olts, setOlts] = useState<IOlt[]>([]);
    const [cities, setCities] = useState<ICities[]>([]);
    const [ticketType, setTicketType] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [form, setForm] = useState({
        departmentId: null,
        city: '',
        ticketType: null,
        olt: '',
        location: '',
        status: '',
    });
    
    const [openOlts, setOpenOlts] = useState(false);
    const [openCities, setOpenCities] = useState(false);
    const [openTicketType, setOpenTicketType] = useState(false);
    const [openDepartments, setOpenDepartments] = useState(false);
    
    const loadingOlts = openOlts && olts.length === 0;
    const loadingCities = openCities && cities.length === 0;
    const loadingTicketType = openTicketType && ticketType.length === 0;
    const loadingDepartments = openDepartments && departments.length === 0;

    useEffect(() => {
        let active = true;

        if(!loadingOlts){ return undefined};
        (async () => {
            const res = await getOlt({});
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
            const res = await getTicketTypes(form.departmentId);
            if(active){
                if(res.success){
                    setTicketType(res.responses.response);
                }
            }
        })();

        return () => { active = false; }
    },[loadingTicketType]);

    const handleChange = (_e: any, value: any) => {
        if(value){
            setForm({
                ...form,
                departmentId: value.id
            });
        } else {
            setForm({
                ...form,
                departmentId: value
            });
        }
    }

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="close-modal-title"
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Sheet variant="outlined" sx={{ minWidth: 300, borderRadius: 'md', p: 3 }}>
                    <ModalClose variant="outlined" />
                    <Typography
                        component="h2"
                        id="close-modal-title"
                        level="h4"
                        textColor="inherit"
                        sx={{ fontWeight: 'lg' }}
                    >
                        Novo Ticket
                    </Typography>
                    <AddModal>
                        <Autocomplete
                            name='departmentId'
                            placeholder='Para quem?'
                            open={openDepartments}
                            onOpen={() => { setOpenDepartments(true); }}
                            onClose={() => { setOpenDepartments(false); }}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            getOptionLabel={(option) => option.name}
                            loading={loadingDepartments}
                            options={departments}
                            onChange={handleChange}
                            sx={{ width: 300, marginBottom: '.5rem' }}
                            endDecorator={
                                loadingDepartments ? (
                                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                ) : null
                            }
                        />
                        <Autocomplete
                            placeholder='Qual o problema?'
                            open={openTicketType}
                            onOpen={() => { setOpenTicketType(true); }}
                            onClose={() => { setOpenTicketType(false); }}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            getOptionLabel={(option) => option.name}
                            loading={loadingTicketType}
                            options={ticketType}
                            sx={{ width: 300, marginBottom: '.5rem' }}
                            endDecorator={
                                loadingCities ? (
                                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                ) : null
                            }
                        />
                        <Select placeholder='Tipo'>
                            <Option value="dog">Atendimento</Option>
                            <Option value="cat">Em Projeto</Option>
                        </Select>
                        <div>
                            <Autocomplete
                                placeholder='Cidade'
                                open={openCities}
                                onOpen={() => { setOpenCities(true); }}
                                onClose={() => { setOpenCities(false); }}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                getOptionLabel={(option) => option.name}
                                loading={loadingCities}
                                options={cities}
                                sx={{ width: 300, marginBottom: '.5rem' }}
                                endDecorator={
                                    loadingCities ? (
                                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                    ) : null
                                }
                            />
                            <Autocomplete
                                placeholder='OLT'
                                open={openOlts}
                                onOpen={() => { setOpenOlts(true); }}
                                onClose={() => { setOpenOlts(false); }}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                getOptionLabel={(option) => option.name}
                                loading={loadingOlts}
                                options={olts}
                                sx={{ width: 300, marginBottom: '.2rem' }}
                                endDecorator={
                                    loadingOlts ? (
                                    <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
                                    ) : null
                                }
                            />
                        </div>
                        <Input
                            placeholder="Latitude, Longitude"
                            startDecorator={
                                <Button variant="soft" color="neutral" startDecorator={<LocationOn />}>
                                    Local
                                </Button>
                            }
                            sx={{ width: 300, marginBottom: '.5rem' }}
                        />
                        <Select placeholder='Status'>
                            <Option value="dog">Atendimento</Option>
                            <Option value="cat">Em Projeto</Option>
                        </Select>
                        <Button
                            variant='soft' 
                            startDecorator={<Add />}
                        >
                            Criar equipamento
                        </Button>
                    </AddModal>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}