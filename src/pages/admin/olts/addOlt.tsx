import { useEffect, useState } from "react";

import { useResponse } from "../../../hooks/useResponse";
import { Inputs, InputsWrapper, OltStyledContainer, VlanConfig } from "./style";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { getCities } from "../../../services/apiManageONU/getCities";
import { ICities } from "../../../interfaces/ICities";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getOltManufacturer } from "../../../services/apiManageONU/getOltManufacturer";
import { getOltModel } from "../../../services/apiManageONU/getOltModel";

import CheckIcon from '@mui/icons-material/Check';
import { isValidIp } from "../../../config/regex";

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { addOlt } from "../../../services/apiManageONU/addOlt";
import { getOlt } from "../../../services/apiManageONU/getOlt";
import { useNavigate } from "react-router-dom";

export function AddOlt(){
    const navigate = useNavigate();
    const { setFetchResponseMessage } = useResponse();

    const [showPassword, setShowPassword] = useState(false);
    const [showGeponPassword, setShowGeponPassword] = useState(false);
    const [showEnableGeponPassword, setShowEnableGeponPassword] = useState(false);
    const [ipValid, setIpValid] = useState(null as Boolean | null );
    const [cities, setCities] = useState<ICities[]>([]);
    const [models, setModels] = useState<IOltModels[]>([]);
    const [manufacturers, setManufacturers] = useState<IOltManufacturer[]>([]);
    const [vlans, setVlans] = useState<IVlans[]>([]);
    const [form, setForm] = useState({
        host: '',
        cityId: 1,
        name: '',
        manufacturerId: 1,
        modelId: 1,
        telnetUser: '',
        telnetPassword: '',
        geponUser: '',
        geponPassword: '',
        geponEnablePassword: '',
        isActive: true,
        voalleId: undefined as number | undefined,
        formatVlanConfig: 1,
        vlan: '',
        modifySlot: 1,
        modifyVlan: 0
    });

    useEffect(() => {
        async function getData(){
            const getCity = getCities();
            const getModel = getOltModel();
            const getManufacturer = getOltManufacturer();

            const [cities, models, manufacturers] = await Promise.all([getCity, getModel, getManufacturer]);
            cities && cities.success ? setCities(cities.responses.response) : setCities([]);
            models && models.success ? setModels(models.responses.response) : setModels([]);
            manufacturers && manufacturers.success ? setManufacturers(manufacturers.responses.response) : setManufacturers([]);
        }
        getData();
    }, []);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowGeponPassword = () => setShowGeponPassword((show) => !show);
    const handleClickShowEnableGeponPassword = () => setShowEnableGeponPassword((show) => !show);
    const handleMouseDownPassword = (event: any) => {event.preventDefault();};

    const handleMouseDownFormIp = async () => {
        //verifica se tem OLT's com o mesmo IP.
        if(form.host !== '' && form.host.match(isValidIp)){
            const response = await getOlt({host: form.host});
            if(response){
                if(response.success){
                    if(response.responses.response){
                        setFetchResponseMessage(response.responses.status);
                    }
                    setIpValid(!response.responses.response);
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }
        } else{
            setIpValid(false);
        }
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number | boolean | null>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleGenerateConfig = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let modelSlot = 0, modelPon = 0, vlans: IVlans[] = [];

        if(form.modelId){
            models.map((model) => {
                if(model.id === form.modelId){
                    modelSlot = model.slots,
                    modelPon = model.pons
                }
            });

            if(form.formatVlanConfig === 1){
                for(let slots = 1; slots <= modelSlot; slots++){
                    for(let pons = 1; pons <= modelPon; pons++){
                        vlans.push({slot: slots, pon: pons, vlan: null});
                    }
                }
            }else if(form.formatVlanConfig === 2){
                for(let slots = 1; slots <= modelSlot; slots++){
                    for(let pons = 1; pons <= modelPon; pons++){
                        vlans.push({slot: slots, pon: pons, vlan: parseInt(form.vlan)});
                    }
                }
            }else if(form.formatVlanConfig === 3){
                for(let slots = 1; slots <= modelSlot; slots++){
                    for(let pons = 1; pons <= modelPon; pons++){
                        vlans.push({slot: slots, pon: pons, vlan: parseInt(form.vlan) + pons});
                    }
                }
            }else{
                for(let slots = 1; slots <= modelSlot; slots++){
                    for(let pons = 1; pons <= modelPon; pons++){
                        vlans.push({slot: slots, pon: pons, vlan: parseInt(form.vlan) + slots});
                    }
                }
            }
            setVlans(vlans);
        } else {
            setFetchResponseMessage('error/missing-fields');
        }
    }

    const handleChangeVlan = (index: number) => (event: any) => {
        if(event.target.value === ''){
            const newVlans = [...vlans];
            newVlans[index] = {
                ...newVlans[index],
                vlan: null
            };
            setVlans(newVlans);
        } else {
            const newVlans = [...vlans];
            newVlans[index] = {
                ...newVlans[index],
                vlan: parseInt(event.target.value)
            };
            setVlans(newVlans);
        }
    }

    const generateSlotOptions = () => {
        let modelSlot = 0 , items = [];

        models.map((model) => {
            if(model.id === form.modelId){
                modelSlot = model.slots
            }
        });

        for(let slot = 1; slot <= modelSlot; slot++) {
            items.push(<MenuItem key={slot} value={slot}>{slot}</MenuItem>);
        }
      
        return(
            [items]
        );
    }

    const handleModifyVlan = (e: any) => {
        e.preventDefault();
        const newVlans = vlans.map((value) => {
            if(form.modifySlot === value.slot){
                return { ...value, vlan: form.modifyVlan};
            }
            return {...value}
        });
        setVlans(newVlans);
    }

    const handleSubmit = async () => {
        if(!form.name || !form.modelId || !form.host || !form.telnetUser || !form.telnetPassword || vlans.length === 0){
            setFetchResponseMessage('error/missing-fields');
        } else {
            if(!ipValid){
                setFetchResponseMessage('error/incorrect-fields');
            } else {
                const {vlan, formatVlanConfig, modifySlot, modifyVlan, ...dataForm} = form;
                const response = await addOlt(dataForm, vlans);
                if(response){
                    if(response.success){
                        setFetchResponseMessage(response.responses.status);
                        navigate('/olts');
                    } else {
                        setFetchResponseMessage(response.messages.message);
                    }
                } else {
                    setFetchResponseMessage('error/no-connection-with-API');
                }
            }
        }
    }

    return(
        <OltStyledContainer className="flex">
            <div>
                <Button
                    endIcon={<CheckIcon />} 
                    variant="contained" 
                    color="success"
                    size="small"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Salvar OLT
                </Button>
            </div>
            <div className="wrapper flex">
                <InputsWrapper className="flex">
                    <h4>Configurações gerais</h4>
                    <Inputs>
                        <div>
                            <TextField
                                required
                                name="name"
                                label="Nome da OLT"
                                value={form.name}
                                onChange={handleFormChange}
                                sx={{ width: '264px' }}
                            />
                            <FormControl>
                                <InputLabel>Cidade</InputLabel>
                                <Select
                                    required
                                    name="cityId"
                                    label="Cidade"
                                    value={form.cityId || ''}
                                    onChange={handleFormChange}
                                >
                                    {
                                        cities.map((city, index) => {
                                            return(
                                                <MenuItem value={city.id} key={index}>{city.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    required
                                    name="isActive"
                                    label="Status"
                                    value={form.isActive}
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value={true}>Ativo</MenuItem>
                                    <MenuItem value={false}>Desativado</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl>
                                <InputLabel>Fabricante</InputLabel>
                                <Select
                                    required
                                    name="manufacturerId"
                                    label="Fabricante"
                                    value={form.manufacturerId || ''}
                                    onChange={handleFormChange}
                                    sx={{ width: '148px' }}
                                >
                                    {
                                        manufacturers.map((item, index) => {
                                            return(
                                                <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel>Modelo</InputLabel>
                                <Select
                                    required
                                    name="modelId"
                                    label="Modelo"
                                    value={form.modelId}
                                    onChange={handleFormChange}
                                    sx={{ width: '148px' }}
                                >
                                    {
                                        models.map((model, index) => {
                                            if(model.manufacturer_id === form.manufacturerId){
                                                return(
                                                    <MenuItem value={model.id} key={index}>{model.model}</MenuItem>
                                                )
                                            }
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                type="number"
                                name="voalleId"
                                label="Ponto de acesso"
                                value={form.voalleId}
                                onChange={handleFormChange}
                                sx={{ m: 1, width: '200px' }}
                            />
                        </div>
                    </Inputs>
                </InputsWrapper>
                <InputsWrapper className="flex">
                    <h4>Configurações de Acesso</h4>
                    <Inputs>
                        <div className="ip-validation">
                            <TextField
                                required
                                name="host"
                                label="IP da OLT" 
                                value={form.host}
                                onBlur={handleMouseDownFormIp}
                                onChange={handleFormChange}
                                sx={{ width: '264px' }}
                            />
                            {
                                (
                                    ipValid == null ? 
                                        <></> 
                                    :
                                        ipValid ? 
                                            <CheckCircleOutlineIcon color="success"/>
                                        : 
                                            <HighlightOffIcon color="error"/>
                                )
                            }
                        </div>
                        <div className="login-info flex">
                            <TextField 
                                name="telnetUser"
                                label="Usuário SSH/Telnet"
                                value={form.telnetUser}
                                onChange={handleFormChange}
                                sx={{ m: 1, width: '264px' }}
                            />
                            <FormControl sx={{ m: 1, width: '264px' }} variant="outlined">
                                <InputLabel>Senha SSH/Telnet</InputLabel>
                                <OutlinedInput
                                    name="telnetPassword"
                                    label="Senha SSH/Telnet" 
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.telnetPassword}
                                    onChange={handleFormChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                        <div className="login-info flex">
                            <TextField 
                                name="geponUser"
                                label="Usuário GEPON"
                                value={form.geponUser}
                                onChange={handleFormChange}
                                sx={{ m: 1, width: '264px' }}
                            />
                            <FormControl sx={{ m: 1, width: '264px' }} variant="outlined">
                                <InputLabel>Senha GEPON</InputLabel>
                                <OutlinedInput
                                    name="geponPassword"
                                    label="Senha GEPON" 
                                    type={showGeponPassword ? 'text' : 'password'}
                                    value={form.geponPassword}
                                    onChange={handleFormChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={handleClickShowGeponPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showGeponPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl sx={{ m: 1, width: '264px' }} variant="outlined">
                                <InputLabel>Senha enable GEPON</InputLabel>
                                <OutlinedInput
                                    name="geponEnablePassword"
                                    label="Senha enable GEPON" 
                                    type={showEnableGeponPassword ? 'text' : 'password'}
                                    value={form.geponEnablePassword}
                                    onChange={handleFormChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={handleClickShowEnableGeponPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showEnableGeponPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                    </Inputs>
                </InputsWrapper>
            </div>
            <VlanConfig className="flex">
                <h3>Mapeamento de VLAN's</h3>
                <div>
                    <aside>
                        <div className="actions flex">
                            <h4>AÇÕES</h4>
                            <div className="form-wrapper flex">
                                <div>
                                    <h5>Modelo de configuração de VLAN's</h5>
                                </div>
                                <form className="flex" onSubmit={handleGenerateConfig}>
                                    <TextField
                                        type="number"
                                        name="vlan"
                                        label="VLAN"
                                        value={form.vlan}
                                        onChange={handleFormChange}
                                        sx={{ width: '100px' }}
                                    />
                                    <FormControl sx={{ width: '180px' }}>
                                        <InputLabel>Configuração de VLAN</InputLabel>
                                        <Select
                                            name='formatVlanConfig'
                                            label="Configuração de VLAN"
                                            value={form.formatVlanConfig}
                                            onChange={handleFormChange}
                                        >
                                            <MenuItem value={1}>Manual</MenuItem>
                                            <MenuItem value={2}>vlan única</MenuItem>
                                            <MenuItem value={3}>vlan {form.vlan} + pon</MenuItem>
                                            <MenuItem value={4}>vlan {form.vlan} + placa</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button variant="contained" color="success" size="small" type="submit">
                                        Aplicar
                                    </Button>
                                </form>
                            </div>
                            {
                                vlans.length > 0 && (
                                    <div className="form-wrapper flex">
                                        <div>
                                            <h5>Modificar VLAN por PLACA</h5>
                                        </div>
                                        <form className="flex" onSubmit={handleModifyVlan}>
                                            <FormControl sx={{ width: '100px' }}>
                                                <InputLabel>Placa</InputLabel>
                                                <Select
                                                    name='modifySlot'
                                                    label="Placa"
                                                    value={form.modifySlot}
                                                    onChange={handleFormChange}
                                                >
                                                    { generateSlotOptions() }
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                required
                                                type="number"
                                                name="modifyVlan"
                                                label="Nova VLAN"
                                                value={form.modifyVlan}
                                                onChange={handleFormChange}
                                                sx={{ width: '100px' }}
                                            />
                                            <Button variant="contained" color="success" size="small" type="submit">
                                                Aplicar
                                            </Button>
                                        </form>
                                    </div>
                                )
                            }
                        </div>
                    </aside>
                    <div className="table-wrapper flex">
                        {
                            vlans.length > 0 && (
                                <div className="table-controller">
                                    <table>
                                        <tr>
                                            <th>Placa</th>
                                            <th>Pon</th>
                                            <th>Vlan</th>
                                        </tr>
                                        {
                                            vlans.map((vlans, index) => {
                                                return(
                                                    <tr>
                                                        <td>{vlans.slot}</td>
                                                        <td>{vlans.pon}</td>
                                                        <td>
                                                            <input
                                                                value={vlans.vlan || ''}
                                                                onChange={handleChangeVlan(index)}
                                                            />
                                                        </td>
                                                    </tr>
                                                )   
                                            })
                                        }
                                    </table>
                                </div>
                                
                            )
                        }
                    </div>
                </div>
            </VlanConfig>
        </OltStyledContainer>
    )
}