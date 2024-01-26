import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { IAuthContextProviderProps } from '../interfaces/IAuthContextProps';

export function DataPickerContext(props: IAuthContextProviderProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {props.children}
        </LocalizationProvider>
    );
}