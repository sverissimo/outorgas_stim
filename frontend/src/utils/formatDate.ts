import format from 'date-fns/format'
import { ptBR } from 'date-fns/locale'

//******************MIGHT BE A GOOD IDEA TO PLACE THIS IN A FRONTEND DATA ASSEMBLER, TO NORMALIZE TZ******************* */
export function formatDate(stringDate: string) {

    const
        date: Date = new Date(stringDate)
        , adjustTimeZoneHours = 3 * 60 * 60 * 1000
    date.setTime(date.getTime() + adjustTimeZoneHours)

    const
        formattedDate = format(date, "E, dd LLL y", { locale: ptBR })
    /*     , tst = new Date(formattedDate)
    console.log("🚀 ~ file: formatDate.ts ~ line 12 ~ formatDate ~ formattedDate", tst.getDate(), tst.getMonth()) */
    return formattedDate
}

