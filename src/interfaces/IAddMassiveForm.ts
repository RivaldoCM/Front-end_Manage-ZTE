export type IAddMassive = {
    cityId: number | null
    forecastReturn: string,
    failureTime: string,
    forecastDateToISO: string | null,
    failureDateToISO: string | null,
    cityName: string,
    problemType: string,
    description: string,
    affectedLocals: string
}