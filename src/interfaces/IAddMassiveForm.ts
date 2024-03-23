export type IAddMassive = {
    cityId: number | null
    forecastReturn: string,
    failureTime: string,
    forecastDateToISO: Date | null,
    failureDateToISO: Date | null,
    cityName: string,
    problemType: string,
    description: string,
    affectedLocals: string
}