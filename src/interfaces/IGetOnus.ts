type IGetOnu = {
    id: number,
    status: string,
    slot: number,
    pon: number,
    alias?: string,
    temperature?: number,
    voltage?: number,
    onuRx?: number,
    onuTx?: number,
    oltRx?: number,
    oltTx?: number,
    distance?: string,
    uptime?: string,
    firmware?: string,
    model?: string,
    modelOlt: string,
    macs?: [{ 
        mac: string,
        vlan: number
    }],
    wireless?: {
        wface: {
            name: string,
            password: string,
            authType: string,
            encryption: string,
            isolation: string,
            currentUsers: number
        }
    }
    alarms?: [{
        createdAt: string,
        finishAt: string,
        cause: string
    }]
}