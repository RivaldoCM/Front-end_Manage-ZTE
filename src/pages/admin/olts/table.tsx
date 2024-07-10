import { useNavigate } from 'react-router-dom';

import { alpha, IconButton, TableCell, TableHead, TableRow, Toolbar, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


interface EnhancedTableToolbarProps { numSelected: number; oltDataSelected: any }

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
    const navigate = useNavigate();
    const { numSelected, oltDataSelected } = props;

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
            <IconButton color='primary' onClick={() => navigate('new_olt')}>
                <AddOutlinedIcon />
            </IconButton>
        )}
        </Toolbar>
    );
}