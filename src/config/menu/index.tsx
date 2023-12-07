import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

export var handleDynamicPagesByRule: any[] = []

export const handleShowPageByRule = (rule: number) => {

    if(rule === 17){
        handleDynamicPagesByRule = [...handlePages]
    }else if(rule === 1){
        handleDynamicPagesByRule = [...handlePages.slice(1)]
    }
    console.log(handleDynamicPagesByRule)
}

export const handlePages = [
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