import format from 'date-fns/format'
import { ptBR } from 'date-fns/locale'
import { Tjlp } from '../interfaces/Tjlp'

//******************MIGHT BE A GOOD IDEA TO PLACE THIS IN A FRONTEND DATA ASSEMBLER, TO NORMALIZE TZ******************* */
export function formatDate(stringDate: string) {

    const
        date: Date = new Date(stringDate)
        , adjustTimeZoneHours = 3 * 60 * 60 * 1000
    date.setTime(date.getTime() + adjustTimeZoneHours)

    const formattedDate = format(date, "E, dd LLL y", { locale: ptBR })
    return formattedDate
}

export function dateToFormattedString(date: Date) {
    const formattedDate = format(date, "MM/y", { locale: ptBR })
    return formattedDate
}

export function fixTimeZone(stringDate: string): Date {
    const
        date: Date = new Date(stringDate)
        , adjustTimeZoneHours = 3 * 60 * 60 * 1000
    date.setTime(date.getTime() + adjustTimeZoneHours)
    return date
}

export function firstCommonDateIndex(stringDate: string, tjlpArray: Tjlp[]): number {

    const
        firstPgDate = fixTimeZone(stringDate)
        , firstMonth = firstPgDate.getMonth()
        , firstYear = firstPgDate.getFullYear()

    const firstCommonDateIndex = tjlpArray
        .findIndex(el => fixTimeZone(el.mes).getMonth() === firstMonth
            &&
            fixTimeZone(el.mes).getFullYear() === firstYear
        )

    return firstCommonDateIndex
}

export function isSameMonthAndYear(stringDate1: string, stringDate2: string) {

    const
        date1 = fixTimeZone(stringDate1)
        , date1Month = date1.getMonth()
        , date1Year = date1.getFullYear()

    return fixTimeZone(stringDate2).getMonth() === date1Month
        &&
        fixTimeZone(stringDate2).getFullYear() === date1Year
}