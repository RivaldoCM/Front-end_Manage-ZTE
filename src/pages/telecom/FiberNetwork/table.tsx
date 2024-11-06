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

export interface Data {
    name: string,
    numeration: number,
    localization: string,
    type: string,
    city: string,
    olt: string,
    incidents: string,
    slot: number,
    pon: number,
}

export function createData(
    name: string,
    numeration: number,
    localization: string,
    type: string,
    city: string,
    olt: string,
    incidents: string,
    slot: number,
    pon: number,
  ): Data {
    return {
      name,
      numeration,
      localization,
      type,
      city,
      olt,
      incidents,
      slot,
      pon
    };
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
  
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
  
type Order = 'asc' | 'desc';
  
export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
    ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
  
interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}
  
const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nome',
    },
    {
        id: 'numeration',
        numeric: true,
        disablePadding: false,
        label: 'N°',
    },
    {
        id: 'localization',
        numeric: false,
        disablePadding: false,
        label: 'Localização',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Tipo',
    },
    {
        id: 'city',
        numeric: false,
        disablePadding: false,
        label: 'Cidade',
    },
    {
        id: 'olt',
        numeric: false,
        disablePadding: false,
        label: 'OLT',
    },
    {
        id: 'incidents',
        numeric: false,
        disablePadding: false,
        label: 'Nº de incidentes',
    },
    {
        id: 'slot',
        numeric: true,
        disablePadding: false,
        label: 'Placa',
    },
    {
        id: 'pon',
        numeric: true,
        disablePadding: false,
        label: 'Pon',
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
const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
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
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            underline="none"
                            color="neutral"
                            textColor={active ? 'primary.plainColor' : undefined}
                            component="button"
                            onClick={createSortHandler(headCell.id)}
                            startDecorator={
                                headCell.numeric ? (
                                    <ArrowDownwardIcon
                                        sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                                    />
                                ) : null
                            }
                            endDecorator={
                                !headCell.numeric ? (
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
                Passivos de Rede
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