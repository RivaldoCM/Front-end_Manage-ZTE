import React, { useEffect, useMemo, useState } from 'react';
import { getClients } from '../../services/apiExitLag/getClients';
import { sendToken } from '../../services/apiManageONU/sendTokenExitLag';
import { getToken } from '../../services/apiExitLag/getToken';
import { useResponse } from '../../hooks/useResponse';
import { Box, Checkbox, FormControlLabel, Paper, Switch, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import { EnhancedTableHead, EnhancedTableToolbar } from './table';
import { AddUserExitLagModal } from './modals/addClient';
import { EditClientExitLagModal } from './modals/editClient';
import { getStoredExitLagToken } from '../../services/apiManageONU/getTokenExitlag';
import dayjs from 'dayjs';
import { ViewClientLog } from './modals/viewClientLog';

function stableSort<T>(array: readonly T[]) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export function Exitlag() {
    const { setFetchResponseMessage } = useResponse();

    const [clients, setClients] = useState<any[]>([]);
    const [selectedClient, setSelectedClient] = useState<any | null>(null);
    const [filteredClient, setFilteredClient] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState<number[]>([]);
    const [dense, setDense] = useState(false);
    const [openAddUserModal, setOpenAddUserModal] = useState<null | boolean>(null);
    const [openViewLogModal, setOpenViewLogModal] = useState<boolean>(false);
    const [openEditUserModal, setOpenEditUserModal] = useState<null | boolean>(null);


    useEffect(() => {
        async function users(){
            const token = await getStoredExitLagToken();
            if(token && token.success){
                const response = await getClients(token.responses.response);
                if(response && response.success){
                    setClients(response.data.data);
                    setFilteredClient(response.data.data);
                    return;
                } else {
                    const token = await getToken();
                    if(token){
                        sendToken(token);
                        const response = await getClients(token);
                        if(response?.success){
                            setClients(response.data.data);
                            setFilteredClient(response.data.data);
                            return;
                        }
                    }
                }
                setFetchResponseMessage('error/no-connection-with-API');
            } else {
                const exitLagToken = await getToken();
                if(exitLagToken){
                    const response = await getClients(exitLagToken);
                    if(response && response.success){
                        setClients(response.data.data);
                        setFilteredClient(response.data.data);
                        return;
                    }
                }
                setFetchResponseMessage('error/no-connection-with-API');
            }
        }
        users();
    }, []);

    //A FUNÇÃO ABAIXO REFERE-SE A CADA MODFICAÇÃO FEITA, COLETANDO NOVAMENTE OS DADOS
    //A FIM DE ATUALIZAR EM TEMPO REAL, VISUALMENTE MELHOR PARA O USUÁRIO.
    useEffect(() => {
        async function updateClients(){
            const token = await getStoredExitLagToken();
            if(token && token.success){
                const response = await getClients(token.responses.response);
                if(response && response.success){
                    setClients(response.data.data);
                    setFilteredClient(response.data.data);
                    return;
                }
            } else {
                const exitLagToken = await getToken();
                if(exitLagToken){
                    const response = await getClients(exitLagToken);
                    if(response && response.success){
                        setClients(response.data.data);
                        setFilteredClient(response.data.data);
                        return;
                    }
                }
            }
        }
        updateClients();
    }, [openEditUserModal === false, openAddUserModal === false]);

    const handleSearchValueChange = (value: string) => {
        //FILTRO SENDO REALIZADO NA BUSCA PELO NOME OU EMAIL, SIMULTANEAMENTE.
        const filtered = clients.filter((el) => {
            if(el.client.firstName.toLowerCase().startsWith(value.toLowerCase())){
                return el;
            }

            if(el.client.email.toLowerCase().startsWith(value.toLowerCase())){
                return el;
            }
            setPage(0);
        });
        setFilteredClient(filtered);
    }

    const handleClick = (_event: React.MouseEvent<unknown>, id: number, row: any) => {
        setSelectedClient(row);
    
        if(selected[0] === id){
            setSelected([]);
            return;
        }
        setSelected([id]);
    };

    const handleChangePage = (_event: unknown, newPage: number) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => { setDense(event.target.checked); };
    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (page) * rowsPerPage - filteredClient.length) : 0;
    const visibleRows = useMemo(() => 
        stableSort(filteredClient).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [page, rowsPerPage, filteredClient]
    );

    const handleOpenAddUserModal = () => setOpenAddUserModal(true);
    const handleCloseAddUserModal = () => setOpenAddUserModal(false);
    const handleOpenEditUserModal = () => setOpenEditUserModal(true);
    const handleCloseEditUserModal = () => setOpenEditUserModal(false);
    const handleOpenViewLogModal = () => setOpenViewLogModal(true);
    const handleCloseViewLogModal = () => setOpenViewLogModal(false);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onOpenAddUserModal={handleOpenAddUserModal}
                    onOpenEditUserModal={handleOpenEditUserModal}
                    onInputValueChange={handleSearchValueChange}
                    onOpenViewLogModel={handleOpenViewLogModal}
                />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead />
                        <TableBody>
                        {typeof visibleRows !== 'string' && visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id, row)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        checked={isItemSelected}
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.client.firstName}
                                    </TableCell>
                                    <TableCell align="right">{row.client.email}</TableCell>
                                    <TableCell align="right">{row.active === 1 ? 'Ativo' : 'Inativo'}</TableCell>
                                    <TableCell align="right">
                                        {row.client.lastLogin ? dayjs(row.client.lastLogin).format('DD/MM/YYYY - HH:mm:ss'): <></>}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.updatedAt ? dayjs(row.updatedAt).format('DD/MM/YYYY - HH:mm:ss'): <></>}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: (dense ? 33 : 53) * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 25]}
                    component="div"
                    count={filteredClient.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                sx={{margin: '0'}}
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Modo compacto"
            />
            {
                openAddUserModal && (
                    <AddUserExitLagModal
                        open={openAddUserModal}
                        handleClose={handleCloseAddUserModal}
                    />
                )
            }
            {
                openEditUserModal && (
                    <EditClientExitLagModal 
                        open={openEditUserModal}
                        selectedClient={selectedClient}
                        handleClose={handleCloseEditUserModal}
                    />
                )
            }
            {
                openViewLogModal && (
                    <ViewClientLog 
                        open={openViewLogModal}
                        selectedClient={selectedClient}
                        handleClose={handleCloseViewLogModal}
                    />
                )
            }
        </Box>
    );
}
