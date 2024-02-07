export const verifyOnuType = (serialNumber: string) => {
    switch(serialNumber.toLocaleLowerCase().substring(0, 4)){
        case 'zteg':
            return 'zte';
        case 'prks':
            return 'parks';
        case 'fhtt':
            return 'fiberhome'
        default:
            return 'fiberhome'
        
    };
}