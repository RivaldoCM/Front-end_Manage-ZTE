import MenuItem from '@mui/material/MenuItem';

import { IOlt } from "../interfaces/IOlt";

export const handleOltByCity = (olts: IOlt[] | undefined) => {  
    const oltByCnl = new Set<string>();

    if(olts){
        return olts.map((olt, index: number) => {
            console.log(olt)
            if(!oltByCnl.has(olt.cnl_by_location)){
                oltByCnl.add(olt.cnl_by_location);
                return(
                    <MenuItem key={index} value={olt.name}>
                        {olt.name}
                    </MenuItem>
                );
            }
            return null;
        });
    }
    return [];
};