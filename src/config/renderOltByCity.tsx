import MenuItem from '@mui/material/MenuItem';

import { IOlt } from "../interfaces/IOlt";

export const handleOltByCity = (olts: IOlt[] | undefined) => {  
    const cityIds = new Set<number>();
    const oltNames = new Set<string>();

    if(olts){
        return olts.map((olt, index: number) => {
            if(!cityIds.has(olt.city_id) && !oltNames.has(olt.name)){
                cityIds.add(olt.city_id);
                oltNames.add(olt.name);

                return(
                    <MenuItem key={index} value={olt.name}>
                        {olt.name}
                    </MenuItem>
                )
            } else {
                //OLT's DA MESMA REGIÃO POREM EM LOCAIS DIFERENTES


                let match = olt.name.match(/([a-zA-Z]+)/);
                for(let name of oltNames){
                    if(match && !name.includes(match[1]) && !oltNames.has(match[1])){
                        console.log(match)
                        return(
                            <MenuItem key={index} value={match[1]}>
                                {match.input}
                            </MenuItem>
                        )
                    }
                }
            }
            return null;
        });
    }
    return [];
};