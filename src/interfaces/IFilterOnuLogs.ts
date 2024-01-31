type IFilterOnuLogs = {
    initialDate: string | null;
    lastDate: string | null;
    userId: number | null;
    cityId: number | null;
    oltId: number | null;
    state: number | null;
}

type IFilterOnuLogsProps = {
    onFilterChange: (filter: IFilterOnuLogs) => void
}