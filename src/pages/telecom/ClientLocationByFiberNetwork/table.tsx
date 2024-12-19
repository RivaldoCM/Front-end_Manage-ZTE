import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';

type Order = 'asc' | 'desc';

interface Data {
    pppoe: string;
    serialNumber: string;
    rxOnt: number;
    txOlt: number;
    ctoId: number;
    portId: number;
    isUpdated: boolean
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    sort: boolean;
    label: string;
    numeric: boolean;
}
  
const headCells: readonly HeadCell[] = [
    {
      id: 'pppoe',
      sort: false,
      numeric: false,
      disablePadding: true,
      label: 'PPPoE',
    },
    {
      id: 'serialNumber',
      sort: false,
      numeric: true,
      disablePadding: false,
      label: 'SerialNumber',
    },
    {
      id: 'rxOnt',
      sort: false,
      numeric: true,
      disablePadding: false,
      label: 'Rx ONT',
    },
    {
      id: 'txOlt',
      sort: false,
      numeric: true,
      disablePadding: false,
      label: 'TX OLT',
    },
    {
      id: 'ctoId',
      sort: false,
      numeric: true,
      disablePadding: false,
      label: 'N° CTO',
    },
    {
        id: 'portId',
        sort: false,
        numeric: true,
        disablePadding: false,
        label: 'N° Porta CTO',
    },
    {
        id: 'isUpdated',
        sort: true,
        numeric: true,
        disablePadding: false,
        label: 'Atualizado?',
    },
];
  
interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof Data, isSortable: boolean) => (event: React.MouseEvent<unknown>) => {
        isSortable ? onRequestSort(event, property): null;
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
                                onClick={createSortHandler(headCell.id, headCell.sort)}
                                startDecorator={
                                    headCell.numeric  && headCell.sort ? (
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
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;

    console.log(numSelected)

    return (
        <Box
            sx={[
            {
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
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    level="body-lg"
                    sx={{ flex: '1 1 100%' }}
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton size="sm" color="danger" variant="solid">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton size="sm" variant="outlined" color="neutral">
                    <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
}