import { useEffect, useState } from "react";

import { useResponse } from "../../../hooks/useResponse";
import { AccessConfig, BasicConfig, Inputs, OltStyledContainer, Title, VlanConfig } from "./style";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { getCities } from "../../../services/apiManageONU/getCities";
import { ICities } from "../../../interfaces/ICities";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getOltManufacturer } from "../../../services/apiManageONU/getOltManufacturer";
import { getOltModel } from "../../../services/apiManageONU/getOltModel";

export function AddOlt(){
    const { setFetchResponseMessage } = useResponse();

    const [showPassword, setShowPassword] = useState(false);
    const [cities, setCities] = useState<ICities[]>([]);
    const [models, setModels] = useState<IOltModels[]>([]);
    const [manufacturers, setManufacturers] = useState<IOltManufacturer[]>([]);
    const [vlans, setVlans] = useState<IVlans[]>([]);
    const [action, setAction] = useState({
        deleteSlot: 1,
        deletePon: 0,
        createSlot: 0,
        createPon: 0,
        modifySlot: 1,
        modifyVlan: 0
    });
    const [form, setForm] = useState({
        ip: '',
        cityId: 1,
        name: '',
        type: 1,
        model: null,
        sshUser: '',
        sshPassword: '',
        geponUser: '',
        geponPassword: '',
        isActive: true,
        voalleAccessPointId: '',
        isPizzaBox: false,
        formatVlanConfig: 1,
        vlan: ''
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
    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    const handleFormChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleActionValuesChange = (e: any) => {
        setAction({
            ...action,
            [e.target.name]: e.target.value
        });
    }

    const handleGenerateConfig = (e: any) => {
        e.preventDefault();
        let modelSlot = 0, modelPon = 0, vlans: IVlans[] = [];

        if(form.model){
            models.map((model) => {
                if(model.id === form.model){
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
            console.log('NAO')
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
        let items = [];

        for(let slot = 1; slot <slot; slot++) {
            items.push(<MenuItem key={slot} value={slot}>{slot}</MenuItem>);
        }
      
        return(
            [items]
        );
    }

    const handleModifyVlan = (e: any) => {
        e.preventDefault();
        const teste = vlans.map((value) => {
            if(action.modifySlot === value.slot){
                return { ...value, vlan: action.modifyVlan};
            }
            return {...value}
        });
    }

    return(
        <OltStyledContainer className="flex">
            <div className="wrapper flex">
                <BasicConfig className="flex">
                    <Title className="title"><p>Configurações gerais</p></Title>
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
                                    value={form.cityId}
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
                                    name="type"
                                    label="Fabricante"
                                    value={form.type}
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
                                    name="model"
                                    label="Modelo"
                                    value={form.model}
                                    onChange={handleFormChange}
                                    sx={{ width: '148px' }}
                                >
                                    {
                                        models.map((model, index) => {
                                            if(model.manufacturer_id === form.type){
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
                                name="voalleAccessPointId"
                                label="Ponto de acesso Voalle"
                                value={form.voalleAccessPointId}
                                onChange={handleFormChange}
                                sx={{ m: 1, width: '224px' }}
                            />
                        </div>
                    </Inputs>
                </BasicConfig>
                <AccessConfig className="flex">
                    <Title className="title"><p>Configurações de Acesso</p></Title>
                    <Inputs>
                        <div>
                            <TextField
                                required
                                name="ip"
                                label="IP da OLT" 
                                value={form.ip}
                                onChange={handleFormChange}
                                sx={{ width: '264px' }}
                            />
                        </div>
                        <div className="login-info flex">
                            <TextField 
                                name="sshUser"
                                label="Usuário SSH/Telnet"
                                value={form.sshUser}
                                onChange={handleFormChange}
                                sx={{ m: 1, width: '264px' }}
                            />
                            <FormControl sx={{ m: 1, width: '264px' }} variant="outlined">
                                <InputLabel>Senha SSH/Telnet</InputLabel>
                                <OutlinedInput
                                    name="sshPassword"
                                    label="Senha SSH/Telnet" 
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.sshPassword}
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
                                        type={showPassword ? 'text' : 'password'}
                                        value={form.geponPassword}
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
                    </Inputs>
                </AccessConfig>
            </div>
            <VlanConfig className="flex">
                <Title><p>Mapeamento de VLAN's</p></Title>
                <div>
                    <aside>
                        <form className="form-wrapper flex" onSubmit={handleGenerateConfig}>
                            <TextField
                                required
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
                                    required
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
                        {
                            vlans.length > 0 && (
                                <div className="actions flex">
                                    <p>AÇÕES</p>
                                    <form onSubmit={handleModifyVlan}>
                                        <p>Modificar VLAN em LOTE</p>
                                        <div>
                                            <FormControl sx={{ width: '100px' }}>
                                                <InputLabel>Placa</InputLabel>
                                                <Select
                                                    required
                                                    name='modifySlot'
                                                    label="Placa"
                                                    value={action.modifySlot}
                                                    onChange={handleActionValuesChange}
                                                >
                                                    { generateSlotOptions() }
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                type="number"
                                                name="modifyVlan"
                                                label="Nova VLAN"
                                                value={action.modifyVlan}
                                                onChange={handleActionValuesChange}
                                                sx={{ width: '100px' }}
                                            />
                                            <Button variant="contained" color="success" size="small" type="submit">
                                                Aplicar
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    </aside>
                    <div className="table-wrapper flex">
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
                </div>
            </VlanConfig>
        </OltStyledContainer>
    )
}