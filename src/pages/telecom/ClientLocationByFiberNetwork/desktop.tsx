import React, { useEffect, useState } from "react";
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { EnhancedTableHead, EnhancedTableToolbar } from "./table";
import { getClientUpdate } from "../../../services/apiManageONU/getClientUpdate";
import { useResponse } from "../../../hooks/useResponse";
import { useAuth } from "../../../hooks/useAuth";
import { useSocket } from "../../../hooks/useSocket";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface Data {
    pppoe: string;
    serialNumber: string;
    rxOnt: number;
    txOlt: number;
    ctoId: number;
    portId: number;
    isUpdated: boolean
}

function labelDisplayedRows({
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

function getComparator<Key extends keyof any>(
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

export default function ClientFiberNetworkData(){
    const { user } = useAuth();
    const { socket } = useSocket();
    const { setFetchResponseMessage } = useResponse();

    const [rows, setRows] = useState<any[]>([]);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('isUpdated');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [upToDate, setUpToDate] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        async function getData(){
            const data = await getClientUpdate();
            if(data){
                if(data.success){
                    setRows(data.responses.response);
                } else {
                    setRows([]);
                    setFetchResponseMessage('error/no-connection-with-API');
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }
        }
        getData();
    },[]);

    useEffect(() => {
        if(socket){
            socket.emit('select_room', {
                uid: user?.uid,
                room: '/client-update'
            });
    
            socket.on('update-data', data => {
                setRows(data.responses.response);
            });
        }
    },[selected]);

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleClick = (_event: React.MouseEvent<unknown>, id: string, upToDate: boolean) => {
        setUpToDate(upToDate);
        if(selected[0] === id){
            setSelected([]);
            return;
        }
        setSelected([id]);
    }

    const handleChangePage = (newPage: number) => { setPage(newPage); };
    const handleChangeRowsPerPage = (_event: any, newValue: number | null) => {
        setRowsPerPage(parseInt(newValue!.toString(), 10));
        setPage(0);
    };

    const getLabelDisplayedRowsTo = () => {
        if (rows.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1
        ? rows.length
        : Math.min(rows.length, (page + 1) * rowsPerPage);
    }

    const handleSentUpdate = () => {
        setSelected([]);
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    return (
        <Sheet
            variant="outlined"
            sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}
        >
            <EnhancedTableToolbar 
                numSelected={selected.length}
                onUpdateSent={handleSentUpdate}
                upToDate={upToDate}
                userId={user?.uid}
                rowId={selected}
            />
            <Table
                aria-labelledby="tableTitle"
                hoverRow
                sx={{
                    '--TableCell-headBackground': 'transparent',
                    '--TableCell-selectedBackground': (theme) =>
                        theme.vars.palette.success.softBg,
                    '& thead th:nth-child(1)': {
                        width: '40px',
                    },
                    '& thead th:nth-child(2)': {
                        width: '30%',
                    },
                    '& tr > *:nth-child(n+3)': { textAlign: 'right' },
                }}
            >
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                />
                <tbody>
                    {[...rows]
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                        const isItemSelected = selected.includes(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <tr
                                onClick={(event) => handleClick(event, row.id, row.is_updated)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                                style={
                                    isItemSelected
                                    ? ({
                                        '--TableCell-dataBackground':
                                            'var(--TableCell-selectedBackground)',
                                        '--TableCell-headBackground':
                                            'var(--TableCell-selectedBackground)',
                                        } as React.CSSProperties)
                                    : {}
                            }
                            >
                                <th scope="row">
                                    <Checkbox
                                        checked={isItemSelected}
                                        slotProps={{
                                            input: {
                                            'aria-labelledby': labelId,
                                            },
                                        }}
                                        sx={{ verticalAlign: 'top' }}
                                    />
                                </th>
                                <th id={labelId} scope="row">
                                    {row.pppoe}
                                </th>
                                <td>{row.serialNumber}</td>
                                <td>{row.ontPower}</td>
                                <td>{row.oltPower}</td>
                                <td>{row.ctoId}</td>
                                <td>{row.portId}</td>
                                <td>{row.Client_created_by.name}</td>
                                <td>{row.Client_updated_by.name}</td>
                                <td>
                                    {
                                        row.is_updated ? 
                                        <CheckCircleOutlinedIcon color="success" fontSize="medium"/> : 
                                        <CancelOutlinedIcon color="error" fontSize="medium"/>
                                    }
                                </td>
                            </tr>
                        );
                    })}
                    {emptyRows > 0 && (
                        <tr
                            style={
                                {
                                height: `calc(${emptyRows} * 40px)`,
                                '--TableRow-hoverBackground': 'transparent',
                                } as React.CSSProperties
                            }
                        >
                            <td colSpan={10} aria-hidden />
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={10}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <FormControl orientation="horizontal" size="sm">
                                    <FormLabel>Linhas por página:</FormLabel>
                                    <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                                        <Option value={5}>5</Option>
                                        <Option value={10}>10</Option>
                                        <Option value={25}>25</Option>
                                    </Select>
                                </FormControl>
                                <Typography sx={{ textAlign: 'center', minWidth: 80 }}>
                                    {labelDisplayedRows({
                                        from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                                        to: getLabelDisplayedRowsTo(),
                                        count: rows.length === -1 ? -1 : rows.length,
                                    })}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton
                                        size="sm"
                                        color="neutral"
                                        variant="outlined"
                                        disabled={page === 0}
                                        onClick={() => handleChangePage(page - 1)}
                                        sx={{ bgcolor: 'background.surface' }}
                                    >
                                        <KeyboardArrowLeftIcon />
                                    </IconButton>
                                    <IconButton
                                        size="sm"
                                        color="neutral"
                                        variant="outlined"
                                        disabled={
                                        rows.length !== -1
                                            ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                                            : false
                                        }
                                        onClick={() => handleChangePage(page + 1)}
                                        sx={{ bgcolor: 'background.surface' }}
                                    >
                                        <KeyboardArrowRightIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </Sheet>
    );
}
