import React, { useEffect, useState } from 'react';
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
    const [onu, setOnu] = useState<IOnuLogs[]>([]);
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

    const handleFilterChange = (filter: IFilterOnuLogs) => {
        setFilterParams(filter);
    };

    return (
        <TableContainer component={Paper}>
            <FilterOptions onFilterChange={handleFilterChange}/>
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
                    {onu.map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}