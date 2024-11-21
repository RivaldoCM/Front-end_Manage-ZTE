import React, { useState } from 'react';
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
import { createData, Data, EnhancedTableHead, EnhancedTableToolbar, getComparator, labelDisplayedRows } from './table';
import AddItemModal from './modals/addItem';
import DeleteItemModal from './modals/DeleteItem';
import { TableController } from './style';

type Order = 'asc' | 'desc';

const rows = [
  createData('CTO 346', 100, 'doidera', 'CTO', 'Espera Feliz', 'EEF_1', 0, 1 , 5),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

export function FiberNetwork(){
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data>('calories');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const [openAddItemModal, setOpenAddItemModal] = useState(false);
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteItemModal, setOpenDeleteItemModal] = useState(false);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
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

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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

    const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
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

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                sx={{ width: '100%', boxShadow: 'sm', border: 'none' }}
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
                            width: '10%',
                        },
                        '& tr > *:nth-child(n+3)': { textAlign: 'right' },
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
                        rowCount={rows.length}
                    />
                    <tbody>
                        {[...rows]
                            .sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = selected.includes(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return(
                                <tr
                                    onClick={(event) => handleClick(event, row.name)}
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
                                    <td>{row.numeration}</td>
                                    <td>{row.localization}</td>
                                    <td>{row.type}</td>
                                    <td>{row.city}</td>
                                    <td>{row.olt}</td>
                                    <td>{row.incidents}</td>
                                    <td>{row.slot}</td>
                                    <td>{row.pon}</td>
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
