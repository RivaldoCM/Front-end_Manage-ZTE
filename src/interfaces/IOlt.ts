export type IOlt = {
    id?: number | '';
    name: string;
    host: string;
    manufacturerId: number | '';
    modelId: number | '';
    cityId: number | '';
    isActive: boolean | '';
    telnetUser: string;
    telnetPassword: string;
    geponUser?: string | null;
    geponPassword?: string | null;
    enablePassword?: string | null;
    voalleId?: number | '',
} 