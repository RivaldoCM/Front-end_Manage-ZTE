import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SearchInput } from '../../../components/SeachInput';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

export interface Data {
    name: string,
    number: number,
    localization: string,
    'Type.name': string,
    'City.name': string,
    'Olts.name': string,
    incidents: string,
    slots: number;
    slot: number,
    pon: number,
    status: string
}

export function labelDisplayedRows({
    from,
    to,
    count,
    }: {
        from: number;
        to: number;
        count: number;
    }) {
        return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}
  
function descendingComparator<T>(a: any, b: any, orderBy: keyof T, isNested: Boolean) {
    if(isNested){
        const nested = orderBy.toString().split('.');
        if (b[nested[0]][nested[1]] < a[nested[0]][nested[1]]) {
            return -1;
        }
        if (b[nested[0]][nested[1]] > a[nested[0]][nested[1]]) {
            return 1;
        }
        return 0;
    } else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
}

type Order = 'asc' | 'desc';

export function getComparator<Key extends keyof Data>(
    order: Order,
    orderBy: Key,
    isNested: Boolean
    ): (
    a: IFiberNetwork,
    b: IFiberNetwork,
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy, isNested)
        : (a, b) => -descendingComparator(a, b, orderBy, isNested);
}
  
interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    sort: boolean;
    nested: boolean;
}
  
const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        sort: false,
        nested: false,
        numeric: false,
        disablePadding: true,
        label: 'Nome',
    },
    {
        id: 'number',
        sort: true,
        nested: false,
        numeric: true,
        disablePadding: false,
        label: 'N°',
    },
    {
        id: 'Type.name',
        sort: true,
        nested: true,
        numeric: false,
        disablePadding: false,
        label: 'Tipo',
    },
    {
        id: 'City.name',
        sort: true,
        nested: true,
        numeric: false,
        disablePadding: false,
        label: 'Cidade',
    },
    {
        id: 'Olts.name',
        sort: true,
        nested: true,
        numeric: false,
        disablePadding: false,
        label: 'OLT',
    },
    {
        id: 'slots',
        sort: false,
        nested: false,
        numeric: true,
        disablePadding: false,
        label: 'Total de Slots',
    },
    {
        id: 'slot',
        sort: false,
        nested: false,
        numeric: true,
        disablePadding: false,
        label: 'Placa',
    },
    {
        id: 'pon',
        sort: false,
        nested: false,
        numeric: true,
        disablePadding: false,
        label: 'Pon',
    },
    {
        id: 'incidents',
        sort: true,
        nested: false,
        numeric: false,
        disablePadding: false,
        label: 'Nº de incidentes',
    },
    {
        id: 'status',
        sort: true,
        numeric: false,
        nested: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'localization',
        sort: false,
        nested: false,
        numeric: false,
        disablePadding: false,
        label: 'Localização',
    },
];
  
interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data, isNested: boolean) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}
  
export function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof Data, isSortable: boolean, isNested: boolean) => (event: React.MouseEvent<unknown>) => {
        isSortable ? onRequestSort(event, property, isNested) : null;
    };

    return (
        <thead>
        <tr>
            <th>
                <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={onSelectAllClick}
                    slotProps={{
                        input: {
                            'aria-label': 'select all desserts',
                        },
                    }}
                    sx={{ verticalAlign: 'sub' }}
                />
            </th>
            {headCells.map((headCell) => {
                const active = orderBy === headCell.id;
                return (
                    <th
                        key={headCell.id}
                        aria-sort={
                            active
                            ? ({ asc: 'ascending', desc: 'descending' } as const)[order]
                            : undefined
                        }
                    >
                        <Link
                            underline="none"
                            color="neutral"
                            textColor={active ? 'primary.plainColor' : undefined}
                            component="button"
                            onClick={createSortHandler(headCell.id, headCell.sort, headCell.nested)}
                            startDecorator={
                                headCell.numeric && headCell.sort ? (
                                    <ArrowDownwardIcon
                                        sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                                    />
                                ) : null
                            }
                            endDecorator={
                                !headCell.numeric && headCell.sort ? (
                                    <ArrowDownwardIcon
                                    sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                                    />
                                ) : null
                            }
                            sx={{
                                fontWeight: 'lg',

                                '& svg': {
                                    transition: '0.2s',
                                    transform:
                                    active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                },

                                '&:hover': { '& svg': { opacity: 1 } },
                            }}
                        >
                            {headCell.label}
                            {active ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </Link>
                    </th>
                );
            })}
        </tr>
        </thead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
    onOpenAddItemModal: () => void;
    onOpenDeleteItemModal: () => void;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    return (
        <Box
            sx={[
                {
                    position: 'sticky',
                    top: '64px',
                    background: '#fdfdfd',
                    zIndex: '100',
                    display: 'flex',
                    alignItems: 'center',
                    py: 1,
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    borderTopLeftRadius: 'var(--unstable_actionRadius)',
                    borderTopRightRadius: 'var(--unstable_actionRadius)',
                },
                numSelected > 0 && {
                    bgcolor: 'background.level1',
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} component="div">
                    {numSelected} selecionado(s)
                </Typography>
            ) : (
                <Typography
                    level="body-lg"
                    sx={{ flex: '1 1 100%' }}
                    id="tableTitle"
                    component="div"
                >
                    Passivos de Rede
                </Typography>
            )}
            {numSelected > 0 ? (
                <React.Fragment>
                    <Tooltip title="Editar">
                        <IconButton 
                            size="sm"
                            color="primary"
                            variant="soft"
                            sx={{ margin: '0 .5rem' }}
                        >
                            <EditOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Deletar">
                        <IconButton 
                            size="sm" 
                            color="danger"
                            variant="soft" 
                            onClick={props.onOpenDeleteItemModal}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Tooltip title="Adicionar item">
                        <IconButton 
                            size="sm" 
                            variant="soft" 
                            color="primary" 
                            onClick={props.onOpenAddItemModal}
                        >
                            <AddBoxOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    {/*
                        <SearchInput
                            placeholder='Pesquise aqui'
                        />
                    */}

                    <Tooltip title="Lista de Filtros">
                        <IconButton size="sm" variant="soft" sx={{ color: '#9c27b0'}}>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </React.Fragment>
            )}
        </Box>
    );
}