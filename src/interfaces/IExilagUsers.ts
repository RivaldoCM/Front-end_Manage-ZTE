type IExitLagUsers = {
    id: number;
    active: number;
    updatedAt: Date;
    client: {
        firstName: string,
        email: string,
        lastLogin: string
    };
    contract: {
        id: number,
        name: string
    };
}