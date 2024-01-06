import React, { useState, useEffect, useMemo } from 'react';

import { useError } from '../../../hooks/useError';
import { EditUsersModal } from './modals';

import { IUsers } from '../../../interfaces/users';
import { getUsers } from '../../../services/apiManageONU/getUsers';

import { SearchButton } from '../../../styles/search';
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
import Alert from '@mui/material/Alert';
import SearchIcon from '@mui/icons-material/Search';

function stableSort<T>(array: readonly T[]) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
       
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableToolbarProps { numSelected: number; selectedUserData: Array<any>;}

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
    const { numSelected, selectedUserData } = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            >
                {numSelected} selecionado
            </Typography>
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
            <>
                <div>
                    <Tooltip title="Editar">
                        <EditUsersModal 
                            handleOpen={handleOpen}
                            open={open}
                            handleClose={handleClose}
                            selectedUserData={selectedUserData}
                        />
                    </Tooltip>
                </div>
                <div>
                    
                </div>
            </>
            
        ) : (
            <Tooltip title="filter">
                <SearchButton>
                <div className="search-container">
                    <form action="#" method="get">
                    <div className="search-box">
                        <input type="text" placeholder="Digite sua pesquisa" name="search" className="search-input" />
                        <IconButton type="submit" className="search-button">
                            <SearchIcon />
                        </IconButton>
                    </div>
                    </form>
                </div>
                </SearchButton>
            </Tooltip>
        )}
        </Toolbar>
    );
}

export function HandleManageUsers() {
    const { error, errorMessage, severityStatus, handleError } = useError();

    const [selected, setSelected] = useState<number[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [ users, setUsers ] = useState<IUsers[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>([]);

    useEffect(() => {
        async function users(){
            const userData = await getUsers();

            if(typeof userData !== 'string'){
                setUsers(userData);
            } else {
                setUsers([]);
                handleError('unable-load-data');
            }
        }
        users();
    }, []);

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

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (page) * rowsPerPage - users.length) : 0;

    const visibleRows = useMemo(() =>
        stableSort(users).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [page, rowsPerPage, users]
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} selectedUserData={selectedUser}/>
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
                    count={users.length}
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
                (error ?
                    <Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
                :
                    <></>
                )
            }
        </Box>
    );
}