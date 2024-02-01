import React, { useEffect, useMemo, useState } from 'react';
import { formatDataToEnFormat, getOnuLogs } from '../../../services/apiManageONU/getOnuLogs';
import { FilterOptions } from './filterOptions';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ResponsiveTable } from './style';
import { TablePagination } from '@mui/material';
import dayjs from 'dayjs';

function stableSort<T>(array: readonly T[]) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function Row(props: IOnuLogsProps) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="left">{row.created_at}</TableCell>
                <TableCell component="th" scope="row">
                    {row.User.name}
                </TableCell>
                <TableCell align="left">{row.City.name}</TableCell>
                <TableCell align="left">{row.Olt.name}</TableCell>
                <TableCell align="left">{row.slot}</TableCell>
                <TableCell align="left">{row.pon}</TableCell>
                <TableCell align="left">{row.serial_onu}</TableCell>
                <TableCell align="left">{row.pppoe}</TableCell>
                <TableCell align="left">{row.rx_power}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Histórico
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export function LogsOnu() {
    const [page, setPage] = useState(0);
    const [onu, setOnu] = useState<IOnuLogs[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterParams, setFilterParams] = useState<any>();

    useEffect(() => {
        async function getData(){
            const data = await getOnuLogs(filterParams);

            if(data.success){
                setOnu(data.responses.response);
            }
        };
        getData();
    }, [filterParams]);

    const visibleRows = useMemo(() => 
    stableSort(onu).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    ),
    [page, rowsPerPage, onu]
);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (_event: unknown, newPage: number) => { setPage(newPage); };

    const handleFilterChange = (filter: IFilterOnuLogs | null) => {
        setFilterParams(filter);
    };

    return (
        <TableContainer component={Paper}>
            <FilterOptions onFilterChange={handleFilterChange}/>
            <ResponsiveTable>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Data</TableCell>
                            <TableCell>Provisionado por</TableCell>
                            <TableCell align="left">Cidade</TableCell>
                            <TableCell align="left">OLT</TableCell>
                            <TableCell align="left">Placa</TableCell>
                            <TableCell align="left">Pon</TableCell>
                            <TableCell align="left">Serial</TableCell>
                            <TableCell align="left">PPPoE</TableCell>
                            <TableCell align="left">Sinal recebido pela OLT</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </ResponsiveTable>
            <TablePagination
                rowsPerPageOptions={[10, 15, 25]}
                component="div"
                count={onu.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}