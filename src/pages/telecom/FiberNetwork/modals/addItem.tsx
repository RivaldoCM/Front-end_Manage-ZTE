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
import { AddModal } from '../style';
import Add from '@mui/icons-material/Add';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';

export default function AddItemModal({ open, handleClose }: any) {
    const { setFetchResponseMessage } = useResponse();

    const [olts, setOlts] = useState<IOlt[]>([]);
    const [cities, setCities] = useState<ICities[]>([]);
    
    const [openOlts, setOpenOlts] = useState(false);
    const [openCities, setOpenCities] = useState(false);
    
    const loadingOlts = openOlts && olts.length === 0;
    const loadingCities = openCities && cities.length === 0;

    useEffect(() => {
        let active = true;

        if(!loadingOlts){ return undefined};
        (async () => {
            const res = await getOlt({vlans: false});
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
                        Adicionar equipamento
                    </Typography>
                    <AddModal>
                        <div>
                            <Input size="sm" placeholder="Nome" />
                            <Input 
                                type='number' 
                                placeholder="N°"
                                sx={{ width: 80 }}
                            />
                        </div>
                        <Select placeholder='Tipo'>
                            <Option value="dog">Atendimento</Option>
                            <Option value="cat">Em Projeto</Option>
                        </Select>
                        <Input
                            type='number'
                            startDecorator={
                                <Button variant="soft" color="neutral" startDecorator={<LocationOn />}>
                                    Portas
                                </Button>
                            }
                            sx={{ width: 180, marginBottom: '.5rem' }}
                        />
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
                            <div className='flex'>
                                <Input 
                                    type='number' 
                                    placeholder="Placa"
                                    sx={{ width: 100, marginRight: '.5rem' }}
                                />
                                <Input 
                                    type='number' 
                                    placeholder="Pon"
                                    sx={{ width: 100, marginRight: '.5rem' }}
                                />
                                <Checkbox label="Ativo?" variant='outlined' size="md" />
                            </div>
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