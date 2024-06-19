import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import { MapsModalContainer, SideMapStyle } from './style';
import { Alert, IconButton, Modal, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type LocalMapsTypes = {
    open: boolean;
    locations: {name: string, lat: number, lng: number}[];
    handleClose: () => void;
}

export function MapModal(props: LocalMapsTypes){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Modal
            className="flex"
            open={props.open}
            onClose={props.handleClose}
        >
            <MapsModalContainer className='flex'>
                {
                    props.locations.length > 0 && (
                        <LoadScript googleMapsApiKey={import.meta.env.VITE_API_GOOGLE_MAPS}>
                            <GoogleMap
                                mapContainerClassName='map'
                                zoom={10}
                                center={{
                                    lat: props.locations[0].lat,
                                    lng: props.locations[0].lng,
                                }}
                            >
                                {
                                    props.locations.map((location, index: number) => {
                                        return(
                                            <Marker
                                                key={index} 
                                                position={{ lat: location.lat!, lng: location.lng!}} 
                                                title={location.name}
                                            />
                                        )
                                    })
                                }
                            </GoogleMap>
                        </LoadScript>
                    )
                }
                <SideMapStyle className='flex'>
                    <IconButton size="small" color="error" onClick={() => props.handleClose()}>
                        <CloseIcon />
                    </IconButton>
                    {
                        matches ? <></> :
                        <Alert severity="info">
                            Passe o mause sobre um ponto vermelho para ver a quem pertence.
                        </Alert>
                    }
                    <ul className='list-clients flex'>
                        {
                            props.locations.map((client, index: number) => {
                                return(
                                    <li className="flex client" key={index}>
                                        <p><b>{index + 1}</b>: {client.name} </p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </SideMapStyle>
            </MapsModalContainer>
        </Modal>
    )
}