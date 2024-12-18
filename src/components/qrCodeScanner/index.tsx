import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { InCamera, QRCodeContainer } from './style';
import IconButton from '@mui/joy/IconButton';
import NoPhotographyIcon from '@mui/icons-material/NoPhotographyOutlined';

interface QRCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError: (error: any) => void;
  handleClose: () => void
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanSuccess, onScanError, handleClose }) => {
    const qrCodeRegionId = "reader";
    const html5QrCode = useRef<Html5Qrcode | null>(null); //UseRef PARA PERSISTIR O ESTADO MESMO RE-RENDERIZANDO
  
    useEffect(() => {
        html5QrCode.current = new Html5Qrcode(qrCodeRegionId);
        const config = {
            fps: 10,
            qrbox: { width: 250, height: 250 },
        };

        html5QrCode.current.start(
            { facingMode: "environment" },
            config,
            (decodedText) => {
                html5QrCode.current!.stop()
                .then(() => {
                    onScanSuccess(decodedText);
                })
            },
            (errorMessage) => {
                onScanError(errorMessage);
            }
        );
    }, []);
  
    const handleCloseScanning = () => {
        //USANDO handleClose DIRETAMENTE NO BOTÃO, NÃO FECHA A CÂMERA, POR ISSO ESSA FUNÇÃO
        html5QrCode.current!.stop();
        handleClose();
    }

    return (
        <InCamera>
            <IconButton
                size='md'
                color='primary'
                variant="soft"
                onClick={handleCloseScanning}
            >
                <NoPhotographyIcon />
            </IconButton>
            <QRCodeContainer id={qrCodeRegionId}></QRCodeContainer>
        </InCamera>
    );
};
