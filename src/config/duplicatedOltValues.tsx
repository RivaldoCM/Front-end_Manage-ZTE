import MenuItem from '@mui/material/MenuItem';

import { Olt } from '../interfaces/olt';

const processedCityIds = new Set<number>();
export const renderCityMenuItem = (value: Olt, index: number) => {
    // Adicione outros city_id específicos conforme necessário
    const cityIdsToRenderOnce = [22];

    if (cityIdsToRenderOnce.includes(value.city_id)) {
        if (!processedCityIds.has(value.city_id)) {
            processedCityIds.add(value.city_id);
            if(value.city_id === 22){

                return (
                    <MenuItem key={index} value={value.name}>
                        TOMBOS
                    </MenuItem>
                );
            }
        }
        return null; // Ignorar outros casos para city_id específicos já processados
    }

    // Renderizar itens normais para outros city_id
    return (
        <MenuItem key={index} value={value.name}>
            {value.name}
        </MenuItem>
    );
};