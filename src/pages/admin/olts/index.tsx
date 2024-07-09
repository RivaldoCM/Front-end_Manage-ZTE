import React, { useState, useEffect, useMemo } from 'react';

import { getOlt } from '../../../services/apiManageONU/getOlt';
import { IOlt } from '../../../interfaces/IOlt';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { useError } from '../../../hooks/useError';

import Alert from '@mui/material/Alert';
import { EnhancedTableHead, EnhancedTableToolbar } from './table';

function stableSort<T>(array: readonly T[]) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
       
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export function Olts(){
    const { error, errorMessage, severityStatus, handleError } = useError();

    const [ oltDataSelected, setOltDataSelected ] = useState();
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [olt, setOlt] = useState<IOlt[]>([]);

    useEffect(() => {
        async function olts(){
            const oltData = await getOlt({});

            if(oltData.success){
                setOlt(oltData.responses.response);
            }else{
                setOlt([]);
                handleError('unable-load-data');
            }
        }
        olts();
    }, []);

    const handleClick = (_event: React.MouseEvent<unknown>, id: number, row: any) => {
        setOltDataSelected(row);
        if(selected[0] === id){
            setSelected([]);
            return;
        }
        setSelected([id]);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (page) * rowsPerPage - olt.length) : 0;

    const visibleRows = useMemo(() =>
        stableSort(olt).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        ),
        [page, rowsPerPage, olt]
    );

    const renderTypeOlt: any = (typeOlt: number) => {
        switch(typeOlt){
            case 10:
                return <TableCell align="right">ZTE</TableCell>
            case 20:
                return <TableCell align="right">PARKS</TableCell>
            case 30:
                return <TableCell align="right">FIBERHOME</TableCell>
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} oltDataSelected={oltDataSelected}/>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead />
                        <TableBody>
                        {visibleRows.map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row.id, row)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        checked={isItemSelected}
                                        inputProps={{
                                        'aria-labelledby': labelId,
                                        }}
                                    />
                                    </TableCell>
                                    <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                    >
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.host}</TableCell>

                                    {renderTypeOlt(row.type)}
                                    {
                                        row.isPizzaBox ? 
                                        <TableCell align="right">Sim</TableCell>
                                        :
                                        <TableCell align="right">Não</TableCell>
                                    }
                                    <TableCell align="right">{row.voalleAccessPointId}</TableCell>
                                </TableRow>
                                
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: (dense ? 33 : 53) * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 25]}
                    component="div"
                    count={olt.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                sx={{margin: '0'}}
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Modo compacto"
            />
            {
                (error ?
                    <Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
                :
                    <></>
                )
            }
        </Box>
    );
}