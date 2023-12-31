export interface IDeleteOnu {
    obj: Array<{
        ip: string;
        type: string;
        serial: string;
    }>;
}