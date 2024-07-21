import { useNavigate } from 'react-router-dom';

import { alpha, IconButton, TableCell, TableHead, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import React, { useEffect, useState } from 'react';
import { SearchButton } from '../../../styles/searchButton';
import SearchIcon from '@mui/icons-material/Search';

interface EnhancedTableToolbarProps { numSelected: number; oltDataSelected: any; onInputValueChange: (args: string) => void; }

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
        numeric: false,
        disablePadding: false,
        label: 'IP',
    },
    {
        id: 3,
        numeric: false,
        disablePadding: false,
        label: 'Fabricante',
    },
    {
        id: 4,
        numeric: false,
        disablePadding: false,
        label: 'Modelo',
    },
    {
        id: 5,
        numeric: false,
        disablePadding: false,
        label: 'Ativo',
    },
    {
        id: 6,
        numeric: false,
        disablePadding: false,
        label: 'Ponto de Acesso(Voalle)'
    }
];

export function EnhancedTableHead(){
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">

                </TableCell>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={index}
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
    const navigate = useNavigate();
    const { numSelected, oltDataSelected, onInputValueChange } = props;

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
                OLT's
            </Typography>
        )}
        {numSelected > 0 ? (
            <div className='flex'>
                <IconButton color='secondary' onClick={() => navigate(`${oltDataSelected.id}`)}>
                    <EditOutlinedIcon />
                </IconButton>
            </div>
        ) : (
            <React.Fragment>
                <IconButton color='primary' onClick={() => navigate('new_olt')}>
                    <AddOutlinedIcon />
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