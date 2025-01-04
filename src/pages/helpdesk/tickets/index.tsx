import { useEffect, useState } from "react";

import { Controller, InfoCard } from "./style";
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
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
import { EnhancedTableHead, EnhancedTableToolbar, getComparator, labelDisplayedRows } from "./table";
import CreateTicket from "./modals/AddTicket";
import { ViewTicketModal } from "./modals/viewTicket";
import { useAuth } from "../../../hooks/useAuth";
import { getTickets } from "../../../services/apiManageONU/getTickets";
import { IResponseData, IResponseError } from "../../../interfaces/IDefaultResponse";
import { useResponse } from "../../../hooks/useResponse";
import AddTicket from "./modals/AddTicket";

type Order = 'asc' | 'desc';

interface Data {
    ticketId: number;
    createdBy: string;
    appropriatedBy: string;
    status: string;
    problemType: number;
}

export function Tickets(){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('calories');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [rows, setRows] = useState([]);

    const [openNewTicket, setOpenNewTicket] = useState(false);
    const [openViewTicket, setOpenViewTicket] = useState(false);

    useEffect(() => {
        async function getData(){
            let data: IResponseData | IResponseError;
            if(user?.rule !== 19){
                data = await getTickets({userId: user?.uid});
            } else {
                data = await getTickets({departmentId: user?.rule});
            }

            if(data){
                if(data.success){
                    setRows(data.responses.response);
                }else{
                    setRows([]);
                    setFetchResponseMessage('error/no-connection-with-API');
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }
        }
        getData();
    }, []);

    const handleOpenNewTicket = () => { setOpenNewTicket(true); }
    const handleCloseNewTicket = () => { setOpenNewTicket(false) }
    const handleOpenViewTicket = () => { setOpenViewTicket(true); }
    const handleCloseViewTicket = () => { setOpenViewTicket(false) }

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelected = rows.map((n) => n.name);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
    };

    const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
        if(selected[0] === id){
            setSelected([]);
            return;
        }
        setSelected([id]);
    };
      
    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };
      
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
    };
    
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return(
        <Controller className="flex">
            <header>
                <Button
                    onClick={handleOpenNewTicket}
                    startDecorator={<Add />} 
                    color="success"
                    size="sm"
                >
                    Novo ticket
                </Button>
            </header>
            <section className="flex">
                <InfoCard>
                    <p>Abertos</p>
                    <p>0</p>
                </InfoCard>
                <InfoCard>
                    <p>Encerram hoje</p>
                    <p>2</p>
                </InfoCard>
                <InfoCard>
                    <p>Em atraso</p>
                    <p>5</p>
                </InfoCard>
                <InfoCard>
                    <p>Em atraso</p>
                    <p>5</p>
                </InfoCard>
            </section>
            <section>
                <Sheet
                    variant="outlined"
                    sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}
                >
                    <EnhancedTableToolbar 
                        numSelected={selected.length} 
                        onOpenViewTicket={handleOpenViewTicket}
                    />
                    <Table
                        stickyFooter
                        hoverRow
                        sx={{
                            '--TableCell-headBackground': 'transparent',
                            '--TableCell-selectedBackground': (theme) =>
                                theme.vars.palette.success.softBg,
                            '& thead th:nth-child(1)': {
                                width: '40px',
                            },
                            '& thead th:nth-child(2)': {
                                width: '120px',
                            },
                            '& tr > *:nth-child(n+3)': { textAlign: 'center' },
                        }}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <tbody>
                        {[...rows]
                            .sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = selected.includes(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <tr
                                    onClick={(event) => handleClick(event, row.name)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.name}
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
                                        {row.id}
                                    </th>
                                    <td>{row.created_by.name}</td>
                                    <td>{row.fat}</td>
                                    <td>{row.carbs}</td>
                                    <td>{row.protein}</td>
                                </tr>
                            );
                        })}
                        {emptyRows > 0 && (
                            <tr
                                style={{
                                    height: `calc(${emptyRows} * 40px)`,
                                    '--TableRow-hoverBackground': 'transparent',
                                    } as React.CSSProperties
                                }
                            >
                                <td colSpan={6} aria-hidden />
                            </tr>
                        )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={6}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            justifyContent: 'flex-end',
                                        }}
                                    >
                                        <FormControl orientation="horizontal" size="sm">
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
            </section>
            {
                openNewTicket && ( 
                    <AddTicket 
                        open={openNewTicket} 
                        handleClose={handleCloseNewTicket}
                    /> 
                )
            }
            {
                openViewTicket && ( 
                    <ViewTicketModal 
                        open={openViewTicket} 
                        handleClose={handleCloseViewTicket}
                    /> 
                )
            }
        </Controller>
    )
}