import { InputContainer } from '../../../../styles/globalStyles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { cleanUpModelName } from '../../../../config/typesOnus';
import { useAuthOnu } from '../../../../hooks/useAuthOnu';

export function ZTEForm(onu: { model: string }){
    const { onus } = useAuthOnu();

    const handleRenderAddicionalConfig = () => {
        const onuModel = cleanUpModelName(onu.model);
    
        switch(onuModel){
            case 'F601':
                return(
                    <div>teste</div>
                )
            case 'F670L':
                return(
                    <div>F670L</div>
                )
        }
    }

    return(
        <form className="flex">
            <InputContainer>
                <div className="text">
                    <p>PPPoE do cliente: </p>
                </div>
                <div className="content">
                    <TextField  variant="standard" ></TextField>
                </div>
            </InputContainer>
            <InputContainer>
                <div className="text">
                    <p>CPF do Cliente: </p>
                </div>
                <div className="content">
                    <TextField 
                        variant="standard"
                    >
                    </TextField>
                </div>
            </InputContainer>
            {
                handleRenderAddicionalConfig()
            }
            {
                <div className="flex">
                    <Button
                        type="submit" 
                        variant="outlined" 
                        endIcon={<AddOutlinedIcon />}
                    >
                        Provisionar
                    </Button>
                </div>
            }
        </form>
    )   
}