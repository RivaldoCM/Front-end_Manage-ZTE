import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { handleIconMenu, handlePages } from '../../config/menu';

import { Container } from './style';
import { StyledMenu } from '../DesktopMenu/style';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';



type Anchor = 'top' | 'left' | 'bottom' | 'right';

export function MobileDrawerMenu() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = 
        (anchor: Anchor, open: boolean) => 
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handlePageChange = (text: string) => {
        navigate(`/${text}`);
    }

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {handlePages.map((area, index) => (
                    <div key={index}>
                        <StyledMenu>{area.name}</StyledMenu>
                        <List>
                            {area.pages.map((page, pageIndex) => (
                                <ListItem key={pageIndex} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    onClick={() => { handlePageChange(page); }}
                                    sx={{
                                        minHeight: 48,
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {handleIconMenu(page)}
                                    </ListItemIcon>
                                    <ListItemText primary={page} sx={{ padding: '1rem' }}/>
                                </ListItemButton>
                            </ListItem>
                            ))}
                        </List>
                    </div>
                ))}
            </List>
        </Box>
    );

    return (
        <Container>
            <div className='float-menu'>
                {(['left'] as const).map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button
                            className='menu' 
                            onClick={toggleDrawer('left', true)}
                        >
                            <MenuOutlinedIcon />
                        </Button>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
            <Outlet/>
        </Container>
        
    );
}