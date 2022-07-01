import format from 'date-fns/format'
import { ptBR } from 'date-fns/locale'

export function formatDate(stringDate: string) {

    const
        date: Date = new Date(stringDate)
        , adjustTimeZoneHours = 3 * 60 * 60 * 1000
    date.setTime(date.getTime() + adjustTimeZoneHours)
    console.log("🚀 ~ file: formatDate.ts ~ line 9 ~ formatDate ~ DAY", date)

    const formattedDate = format(date, "E, dd LLL y", { locale: ptBR })
    return formattedDate
}

