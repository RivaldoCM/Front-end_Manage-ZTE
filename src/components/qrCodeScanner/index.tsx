import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { QRCodeContainer } from './style';

interface QRCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError: (error: any) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanSuccess, onScanError }) => {
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
  
    return (
        <QRCodeContainer id={qrCodeRegionId}></QRCodeContainer>
    );
};
