export type IOltProps = {
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

export type IOlt = {
    id: number;
    name: string;
    host: string;
    is_active: boolean;
    telnet_user: string;
    telnet_password: string;
    gepon_password: string | null;
    gepon_user: string | null;
    gepon_enable_password: string | null;
    city_id: number;
    voalle_id: number | null,
    Olt_Manufacturer: {
        name: string;
    };
    Olt_Model: {
        name: string;
    };
} 