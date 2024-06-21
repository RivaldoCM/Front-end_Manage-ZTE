import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getOlt } from "../../../services/apiManageONU/getOlt";
import { useResponse } from "../../../hooks/useResponse";
import { AccessConfig, BasicConfig, OltStyledContainer, VlanConfig } from "./style";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { getCities } from "../../../services/apiManageONU/getCities";
import { ICities } from "../../../interfaces/ICities";

export function EditOlt(){
    let { id } = useParams();
    const { setFetchResponseMessage } = useResponse();

    const [cities, setCities] = useState<ICities[]>([]);
    const [vlans, setVlans] = useState([]);
    const [form, setForm] = useState({
        ip: '',
        cityId: 0,
        name: '',
        type: '',
        slots: 0,
        pons: 0,
        sshUser: '',
        sshPassword: '',
        geponUser: '',
        geponPassword: '',
        isActive: '',
        voalleAccessPointId: '',
        isPizzaBox: true,
        formatVlanConfig: 1,
        vlan: 1
    });

    useEffect(() => {
        async function getData(){
            const getOlts = getOlt(parseInt(id!));
            const getCity = getCities();

            const [olts, cities] = await Promise.all([getOlts, getCity]);

            if(olts){
                if(olts.success){
                    setForm({
                        ...form,
                        ip: olts.responses.response.host,
                        cityId: olts.responses.response.city_id,
                        name: olts.responses.response.name,
                        type: olts.responses.response.type,
                        slots: olts.responses.response.slots,
                        pons: olts.responses.response.pons,
                        sshUser: olts.responses.response.ssh_user,
                        sshPassword: olts.responses.response.ssh_password,
                        geponUser: olts.responses.response.gepon_user ?? '',
                        geponPassword: olts.responses.response.gepon_password ?? '',
                        isActive: olts.responses.response.isActive,
                        voalleAccessPointId: olts.responses.response.voalleAccessPointId,
                        isPizzaBox: olts.responses.response.isPizzaBox
                    });
                } else {
                    setFetchResponseMessage(olts.messages.message);
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }

            cities && cities.success ? setCities(cities.responses.response) : setCities([]);
        }
        getData();
    }, []);

    const handleFormChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleGenerateConfig = (e: any) => {
        e.preventDefault();
        let vlans: any = []

        if(form.formatVlanConfig === 1){

        } else if(form.formatVlanConfig === 2){
            for(let slot = 1; slot <= form.slots; slot++){
                for(let pon = 1; pon <= form.pons; pon++){
                    vlans.push({slot: slot, pon: pon, vlan: parseInt(form.vlan)});
                }
    
            }
        } else if(form.formatVlanConfig === 3){
            for(let slot = 1; slot <= form.slots; slot++){
                for(let pon = 1; pon <= form.pons; pon++){
                    vlans.push({slot: slot, pon: pon, vlan: parseInt(form.vlan) + pon});
                }
            }
        } else {
            for(let slot = 1; slot <= form.slots; slot++){
                for(let pon = 1; pon <= form.pons; pon++){
                    vlans.push({slot: slot, pon: pon, vlan: parseInt(form.vlan) + slot});
                }
            }
        }
        setVlans(vlans)
    }

    console.log(vlans)

    return(
        <OltStyledContainer className="flex">
            <BasicConfig className="flex">
                <div className="title"><p>Configurações básicas</p></div>
                <TextField 
                    name="name"
                    label="Nome da OLT" 
                    variant="filled"
                    value={form.name}
                    onChange={handleFormChange}
                />
                <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
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
                        name='type'
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
                        name='isPizzaBox'
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
                />
                <FormControl>
                    <InputLabel>Cidade</InputLabel>
                    <Select
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
            </BasicConfig>
            <AccessConfig className="flex">
                <div className="title"><p>Configurações de Acesso</p></div>
                <TextField 
                    name="ip"
                    label="IP da OLT" 
                    variant="filled"
                    value={form.ip}
                    onChange={handleFormChange}
                />
                <div className="login-info flex">
                    <TextField 
                        name="ip"
                        label="Usuário SSH/Telnet" 
                        variant="filled"
                        value={form.sshUser}
                        onChange={handleFormChange}
                    />
                    <TextField 
                        name="ip"
                        label="Senha SSH/Telnet" 
                        variant="filled"
                        value={form.sshPassword}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="login-info flex">
                    <TextField 
                        name="ip"
                        label="Usuário GEPON" 
                        variant="filled"
                        value={form.geponUser}
                        onChange={handleFormChange}
                    />
                    <TextField 
                        name="ip"
                        label="Senha GEPON" 
                        variant="filled"
                        value={form.geponPassword}
                        onChange={handleFormChange}
                    />
                </div>
            </AccessConfig>
            <VlanConfig className="flex">
                <div className="title"><p>Configurações de VLAN</p></div>
                <form className="intries" onSubmit={handleGenerateConfig}>
                    <TextField
                        required
                        type="number"
                        name="vlan"
                        label="VLAN"
                        value={form.vlan}
                        onChange={handleFormChange}
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
                    <TextField
                        type="number"
                        name="slots"
                        label="Placas"
                        value={form.slots}
                        onChange={handleFormChange}
                    />
                    <TextField
                        type="number"
                        name="pons"
                        label="Pons"
                        value={form.pons}
                        onChange={handleFormChange}
                    />
                    <Button variant="contained" color="success" type="submit">
                        Gerar configuração
                    </Button>
                </form>
            </VlanConfig>
        </OltStyledContainer>
    )
}