const { formatDate } = require("../utils/formatDate")



test('formatDateTST', () => {
    //    console.log("🚀 ~ file: formatDate.test.ts ~ line 5 ~ test ~ formatDate", formatDate)

    const date = formatDate('Tue, 25 Nov 2014 00:00:00 GMT')
    console.log("🚀 ~ file: formatDate.test.ts ~ line 5 ~ test ~ date", date)
    expect(date).toMatch('terça')
    return

})

export { }