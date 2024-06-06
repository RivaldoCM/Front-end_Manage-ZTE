import { Modal } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapsContainer } from './style';

export function MapModal(props: any){
    const locations = [
        { name: "Ponto 1", lat: -23.5505, lng: -46.6333 },
        { name: "Ponto 2", lat: -22.9035, lng: -43.2096 },
        // Adicione mais pontos aqui
    ];

    const mapContainerStyle = {
    width: '100%',
    height: '500px',
    };
      
    const center = {
    lat: -23.5505,
    lng: -46.6333,
    };

    return(
        <Modal
            className="flex"
            open={props.open}
            onClose={props.handleClose}
        >
            <MapsContainer>
                <LoadScript googleMapsApiKey='AIzaSyA0OyFWPPH3j3v6BozF3SMQaokkQet1ZSE'>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={5}
                        center={center}
                    >
                    {locations.map((location, index) => (
                    <Marker 
                        key={index} 
                        position={{ lat: location.lat, lng: location.lng }} 
                        title={location.name}
                    />
                    ))}
                    </GoogleMap>
                </LoadScript>
            </MapsContainer>
        </Modal>
    )
}