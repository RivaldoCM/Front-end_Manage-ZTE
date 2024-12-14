import React, { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError: (error: any) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanSuccess, onScanError }) => {
    useEffect(() => {


        const scanner = new Html5Qrcode(
            "reader",
        );
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        scanner.start({ facingMode: "environment" }, config, onScanSuccess, onScanError);
        return () => {
            scanner.clear();
        };
    }, [onScanSuccess, onScanError]);

    return <div id="reader" style={{ width: "100%", height: "300px" }} />;
};
