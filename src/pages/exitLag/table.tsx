import React, { useState, useEffect } from 'react';

import { SearchButton } from '../../styles/searchButton';
import { alpha } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, TableHead } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

interface EnhancedTableToolbarProps {
    onOpenAddUserModal: () => void;
    onOpenEditUserModal: () => void;
    onOpenViewLogModel: () => void;
    onInputValueChange: (args: string) => void;
    numSelected: number; 
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
        label: 'Status',
    },
    {
        id: 4,
        numeric: true,
        disablePadding: false,
        label: 'Último Login',
    },
    {
        id: 5,
        numeric: true,
        disablePadding: false,
        label: 'Última edição',
    },
];

export function EnhancedTableHead(){
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

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
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
                    component="div"
                />
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    component="div"
                >
                    Clientes ExitLag
                </Typography>
            )}
            {numSelected > 0 ? (
                <React.Fragment>
                    <IconButton color='secondary' onClick={props.onOpenViewLogModel}>
                        <DescriptionOutlinedIcon />
                    </IconButton>
                    <IconButton color='primary' onClick={props.onOpenEditUserModal}>
                        <EditOutlinedIcon />
                    </IconButton>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <IconButton color='primary' onClick={props.onOpenAddUserModal} sx={{mr: 2}}>
                        <PersonAddAltOutlinedIcon />
                    </IconButton>
                    <Tooltip title="">
                        <SearchButton>
                            <div className="search-container">
                                <form onSubmit={handleSubmit} >
                                    <div className="search-box">
                                        <input 
                                            type="text" 
                                            placeholder="Busca de usuários" 
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