import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { IAuthContextProviderProps } from '../interfaces/IAuthContextProps';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useEffect } from 'react';

export function DataPickerContext(props: IAuthContextProviderProps) {
    
    useEffect(() => {
        dayjs.locale('pt-br');
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {props.children}
        </LocalizationProvider>
    );
}