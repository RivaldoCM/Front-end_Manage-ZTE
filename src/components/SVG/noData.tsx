import { Box, Typography } from "@mui/material";

import NoDataSvg from '../../assets/logo.svg?react';

export function NoData(){
    return(
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            height="100%"
        >
            <NoDataSvg style={{ width: '50%', height: '50%' }}/>
            <Typography variant="h5" color="textSecondary">
                Nenhum massiva aberto. AMÉM?
            </Typography>
        </Box>
    )
}