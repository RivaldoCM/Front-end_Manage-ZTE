import { Modal } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { MapsContainer } from './style';
import { useEffect, useState } from 'react';
import { IClientMassive } from '../../interfaces/IClientMassive';

export function MapModal(props: any){
    const [locations, setLocations] = useState<any>({
        name: '',
        lat: '',
        lng: ''
    });

    console.log(props)

    useEffect(() => {
        props.clients.map((client: IClientMassive) => {
            setLocations({
                ...locations,
                name: client.name,
                lat: client.coordinates?.split(',')
            })
        });
    }, []);

        //{ name: "Ponto 1", lat: -23.5505, lng: -46.6333 },





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
            <></>
        </Modal>
    )
}