import { useEffect, useState } from "react";

import { useResponse } from "../../../hooks/useResponse";
import { AccessConfig, BasicConfig, Inputs, OltStyledContainer, Title, VlanConfig } from "./style";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { getCities } from "../../../services/apiManageONU/getCities";
import { ICities } from "../../../interfaces/ICities";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function AddOlt(){
    const { setFetchResponseMessage } = useResponse();

    const [showPassword, setShowPassword] = useState(false);
    const [cities, setCities] = useState<ICities[]>([]);
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
        type: 10,
        slots: 0,
        pons: 0,
        sshUser: '',
        sshPassword: '',
        geponUser: '',
        geponPassword: '',
        isActive: true,
        voalleAccessPointId: '',
        isPizzaBox: false,
        formatVlanConfig: 1,
        vlan: 1
    });

    useEffect(() => {
        async function getData(){
            const getCity = getCities();
            const [cities] = await Promise.all([getCity]);
            cities && cities.success ? setCities(cities.responses.response) : setCities([]);
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
        let vlans: any = [];

        if(form.formatVlanConfig === 1){
            for(let slot = 1; slot <= form.slots; slot++){
                for(let pon = 1; pon <= form.pons; pon++){
                    vlans.push({slot: slot, pon: pon, vlan: ''});
                }
            }
        }else if(form.formatVlanConfig === 2){
            for(let slot = 1; slot <= form.slots; slot++){
                for(let pon = 1; pon <= form.pons; pon++){
                    vlans.push({slot: slot, pon: pon, vlan: parseInt(form.vlan)});
                }
            }
        }else if(form.formatVlanConfig === 3){
            for(let slot = 1; slot <= form.slots; slot++){
                for(let pon = 1; pon <= form.pons; pon++){
                    vlans.push({slot: slot, pon: pon, vlan: parseInt(form.vlan) + pon});
                }
            }
        }else{
            for(let slot = 1; slot <= form.slots; slot++){
                for(let pon = 1; pon <= form.pons; pon++){
                    vlans.push({slot: slot, pon: pon, vlan: parseInt(form.vlan) + slot});
                }
            }
        }
        setVlans(vlans);
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

        for(let slot = 1; slot <= form.slots; slot++) {
            items.push(<MenuItem key={slot} value={slot}>{slot}</MenuItem>);
        }
      
        return(
            [items]
        );
    }

    const generatePonOptions = () => {
        let items = [];

        items.push(<MenuItem key={0} value={0}>TODAS</MenuItem>);
        for(let pon = 1; pon <= form.pons; pon++) {
            items.push(<MenuItem key={pon} value={pon}>{pon}</MenuItem>);
        }
      
        return(
            [items]
        );
    }

    const handleDeleteVlan = (e: any) => {
        e.preventDefault();
        if(action.deletePon === 0){
            const newCofig = vlans.filter(value => value.slot !== action.deleteSlot);
            setVlans(newCofig);
        } else {
            const newCofig = vlans.filter(value => !(value.slot === action.deleteSlot && value.pon === action.deletePon));
            setVlans(newCofig);
        }
    }

    const handleAddVlan = (e: any) => {
        e.preventDefault();

        vlans.map((value, index) => {
            if(action.createSlot == value.slot){

            }
        })
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
                        </div>
                        <div>
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
                            <FormControl>
                                <InputLabel>Tipo</InputLabel>
                                <Select
                                    required
                                    name="type"
                                    label="Tipo"
                                    value={form.type}
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value={10}>ZTE</MenuItem>
                                    <MenuItem value={20}>Parks</MenuItem>
                                    <MenuItem value={30}>Fiberhome</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <InputLabel>PizzaBox</InputLabel>
                                <Select
                                    required
                                    name="isPizzaBox"
                                    label="PizzaBox"
                                    value={form.isPizzaBox}
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value={true}>Sim</MenuItem>
                                    <MenuItem value={false}>Não</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                type="number"
                                name="voalleAccessPointId"
                                label="Ponto de acesso Voalle"
                                value={form.voalleAccessPointId}
                                onChange={handleFormChange}
                                sx={{ m: 1, width: '264px' }}
                            />
                        </div>
                        <div>
                            <TextField
                                type="number"
                                name="slots"
                                label="Placas"
                                value={form.slots}
                                onChange={handleFormChange}
                                sx={{ width: '100px' }}
                            />
                            <TextField
                                type="number"
                                name="pons"
                                label="Pons"
                                value={form.pons}
                                onChange={handleFormChange}
                                sx={{ width: '100px' }}
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
                                    <form onSubmit={handleDeleteVlan}>
                                        <p>Deletar</p>
                                        <div>
                                            <FormControl sx={{ width: '100px' }}>
                                                <InputLabel>Placa</InputLabel>
                                                <Select
                                                    required
                                                    name="deleteSlot"
                                                    label="Placa"
                                                    value={action.deleteSlot}
                                                    onChange={handleActionValuesChange}
                                                >
                                                    { generateSlotOptions() }
                                                </Select>
                                            </FormControl>
                                            <FormControl sx={{ width: '100px' }}>
                                                <InputLabel>Pon</InputLabel>
                                                <Select
                                                    required
                                                    name="deletePon"
                                                    label="Pon"
                                                    value={action.deletePon}
                                                    onChange={handleActionValuesChange}
                                                >
                                                    { generatePonOptions() }
                                                </Select>
                                            </FormControl>
                                            <Button variant="contained" color="success" size="small" type="submit">
                                                Aplicar
                                            </Button>
                                        </div>
                                    </form>
                                    <form onSubmit={handleAddVlan}>
                                        <p>Adicionar</p>
                                        <div>
                                            <TextField
                                                type="number"
                                                name="createSlot"
                                                label="Placa"
                                                value={action.createSlot}
                                                onChange={handleActionValuesChange}
                                                sx={{ width: '100px' }}
                                            />
                                            <TextField
                                                type="number"
                                                name="createPon"
                                                label="Pons"
                                                value={action.createPon}
                                                onChange={handleActionValuesChange}
                                                sx={{ width: '100px' }}
                                            />
                                            <Button variant="contained" color="success" size="small" type="submit">
                                                Aplicar
                                            </Button>
                                        </div>
                                    </form>
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
                    <div className="table-wrapper">
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
                                                <TextField
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