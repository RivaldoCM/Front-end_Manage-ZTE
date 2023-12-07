import { IAllPages } from '../../interfaces/IAllPages';

import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

export var handleDynamicPagesByRule: IAllPages[];

export const handleShowPageByRule = (rule: number) => {
    console.log(rule)
    switch(rule){
        case 17:
        return handleDynamicPagesByRule = [...handlePages]
        case 16:
            let withoutOlt = [...handlePages]
            withoutOlt[1].pages.splice(1, 1)
        return handleDynamicPagesByRule = [...withoutOlt]
        case 1: 
            let onlyAuthOnu = [...handlePages]
            onlyAuthOnu.splice(1, 1)
        return handleDynamicPagesByRule = [...onlyAuthOnu]
    }

    if(rule === 17){
        
    }else if(rule === 1){

    }

}

export const handlePages: IAllPages[] = [
    {
        name: "Area Tecnica",
        pages: [
           {
                provisionamento: 'Provisionamento'
           }
        ]
    },
    {
        name: "Admin",
        pages: [
            {
                users: 'Usuários',
                
            },
            {
                olts: "OLT's"
            }
        ]
    }
]

export const handleIconMenu: any = (text: string) => {
    switch(text){
        case 'provisionamento':
            return <MiscellaneousServicesOutlinedIcon />;
        case 'users':
            return <AdminPanelSettingsOutlinedIcon />;
        case "olts":
            return <AccountTreeOutlinedIcon />
        default:
            return <></>;
    }
};