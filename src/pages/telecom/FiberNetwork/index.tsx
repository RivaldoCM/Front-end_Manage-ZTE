import React, { useEffect, useState } from 'react';
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
import { Data, EnhancedTableHead, EnhancedTableToolbar, getComparator, labelDisplayedRows } from './table';
import AddItemModal from './modals/addItem';

import { TableController } from './style';
import { getNetworkTopology } from '../../../services/apiManageONU/getNetworkTopology';
import { useResponse } from '../../../hooks/useResponse';
import DeleteItemModal from './modals/deleteItem';

type Order = 'asc' | 'desc';

export function FiberNetwork(){
    const { setFetchResponseMessage } = useResponse();

    const [networkData, setNetworkData] = useState<IFiberNetwork[]>([]);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('name');
    const [isNested, setIsNested] = useState<Boolean>(false);
    const [selected, setSelected] = useState<IFiberNetwork[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [openAddItemModal, setOpenAddItemModal] = useState(false);
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);

    useEffect(() => {
        async function getData(){
            const data = await getNetworkTopology({});
            if(data){
                if(data.success){
                    setNetworkData(data.responses.response);
                }else{
                    setNetworkData([]);
                    setFetchResponseMessage('error/no-connection-with-API');
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }
        }
        getData();
    }, []);

    const handleRequestSort = (
        _event: React.MouseEvent<unknown>,
        property: keyof Data,
        isNested: boolean
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setIsNested(isNested);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = networkData.map((n) => n);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (_event: React.MouseEvent<unknown>, item: IFiberNetwork) => {
        const selectedIndex = selected.indexOf(item);
        let newSelected: IFiberNetwork[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, item);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (newPage: number) => { setPage(newPage); };
    const handleChangeRowsPerPage = (_event: any, newValue: number | null) => {
        setRowsPerPage(parseInt(newValue!.toString(), 10));
        setPage(0);
    };

    const getLabelDisplayedRowsTo = () => {
        if (networkData.length === -1) {
            return (page + 1) * rowsPerPage;
        }
        return rowsPerPage === -1
        ? networkData.length
        : Math.min(networkData.length, (page + 1) * rowsPerPage);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - networkData.length) : 0;

    const handleOpenAddItem = () => setOpenAddItemModal(true);
    const handleCloseAddItem = () => setOpenAddItemModal(false);
    const handleOpenFilter = () => setOpenFilterModal(true);
    const handleCloseFilter = () => setOpenFilterModal(false);
    const handleOpenEditItem = () => setOpenEditModal(true);
    const handleCloseEditItem = () => setOpenEditModal(false);
    const handleOpenDeleteItem = () => setOpenDeleteItemModal(true);
    const handleCloseDeleteItem = () => setOpenDeleteItemModal(false);

    return (
        <TableController className='teste'>
            <Sheet
                variant="outlined"
                sx={{ width: '100%', boxShadow: 'sm', border: 'none', overflow: 'auto', }}
            >
                <EnhancedTableToolbar 
                    numSelected={selected.length}
                    onOpenAddItemModal={handleOpenAddItem}
                    onOpenDeleteItemModal={handleOpenDeleteItem}
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
                            width: '15%',
                        },
                        '& thead th:nth-child(3)': {
                            width: '5%',
                        },
                        '& tr > *:nth-child(n+3)': { textAlign: 'center' },
                        '> thead' : {
                            position: 'sticky',
                            top: 122,
                            background: '#fdfdfd',
                            zIndex: '100'
                        }
                    }}
                >
                    <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={networkData.length}
                    />
                    <tbody>
                        {[...networkData]
                            .sort(getComparator(order, orderBy, isNested))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = selected.includes(row);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return(
                                <tr
                                    onClick={(event) => handleClick(event, row)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.name}
                                    // selected={isItemSelected}
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
                                        {row.name}
                                    </th>
                                    <td>{row.number}</td>
                                    <td>{row.Type.name}</td>
                                    <td>{row.City.name}</td>
                                    <td>{row.Olts.name}</td>
                                    <td>{row.slots}</td>
                                    <td>{row.slot}</td>
                                    <td>{row.pon}</td>
                                    <td>{row.incident_count}</td>
                                    <td>{row.status}</td>
                                    <td>{row.lat}</td>
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
                            <td colSpan={12}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <FormControl orientation="horizontal" size="sm" sx={{ fontWeight: '100' }}>
                                        <FormLabel>Linhas por página:</FormLabel>
                                        <Select onChange={handleChangeRowsPerPage} value={rowsPerPage} >
                                            <Option value={25}>25</Option>
                                            <Option value={50}>50</Option>
                                            <Option value={100}>100</Option>
                                            <Option value={200}>200</Option>
                                        </Select>
                                    </FormControl>
                                    <Typography sx={{ textAlign: 'center', minWidth: 80, fontWeight: '100' }}>
                                        {labelDisplayedRows({
                                            from: networkData.length === 0 ? 0 : page * rowsPerPage + 1,
                                            to: getLabelDisplayedRowsTo(),
                                            count: networkData.length === -1 ? -1 : networkData.length,
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
                                            networkData.length !== -1
                                                ? page >= Math.ceil(networkData.length / rowsPerPage) - 1
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
            {
                openAddItemModal ?
                    <AddItemModal 
                        open={openAddItemModal}
                        handleClose={handleCloseAddItem}
                    />
                :
                    <></>
            }
            {
                openDeleteItemModal ?
                    <DeleteItemModal
                        open={openDeleteItemModal}
                        handleClose={handleCloseDeleteItem}
                    />
                :
                    <></>
            }
        </TableController>
    );
}
