import { useState } from "react";
import { Controller } from "./style";
import { QRCodeScanner } from ".";

export function ModalQRCodeViwer(){

    const [qrCode, setQRCode] = useState<string | null>(null);

    const handleScanSuccess = (decodedText: string) => {
        setQRCode(decodedText);  // Atualiza o estado com o valor do QR Code lido
        console.log("QR Code lido:", decodedText);
    };

      const handleScanError = (error: any) => {
        console.error("Erro ao ler QR Code:", error);
    };

    return(
        <Controller>
            <QRCodeScanner
                onScanSuccess={handleScanSuccess} 
                onScanError={handleScanError} 
            />
            {qrCode && <p>QR Code lido: {qrCode}</p>}
        </Controller>
    )
}