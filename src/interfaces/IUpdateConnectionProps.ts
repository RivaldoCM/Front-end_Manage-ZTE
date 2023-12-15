import { IAuthOnuProps } from "./IAuthOnuProps";

export interface IUpdateConnectionProps extends IAuthOnuProps {
    oltId?: number;
    connectionData: {
        connectionId: number, 
        contractId: number, 
        password: string
    };
}