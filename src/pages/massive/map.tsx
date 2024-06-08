import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import { MapsModalContainer, SideMapStyle } from './style';
import { Alert, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export function MapModal(props: any){
    const mapContainerStyle = {
        width: '70%',
        height: '100%',
        borderRadius: '2%'
    };

    return(
        <Modal
            className="flex"
            open={props.open}
            onClose={props.handleClose}
        >
            <MapsModalContainer className='flex'>
                {
                    props.locations.length > 0 && (
                        <LoadScript googleMapsApiKey='AIzaSyB0J2U5dXsOdVpoT1lV49yntCryzvz1vkk'>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                zoom={10}
                                center={{
                                    lat: props.locations[0].lat,
                                    lng: props.locations[0].lng,
                                }}
                            >
                                {
                                    props.locations.map((location: any, index: number) => {
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
                    <Alert severity="info">
                        Passe o mause sobre um ponto vermelho para ver a quem pertence.
                    </Alert>
                    <ul className='list-clients'>
                        {
                            props.locations.map((client: any, index: number) => {
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