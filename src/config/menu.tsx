import cloneDeep from 'lodash/cloneDeep';

import { IAllPages } from '../interfaces/IAllPages';

import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';

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
    },
    {
        name: 'Auditoria',
        pages: [
            {
                logs_onu: 'Log de Onu',
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
            console.log(onlyAuthOnu)
            onlyAuthOnu.splice(1, 2);
        return handleDynamicPagesByRule = onlyAuthOnu;
    }
}

export const handleIconMenu = (text: string): React.ReactElement => {
    switch(text){
        case 'provisionamento':
            return <MiscellaneousServicesOutlinedIcon />;
        case 'onuDelete':
            return <HighlightOffOutlinedIcon />;
        case 'users':
            return <AdminPanelSettingsOutlinedIcon />;
        case "olts":
            return <AccountTreeOutlinedIcon />;
        case 'logs_onu':
            return <TroubleshootOutlinedIcon />;
        default:
            return <></>;
    }
};