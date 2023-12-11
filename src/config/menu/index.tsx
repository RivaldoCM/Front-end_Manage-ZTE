import cloneDeep from 'lodash/cloneDeep';

import { IAllPages } from '../../interfaces/IAllPages';

import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

type IconType = React.ReactElement;

export var handleDynamicPagesByRule: IAllPages[];

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

export const handleShowPageByRule = (rule?: number) => {
    switch(rule){
        case 17:
            let allPages = cloneDeep(handlePages);
        return handleDynamicPagesByRule = allPages;
        case 16:
            let withoutOlt = cloneDeep(handlePages);
            withoutOlt[1].pages.splice(1, 1);
        return handleDynamicPagesByRule = withoutOlt;
        case 1:
            let onlyAuthOnu = cloneDeep(handlePages);
            onlyAuthOnu.splice(1, 1);
        return handleDynamicPagesByRule = onlyAuthOnu;
    }
}

export const handleIconMenu = (text: string): IconType => {
    switch(text){
        case 'provisionamento':
            return <MiscellaneousServicesOutlinedIcon />;
        case 'users':
            return <AdminPanelSettingsOutlinedIcon />;
        case "olts":
            return <AccountTreeOutlinedIcon />;
        default:
            return <></>;
    }
};