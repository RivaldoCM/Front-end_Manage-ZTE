import React, { useEffect, useMemo, useState } from 'react';

import { useError } from '../../../hooks/useError';
import { getOnuLogs } from '../../../services/apiManageONU/getOnuLogs';
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
import { Alert, TablePagination } from '@mui/material';

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
                <TableCell align="center">{row.created_at}</TableCell>
                <TableCell component="th" scope="row">
                    {row.User.name}
                </TableCell>
                <TableCell align="center">{row.City.name}</TableCell>
                <TableCell align="center">{row.Olt.name}</TableCell>
                <TableCell align="center">{row.slot}</TableCell>
                <TableCell align="center">{row.pon}</TableCell>
                <TableCell align="center">{row.serial_onu}</TableCell>
                <TableCell align="center">{row.pppoe}</TableCell>
                <TableCell align="center">{row.rx_power}</TableCell>
                <TableCell align="center">{row.onuRx_power}</TableCell>
                <TableCell align="center">{row.is_auth ? 'Provisionada': 'Desprovisionada'}</TableCell>
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
    const { error, errorMessage, severityStatus, handleError } = useError();

    const [page, setPage] = useState(0);
    const [onu, setOnu] = useState<IOnuLogs[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterParams, setFilterParams] = useState<any>();

    useEffect(() => {
        async function getData(){
            const data = await getOnuLogs(filterParams);

            if(data){
                if(data.success){
                    setOnu(data.responses.response);
                    setPage(0);
                } else {
                    setOnu([]);
                }
            } else {
                handleError('error/no-connection-with-API');
                setOnu([]);
            }
        };
        getData();
    }, [filterParams]);

    const visibleRows = useMemo(() => 
        stableSort(onu).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ), [page, rowsPerPage, onu]
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
        <React.Fragment>
            <TableContainer component={Paper}>
            <FilterOptions onFilterChange={handleFilterChange}/>
            <ResponsiveTable>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="center">Data</TableCell>
                            <TableCell align="center">Tecnico</TableCell>
                            <TableCell align="center" sx={{width: 150}}>Cidade</TableCell>
                            <TableCell align="center">OLT</TableCell>
                            <TableCell align="center">Placa</TableCell>
                            <TableCell align="center">Pon</TableCell>
                            <TableCell align="center">Serial</TableCell>
                            <TableCell align="center">PPPoE</TableCell>
                            <TableCell align="center">Sinal recebido pela OLT(dBM)</TableCell>
                            <TableCell align="center">Sinal recebido pela ONU(dBM)</TableCell>
                            <TableCell align="center">Estado</TableCell>
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
            {
                (error ?
                    <Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
                :
                    <></>
                )
            }
        </React.Fragment>
    );
}