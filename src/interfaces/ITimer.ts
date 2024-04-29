type ITimer = {
    dataUserInBrakTime: IDataUserInBreakTime,
    isBackDrop: boolean,
    getFinishedData?: (param: number) =>  void
}