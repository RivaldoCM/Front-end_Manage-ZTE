import { useState } from "react";
import { Controller } from "./style";
import { QRCodeScanner } from ".";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export function ModalQRCodeViwer({handleClose}: any){

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
            <div>
                <IconButton size="medium" color="error" onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div>
                <QRCodeScanner
                    onScanSuccess={handleScanSuccess} 
                    onScanError={handleScanError} 
                />
                {qrCode && <p>QR Code lido: {qrCode}</p>}
            </div>
        </Controller>
    )
}