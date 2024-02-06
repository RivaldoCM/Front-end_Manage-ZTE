import dayjs from "dayjs";

export const formatDateToISOFormat = (date: string, last: boolean) =>{
    const splitedDate = date.split('-');
    const formated = `${splitedDate[1]}-${splitedDate[0]}-${splitedDate[2]}`

    if(last){
        //O 'Z' ESTA PARA INDICAR QUUE É FORMATO UTC E O RESTANTE COMBINADO PARA ISO 8601,
        //ASSIM A DATA É UTC MAS SEM SOMAR -03:00 DO NOSSO HORARIO LOCAL
        const dateISO = dayjs(formated).endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
        return dateISO;
    }

    const toISOFormat = dayjs(formated).startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
    return toISOFormat;
}

export const formatDateToEn = (date: string) => {
    let dates = date.split('-');

    const day = dates[0];
    const month = dates[1];
    const year = dates[2];

    const dayJsFormatDate = `${month}/${day}/${year}`;
    return dayJsFormatDate;
}