import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QRCodeScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError: (error: any) => void;
}

export const QRCodeScanner: React.FC<QRCodeScannerProps> = ({ onScanSuccess, onScanError }) => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 },
        true
        );

        // Inicia o scanner com as funções de sucesso e erro passadas como props
        scanner.render(onScanSuccess, onScanError);

        // Limpa o scanner quando o componente for desmontado
        return () => {
            scanner.clear();
        };
    }, [onScanSuccess, onScanError]);

  return <div id="reader" style={{ width: "100%", height: "400px" }} />;
};
