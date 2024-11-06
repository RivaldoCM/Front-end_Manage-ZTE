import cloneDeep from 'lodash/cloneDeep';

import { IAllPages } from '../interfaces/IAllPages';

import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import BallotOutlinedIcon from '@mui/icons-material/BallotOutlined';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import { IconExitLag } from '../assets/icons/iconExitLag';
import WifiChannelOutlinedIcon from '@mui/icons-material/WifiChannelOutlined';

export var handleDynamicPagesByRule: IAllPages[];
export const handlePages: IAllPages[] = [
    {
        name: "Area Tecnica",
        pages: [
           {
                auth_onu: 'Provisiona ONU'
           },
           {
                onuDelete: 'Desprovisiona ONU'
           },
           {
                my_auth_onus: 'Meus Provisionamentos'
           },
           {
                onu_info: 'Consultar ONU'
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
    },
    {
        name: 'Auditoria',
        pages: [
            {
                logs_onu: 'Log de Onu',
            }
        ]
    },
    {
        name: 'Massiva',
        pages: [
            {
                massive: "Massivas"
            },
            {
                logs_massive: 'Históricos'
            },
            {
                massive_panel: 'Painel de Massivas'
            }
        ]
    },
    {
        name: 'Pausas',
        pages: [
            {
                'break_time/dashboard': 'Dashboard de Pausas'
            },
            {
                'break_time/breaks': 'Horários de Pausa'
            },
            {
                'break_time/panel': 'Painel de Pausas'
            },
        ]
    },
    {
        name: "Telecom",
        pages: [
            {'fiber_network': 'Mapa de rede Fibra'}
        ]
    },
    {
        name: 'ExitLag',
        pages: [
            {'exitlag': 'Dashboard Clientes'}
        ]
    }
]

export const handleShowPageByRule = (rule?: number) => {
    switch(rule){
        case 14:
        case 15:
        case 16:
        case 17:
            let allPages = cloneDeep(handlePages);
        return handleDynamicPagesByRule = allPages;
        case 10: 
            let onusMassive = cloneDeep(handlePages);
            onusMassive.splice(1,2);
            onusMassive.splice(2,2);
            onusMassive[1].pages.splice(1,2);
        return handleDynamicPagesByRule = onusMassive;
        case 1:
        case 2: 
            let withoutDashboardBreak = cloneDeep(handlePages);
            withoutDashboardBreak.splice(0,3);
            withoutDashboardBreak[1].pages.splice(0,1);
        return handleDynamicPagesByRule = withoutDashboardBreak;
        case 6:
            let massiveAndExitLag = cloneDeep(handlePages);
            massiveAndExitLag.splice(0,3);
            massiveAndExitLag.splice(1,1);
            return handleDynamicPagesByRule = massiveAndExitLag;
        case 3:
            let onlyBreakTime = cloneDeep(handlePages);
            onlyBreakTime.splice(0,3);
            return handleDynamicPagesByRule = onlyBreakTime;
        default:
            let onlyMassive = cloneDeep(handlePages);
            onlyMassive.splice(0,3);
            onlyMassive.splice(1,2);
        return handleDynamicPagesByRule = onlyMassive;
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
            return <ViewModuleOutlinedIcon />;
        case 'logs_massive':
            return <LibraryBooksOutlinedIcon />;
        case 'massive_panel':
            return <DesktopWindowsOutlinedIcon />;
        case 'my_auth_onus':
            return <BallotOutlinedIcon />;
        case 'break_time/breaks':
            return <AccessTimeRoundedIcon />;
        case 'break_time/dashboard':
            return <SpaceDashboardOutlinedIcon />;
        case 'break_time/panel':
            return <TvOutlinedIcon />;
        case 'exitlag':
            return <IconExitLag />;
        case 'onu_info':
            return <WifiChannelOutlinedIcon />;
        default:
            return <></>;
    }
};