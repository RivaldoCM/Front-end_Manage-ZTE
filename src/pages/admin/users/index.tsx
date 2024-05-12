import React, { useState, useEffect, useMemo } from 'react';

import { EditUsersModal } from './modals';

import { IUsers } from '../../../interfaces/users';
import { getUsers } from '../../../services/apiManageONU/getUsers';

import { SearchButton } from '../../../styles/searchButton';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { IconButton, TableHead } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { NewUser } from './modals/newUser';
import { EditUser } from './modals/editUser';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

function stableSort<T>(array: readonly T[]) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableToolbarProps {
    isOpenNewUserModal: boolean,
    onOpenNewUserModal: any,
    onOpenEditUserModal: any,
    numSelected: number; 
    onInputValueChange: any;
}

interface HeadCell {
    disablePadding: boolean;
    id: number;
    label: string;
    numeric: boolean;
}
  
const headCells: readonly HeadCell[] = [
    {
        id: 1,
        numeric: false,
        disablePadding: true,
        label: 'Nome',
    },
    {
        id: 2,
        numeric: true,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 3,
        numeric: true,
        disablePadding: false,
        label: 'Nivel de acesso',
    },
    {
        id: 4,
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
];

function EnhancedTableHead(){
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, onInputValueChange } = props;

    const [inputSearchValue, setInputSearchValue] = useState('');

    useEffect(() => {
        onInputValueChange(inputSearchValue);
    }, [inputSearchValue]);

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {setInputSearchValue(e.target.value)};

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onInputValueChange(inputSearchValue);
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                />
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Usuários
                </Typography>
            )}
            {numSelected > 0 ? (
                <React.Fragment>
                    <div>
                        <IconButton>
                            <LockResetOutlinedIcon color='secondary'/>
                        </IconButton>
                    </div>
                    <div>
                        <IconButton color='primary' onClick={props.onOpenEditUserModal}>
                            <EditOutlinedIcon />
                        </IconButton>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <IconButton color='primary' onClick={props.onOpenNewUserModal}>
                        <PersonAddAltOutlinedIcon />
                    </IconButton>
                    <Tooltip title="">
                        <SearchButton>
                            <div className="search-container">
                                <form onSubmit={handleSubmit} >
                                    <div className="search-box">
                                        <input 
                                            type="text" 
                                            placeholder="Digite o nome na busca" 
                                            className="search-input" 
                                            onChange={handleChangeValue}
                                            value={inputSearchValue}
                                        />
                                        <IconButton type="submit" className="search-button" >
                                            <SearchIcon />
                                        </IconButton>
                                    </div>
                                </form>
                            </div>
                        </SearchButton>
                    </Tooltip>
                </React.Fragment>
            )}
        </Toolbar>
    );
}

export function HandleManageUsers(){
    const [users, setUsers] = useState<IUsers[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>([]);
    const [filteredUser, setFilteredUser] = useState<Array<IUsers>>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState<number[]>([]);
    const [dense, setDense] = useState(false);
    const [openNewserModal, setOpenNewUserModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);

    useEffect(() => {
        async function users(){
            const userData = await getUsers();

            if(typeof userData !== 'string'){
                setUsers(userData);
                setFilteredUser(userData);
            } else {
                setUsers([]);
                //error
            }
        }
        users();
    }, []);

    const handleSearchValueChange = (value: string) => {
        const filteredUser = users.filter((el) => {
            if(el.name.toLowerCase().startsWith(value.toLowerCase())){
                setPage(0);
                return el;
            }
        })
        setFilteredUser(filteredUser);
    }

    const handleClick = (_event: React.MouseEvent<unknown>, id: number, row: IUsers) => {
        setSelectedUser(row);
    
        if(selected[0] === id){
            //Aqui eu desmarco a checkbox caso clique no usuário que já esta marcado
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

    const emptyRows = page > 0 ? Math.max(0, (page) * rowsPerPage - filteredUser.length) : 0;
    const visibleRows = useMemo(() => 
        stableSort(filteredUser).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [page, rowsPerPage, filteredUser]
    );

    const handleOpenNewUserModal = () => setOpenNewUserModal(true);
    const handleCloseNewUserModal = () => setOpenNewUserModal(false)
    const handleOpenEditUserModal = () => setOpenEditUserModal(true);
    const handleCloseEditUserModal = () => setOpenEditUserModal(false)

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length} 
                    isOpenNewUserModal={openNewserModal}
                    onOpenNewUserModal={handleOpenNewUserModal}
                    onOpenEditUserModal={handleOpenEditUserModal}
                    onInputValueChange={handleSearchValueChange}
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
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.department_id}</TableCell>
                                    <TableCell align="right">{row.status}</TableCell>
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
                    count={filteredUser.length}
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
                openNewserModal && (
                    <NewUser
                        open={openNewserModal}
                        handleClose={handleCloseNewUserModal}
                    />
                )
            }
            {
                openEditUserModal && (
                    <EditUser 
                        open={openEditUserModal}
                        handleClose={handleCloseEditUserModal}
                        selectedUser={selectedUser}
                    />
                )
            }
        </Box>
    );
}