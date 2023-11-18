import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Container } from './style';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';

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

    const handleIconMenu: any = (text: string) => {

        switch(text){
            case 'Provisionamento':
                return <MiscellaneousServicesOutlinedIcon />;
            default:
                return <></>;
        }
	};

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Provisionamento'].map((text, _index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={() => { handlePageChange(text); }}
                        >
                            <ListItemIcon>
                                { handleIconMenu(text) }
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
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
