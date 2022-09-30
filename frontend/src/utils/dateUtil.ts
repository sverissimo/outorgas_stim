//import format from 'date-fns/format'
//import { ptBR } from 'date-fns/locale'
import isValid from 'date-fns/isValid'
import add from 'date-fns/add'
import { Tjlp } from '../interfaces/Tjlp'


export function dateToFormattedString(date: Date) {
    //const formattedDate = format(date, "MM/y", { locale: ptBR })
    const formattedDate = date.toLocaleDateString().replace(/\d{2}\//, '')
    return formattedDate
}


export function firstCommonDateIndex(stringDate: string, tjlpArray: Tjlp[]): number {

    const
        firstPgDate = stringToDateObj(stringDate)
        , firstMonth = firstPgDate.getMonth()
        , firstYear = firstPgDate.getFullYear()

    const firstCommonDateIndex = tjlpArray
        .findIndex(
            el => stringToDateObj(el.mes).getMonth() === firstMonth
                &&
                stringToDateObj(el.mes).getFullYear() === firstYear
        )

    return firstCommonDateIndex
}


export function isSameMonthAndYear(date1: any, date2: any) {
    const date1Obj = stringToDateObj(date1)
        , date2Obj = stringToDateObj(date2)

    const date1Month = date1Obj.getMonth()
        , date2Month = date2Obj.getMonth()
        , date1Year = date1Obj.getFullYear()
        , date2Year = date2Obj.getFullYear()

    return date1Month === date2Month && date1Year === date2Year
}


export function addMonth(date: any) {
    date = stringToDateObj(date)
    date = add(date, { months: 1 })
    return date
}


export function stringToDateObj(date: string | Date) {

    const validDateFormat = typeof date === 'string' && date.match(/^\d{2}\/\d{2}\/\d{4}$/)

    if (validDateFormat && !isValid(date) && typeof date === 'string') {
        const dateArray = date.split(/\/|-/)
        date = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
    }

    const dateObj = new Date(date)
    const fixedDateObj = fixTimeZone(dateObj)

    return fixedDateObj
}


export function fixTimeZone(date: any): Date {
    /* const adjustTimeZoneHours = 3 * 60 * 60 * 1000
    date.setTime(date.getTime() + adjustTimeZoneHours) */
    date = add(date, { 'hours': 3 })
    date.setHours(0)
    return date
}


