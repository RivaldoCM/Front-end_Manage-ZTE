const verifyOnuType = (serialNumber: string) => {
    switch(serialNumber.toLocaleLowerCase()){
        case 'zte':
            return 'zte';
        case 'prss':
            return 'parks';
        case 'ftth':
            return 'fiberhome'
        
    };
}