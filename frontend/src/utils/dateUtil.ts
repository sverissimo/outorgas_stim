import isValid from 'date-fns/isValid'
import add from 'date-fns/add'
import { Tjlp } from '../interfaces/Tjlp'

export function dateToFormattedString(dateString: string) {
    const formattedDate = dateString.replace('-', '/')
    return formattedDate
}

export function firstCommonDateIndex(stringDate: string, tjlpArray: Tjlp[]): number {

    const firstPgDate = stringToDateObj(stringDate)
    const firstMonth = firstPgDate.getMonth()
    const firstYear = firstPgDate.getFullYear()

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
    const date2Obj = stringToDateObj(date2)

    const date1Month = date1Obj.getMonth()
    const date2Month = date2Obj.getMonth()
    const date1Year = date1Obj.getFullYear()
    const date2Year = date2Obj.getFullYear()

    return date1Month === date2Month && date1Year === date2Year
}

export function addMonth(date: string | Date, months = 1) {
    date = stringToDateObj(date)
    date = add(date, { months })
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
    date = add(date, { 'hours': 3 })
    date.setHours(0)
    return date
}


