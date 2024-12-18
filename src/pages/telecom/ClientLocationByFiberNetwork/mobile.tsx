import { useState } from "react";
import IconButton from '@mui/joy/IconButton';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { QRCodeScanner } from "../../../components/qrCodeScanner";
import { ModalQRCodeViwer } from "./modals/qrcodeViwer";
import { Mobile } from "./style";

export function ClientLocationByFiberNetwork(){
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleScannerOpen = () => {
        setIsScannerOpen(true);
    }

    const handleScannerClose = () => {
        setIsScannerOpen(false);
    }


    return(
        <Mobile className="flex">
            <IconButton onClick={handleScannerOpen}>
                <QrCodeScannerIcon color="primary"/>
            </IconButton>
            {
                isScannerOpen && (
                    <ModalQRCodeViwer handleClose={handleScannerClose} />
                )
            }
        </Mobile>
    )
}