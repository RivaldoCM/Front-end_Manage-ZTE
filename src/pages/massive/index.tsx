import React, { useEffect, useState } from "react";

import { Card, Cards, OffCard, CardController, Container, IconMassivePeople, MassivePeopleStyle } from "./style";
import { IconButton } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import { getMassive } from "../../services/apiManageONU/getMassive";
import { AddMassive } from "./modals/addMassive";
import { useResponse } from "../../hooks/useResponse";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import dayjs from "dayjs";
import { useAuth } from "../../hooks/useAuth";
import { EditMassive } from "./modals/editMassive";
import { AddMassivePeople } from "./modals/addMassivePeople";
import CloseIcon from '@mui/icons-material/Close';
import { getClientMassive } from "../../services/apiManageONU/getClientMassive";

export function Massive(){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [openAddMassive, setOpenAddMassive] = useState(false);
    const [openEditMassive, setOpenEditMassive] = useState(false);
    const [openAddPeopleMassive, setOpenAddPeopleMassive] = useState(false);
    const [massives, setMassives] = useState<any>([]);
    const [clienteMassive, setClientMassive] = useState<any>([]);
    const [editMassiveData, setEditMassiveData] = useState<any>();
    const [addPeopleData, setAddPeopleData] = useState<any>();
    const [showOffCard, setShowOffCard] = useState<number[]>([]);
    const [showMassivePeople, setShowMassivePeople] = useState<number[]>([])

    useEffect(() => {
        if(!openAddMassive){
            async function massives(){
                const activeMassives = await getMassive();
                if(activeMassives){
                    if(activeMassives.success){
                        if(activeMassives.responses.response){
                            setMassives(activeMassives.responses.response);
                        } else {
                            setMassives([]);
                        }
                    } else {
                        setMassives([]);
                    }
                } else {
                    setFetchResponseMessage('error/no-connection-with-API');
                }
            }
            massives();
        }
    }, [openAddMassive]);

    const handleShowOffCard = (whichCard: number) => {
        if (showOffCard.includes(whichCard)) {
            //CASO ESTEJA ABERTO, ENTRA AQ
            //NESSE CASO, PARA FECHAR, GERA UM NOVO ARRAY COM TODOS OS VALORES, MENOS O DO CARD CLICADO.
            setShowOffCard(showOffCard.filter(cardIndex => cardIndex !== whichCard));
        } else {
            setShowOffCard([...showOffCard, whichCard]);
        }
    }

    const handleShowMassivePeople = async (value: number) => {
        if(showMassivePeople.includes(value)) {
            setShowMassivePeople(showMassivePeople.filter(cardIndex => cardIndex !== value));
        } else {
            setShowMassivePeople([value]);
        }

        const response = await getClientMassive({massiveId: value, cpf: undefined});

    }

    const handleEditCard = (value: any) => {
        handleOpenEditMassive();
        setEditMassiveData(value);
    }

    const handleAddPeopleToCard = (value: any) => {
        handleOpenAddPeopleMassive();
        setAddPeopleData({
            userId: user?.uid,
            cityId: value.Cities.id,
            massiveId: value.id
        });
    }

    const handleOpenAddMassive = () => setOpenAddMassive(true);
    const handleCloseAddMassive = () => setOpenAddMassive(false);
    const handleOpenEditMassive = () => setOpenEditMassive(true);
    const handleCloseEditMassive = () => setOpenEditMassive(false);
    const handleOpenAddPeopleMassive = () => setOpenAddPeopleMassive(true);
    const handleCloseAddPeopleMassive = () => setOpenAddPeopleMassive(false);

    return(
        <Container>
            <Cards>
                {
                    massives.map((massive: any, index: number) => {
                        return(
                            <CardController className="flex" key={index}>
                                <Card className="flex" offCardOpen={showOffCard.includes(index)}>
                                    <div className="header flex">
                                        <h2>{massive.type}</h2>
                                        <p>{massive.Cities.name}</p>
                                        <IconMassivePeople>
                                            <IconButton
                                                className="off-card-button" 
                                                size="small"
                                                color="primary"
                                                onClick={() => handleShowMassivePeople(index)}
                                            >
                                                {showMassivePeople.includes(index) ? <CloseIcon /> : <Groups2RoundedIcon />}
                                            </IconButton>
                                        </IconMassivePeople>
                                        {
                                            showMassivePeople.includes(index) && (
                                                <MassivePeopleStyle>
                                                    teste
                                                </MassivePeopleStyle>
                                            )
                                        }
                                    </div>
                                    <div className="content">
                                        <div className="basic-info">
                                            <p>Locais afetados: {massive.affected_local}</p>
                                        </div>
                                        <div className="description flex">
                                            <p>{massive.description}</p>
                                        </div>
                                        <div className="teste flex">
                                            <p>Previsão de retorno: {dayjs(massive.forecast_return).add(3, "hour").format('DD/MM/YY - HH:mm') + 'h'}</p>
                                        </div>
                                    </div>
                                </Card>
                                <OffCard className="flex" offCardOpen={showOffCard.includes(index)}>
                                    <IconButton
                                        className="off-card-button" 
                                        size="small"
                                        color="primary"
                                        onClick={() => handleShowOffCard(index)}
                                    >
                                        {showOffCard.includes(index) ? <ExpandMoreOutlinedIcon /> : <ExpandLessOutlinedIcon />}
                                    </IconButton>
                                    <div className="off-card-information">
                                        <p>Aberto por {massive.User_Massive_created_by.name} às {dayjs(massive.created_at).add(3, "hour").format('HH:mm-DD/MM')}</p>
                                    </div>
                                    <div className="off-card-action-buttons flex">
                                        <IconButton size="small" color="primary" onClick={() => handleAddPeopleToCard(massive)}>
                                            <PersonAddOutlinedIcon />
                                        </IconButton>
                                        {
                                            user?.rule! > 13 ? 
                                            <React.Fragment>
                                                <IconButton size="small" color="secondary" onClick={() => handleEditCard(massive)}>
                                                    <CreateOutlinedIcon />
                                                </IconButton>
                                                <IconButton size="small" color="success">
                                                    <DoneIcon />
                                                </IconButton>
                                            </React.Fragment> : 
                                            <></>
                                        }
                                    </div>
                                </OffCard>
                            </CardController>
                        );
                    })
                }
            </Cards>
            <AddMassive
                open={openAddMassive}
                handleOpen={handleOpenAddMassive}
                handleClose={handleCloseAddMassive}
            />
            {
                openEditMassive && (
                    <EditMassive 
                        open={openEditMassive}
                        massive={editMassiveData}
                        handleClose={handleCloseEditMassive}
                    />
                )
            }
            {
                openAddPeopleMassive && (
                    <AddMassivePeople
                        open={openAddPeopleMassive}
                        massive={addPeopleData}
                        handleClose={handleCloseAddPeopleMassive}
                    />
                )
            }
        </Container>
    );
}