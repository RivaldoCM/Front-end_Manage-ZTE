import cloneDeep from 'lodash/cloneDeep';

import { IAllPages } from '../interfaces/IAllPages';

import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

type IconType = React.ReactElement;

export var handleDynamicPagesByRule: IAllPages[];

export const handlePages: IAllPages[] = [
    {
        name: "Area Tecnica",
        pages: [
           {
                provisionamento: 'Provisiona ONU'
           },
           {
                onuDelete: 'Desprovisiona ONU'
           },
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
        case 14:
        case 15:
        case 16:
            let withoutOlt = cloneDeep(handlePages);
            withoutOlt[1].pages.splice(1, 1);
        return handleDynamicPagesByRule = withoutOlt;
        default:
            let onlyAuthOnu = cloneDeep(handlePages);
            onlyAuthOnu.splice(1, 1);
        return handleDynamicPagesByRule = onlyAuthOnu;
    }
}

export const handleIconMenu = (text: string): IconType => {
    switch(text){
        case 'provisionamento':
            return <MiscellaneousServicesOutlinedIcon />;
        case 'onuDelete':
            return <HighlightOffOutlinedIcon />;
        case 'users':
            return <AdminPanelSettingsOutlinedIcon />;
        case "olts":
            return <AccountTreeOutlinedIcon />;
        default:
            return <></>;
    }
};