import React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import { SearchInput } from '../../../components/SeachInput';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { IAuthedUser } from '../../../interfaces/IUsers';

//import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

import { useResponse } from '../../../hooks/useResponse';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { updateTicket } from '../../../services/apiManageONU/updateTicket';

type Order = 'asc' | 'desc';
interface Data {
  ticketId: number;
  createdBy: string;
  city: string;
  appropriatedBy: string;
  status: string;
  problemType: number;
}

interface EnhancedTableToolbarProps {
    user: IAuthedUser;
    numSelected: number;
    ticketId: number | undefined;
    isOpened: boolean | undefined;
    originDepartmentId?: number;
    destinationDepartmentId?: number;
    onOpenViewTicket: () => void;
    onOpenEditTicket: () => void;
    //onOpenFinishTicket: () => void;
}

export function labelDisplayedRows({ from, to, count,} : {
  from: number;
  to: number;
  count: number;
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    console.log( orderBy)
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

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
    sort: Boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'ticketId',
        sort: false,
        numeric: false,
        disablePadding: true,
        label: 'Identificador',
    },
    {
        id: 'createdBy',
        sort: false,
        numeric: false,
        disablePadding: false,
        label: 'Aberto por',
    },
    {
        id: 'city',
        sort: true,
        numeric: false,
        disablePadding: false,
        label: 'Cidade',
    },
    {
        id: 'problemType',
        sort: false,
        numeric: false,
        disablePadding: false,
        label: 'Tipo de problema',
    },
    {
        id: 'appropriatedBy',
        sort: false,
        numeric: false,
        disablePadding: false,
        label: 'Apropriado por',
    },
    {
        id: 'status',
        sort: true,
        numeric: true,
        disablePadding: false,
        label: 'Status',
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
    const createSortHandler = (property: keyof Data, isSortable: Boolean) => (event: React.MouseEvent<unknown>) => {
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

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { setFetchResponseMessage } = useResponse();
    const { numSelected, user, ticketId, originDepartmentId, destinationDepartmentId, isOpened } = props;

    const handleAppropriate = async () => {
        if(user.rule === destinationDepartmentId){
            const response = await updateTicket({ ticketId: ticketId!, appropriatedBy: user.uid, userId: user.uid});

            if(response && response.success){
                setFetchResponseMessage(response.responses.status);
            }
        }
    };

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
                    Tickets
                </Typography>
            )}
            {numSelected > 0 ? (
                <React.Fragment>
                    {
                        /*
                        user.rule === destinationDepartmentId && (
                            <Tooltip title="Encerrar ticket" sx={{mr: 1}}>
                                <IconButton size="sm" variant="soft" >
                                    <CheckCircleOutlinedIcon color="success" />
                                </IconButton>
                            </Tooltip>
                        )
                        */
                    }
                    {
                        isOpened && user.rule === destinationDepartmentId && (
                            <Tooltip title="Apropriar-se" sx={{mr: 1}}>
                                <IconButton size="sm" color="primary" variant="soft" onClick={handleAppropriate}>
                                    <PushPinOutlinedIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                    {
                        isOpened && user.rule === originDepartmentId && (
                            <Tooltip title="Editar" sx={{mr: 1}}>
                                <IconButton size="sm" color="primary" variant="soft" onClick={props.onOpenEditTicket}>
                                    <EditOutlinedIcon color="secondary" />
                                </IconButton>
                            </Tooltip>
                        )
                    }
                    <Tooltip title="Vizualizar ticket">
                        <IconButton size="sm" color="primary" variant="soft" onClick={props.onOpenViewTicket}>
                            <VisibilityOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </React.Fragment>
            ) : (
                <Tooltip title="Filter list">
                    <SearchInput placeholder='Busque aqui'/>
                </Tooltip>
            )}
        </Box>
    );
}