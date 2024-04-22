type IBreaktime = {
    id: number,
    created_at: Date,
    secondsLeft: number,
    isActive: boolean,
    User:{
        id: number,
        name: string
    },
    break_Time_Types:{
        name: string,
        duration: number
    } 
}

type IDataUserInBreakTime = {
    id?: IBreaktime['id'],
    startAt: number,
    duration: number
}