import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getOlt } from "../../../services/apiManageONU/getOlt";
import { useResponse } from "../../../hooks/useResponse";
import { AccessConfig, BasicConfig, OltStyledContainer, VlanConfig } from "./style";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { getCities } from "../../../services/apiManageONU/getCities";
import { ICities } from "../../../interfaces/ICities";

export function EditOlt(){
    let { id } = useParams();
    const { setFetchResponseMessage } = useResponse();

    const [cities, setCities] = useState<ICities[]>([]);
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
        isPizzaBox: true
    });

    useEffect(() => {
        async function getData(){
            const getOlts = getOlt(parseInt(id!));
            const getCity = getCities();

            const [olts, cities] = await Promise.all([getOlts, getCity]);

            if(olts){
                if(olts.success){
                    setForm({
                        ip: olts.responses.response.host,
                        cityId: olts.responses.response.city_id,
                        name: olts.responses.response.name,
                        type: olts.responses.response.type,
                        slots: olts.responses.response.slots,
                        pons: olts.responses.response.pons,
                        sshUser: olts.responses.response.ssh_user,
                        sshPassword: olts.responses.response.ssh_password,
                        geponUser: olts.responses.response.gepon_user,
                        geponPassword: olts.responses.response.gepon_password,
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

    console.log(form)

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
                            cities.map((city) => {
                                return(
                                    <MenuItem value={city.id}>{city.name}</MenuItem>
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

            </VlanConfig>
        </OltStyledContainer>
    )
}