type IFilterOnuLogs = {
    initialDate: string | null;
    lastDate: string | null;
    userId: number | null;
    cityId: number | null;
    oltId: number | null;
    state: string ;
}

type IFilterOnuLogsProps = {
    onFilterChange: (filter: IFilterOnuLogs | null) => void
}