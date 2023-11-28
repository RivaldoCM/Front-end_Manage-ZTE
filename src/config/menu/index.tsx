import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';

export const handlePages = [
    {
        name: "Area Tecnica",
        pages: [
            "Provisionamento",

        ]
    },
    {
        name: "Admin",
        pages: [
            "Provisionamento",

        ]
    }
]

export const handleIconMenu: any = (text: string) => {
    switch(text){
        case 'Provisionamento':
            return <MiscellaneousServicesOutlinedIcon />;
        default:
            return <></>;
    }
};