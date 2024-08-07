import { Box, Typography } from "@mui/material";

import Svg from '../../assets/responsive.svg?react';

export function ResponsiveAlert(){
    return(
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            height="100%"
        >
            <Svg style={{ width: '50%', height: '50%' }}/>
            <Typography variant="h6" color="textSecondary">
                Está tela não suporta as dimensões deste dispositivo.
            </Typography>
        </Box>
    )
}