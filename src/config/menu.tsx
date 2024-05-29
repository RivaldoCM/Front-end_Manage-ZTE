import cloneDeep from 'lodash/cloneDeep';

import { IAllPages } from '../interfaces/IAllPages';

import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';

export var handleDynamicPagesByRule: IAllPages[];
export const handlePages: IAllPages[] = [
    {
        name: "ÁREA TÉCNICA",
        pages: [
           {
                auth_onu: 'PROVISIONA ONU'
           },
           {
                onuDelete: 'DESPROVISIONA ONU'
           },
           {
                my_auth_onus: 'MEUS PROVISIONAMENTOS'
           }
        ]
    },
    {
        name: "ADMIN",
        pages: [
            {
                users: 'USUÁRIOS',
            },
            {
                olts: "OLT's"
            }
        ]
    },
    {
        name: 'AUDITORIA',
        pages: [
            {
                logs_onu: 'LOG DE ONU',
            }
        ]
    },
    {
        name: 'MASSIVAS',
        pages: [
            {
                massive: "MASSIVAS"
            },
            {
                logs_massive: 'HISTÓRICOS'
            }
        ]
    },
    {
        name: 'PAUSAS',
        pages: [
            {
                'break_time/dashboard': 'DASHBOARD DE PAUSAS'
            },
            {
                'break_time/breaks': 'HORÁRIOS DE PAUSA'
            },
            {
                'break_time/panel': 'PAINEL DE PAUSAS'
            },
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
        case 1:
        case 2: 
            let withoutDashboardBreak = cloneDeep(handlePages);
            withoutDashboardBreak.splice(0,3);
            withoutDashboardBreak[0].pages.splice(0,1);
        return handleDynamicPagesByRule = withoutDashboardBreak;
        case 3:
            let onlyBreakTime = cloneDeep(handlePages);
            onlyBreakTime.splice(0,3);

            return handleDynamicPagesByRule = onlyBreakTime;
        default:
            let onlyAuthOnu = cloneDeep(handlePages);
            onlyAuthOnu.splice(1, 3);
        return handleDynamicPagesByRule = onlyAuthOnu;
    }
}

export const handleIconMenu = (text: string): React.ReactElement => {
    switch(text){
        case 'auth_onu':
            return <MiscellaneousServicesOutlinedIcon />;
        case 'onuDelete':
            return <HighlightOffOutlinedIcon />;
        case 'users':
            return <AdminPanelSettingsOutlinedIcon />;
        case "olts":
            return <AccountTreeOutlinedIcon />;
        case 'logs_onu':
            return <TroubleshootOutlinedIcon />;
        case 'massive':
            return <PublicRoundedIcon />;
        case 'logs_massive':
            return <FindInPageOutlinedIcon />;
        case 'my_auth_onus':
            return <BallotOutlinedIcon />;
        case 'break_time/breaks':
            return <AccessTimeRoundedIcon />;
        case 'break_time/dashboard':
            return <SpaceDashboardOutlinedIcon />;
        case 'break_time/panel':
            return <TvOutlinedIcon />;
        default:
            return <></>;
    }
};