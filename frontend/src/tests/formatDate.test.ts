import { addMonth, isSameMonthAndYear } from "../utils/dateUtil"

describe("Test util/dateUtil.ts functions", () => {

    it('Test isSameMonthAndYear', () => {
        const a = new Date('2022-09-30')
        const b = new Date('2022-10-17')

        a.setTime(a.getTime() + 24 * 60 * 60 * 1000)
        /*   const a = '31/03/2014'
              , b = '01/03/2014'*/

        const testResult = isSameMonthAndYear(a, b)
        console.log("🚀 ~ file: formatDate.test.ts - it(Test isSameMonthAndYear)", a, b, testResult)
        expect(testResult).toBe(true)
    })

    it('Test addMonth', () => {

        const date1 = new Date('2022-09-30')
            , date1PlusOneMonth = addMonth(date1)
            , date1PlusTwoMonths = addMonth(date1PlusOneMonth)
        /* console.log("🚀 ~ file: formatDate.test.ts ~ line 27 ~ it ~ date1PlusOneMonth", date1PlusOneMonth.toLocaleDateString())
        console.log("🚀 ~ file: formatDate.test.ts ~ line 27 ~ it ~ date1PlusOneMonth", date1PlusTwoMonths) */
    })
})



export { }