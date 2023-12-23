import { IAuthOnuProps } from "./IAuthOnuProps";

export interface IUpdateConnectionProps extends IAuthOnuProps {
    oltId?: number;
    dataOlt?: Array<any[]>,
    connectionData: {
        connectionId: number, 
        contractId: number, 
        password: string
    };
}