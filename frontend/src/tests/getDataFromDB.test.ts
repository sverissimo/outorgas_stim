//@ts-nocheck
import http from 'http';
import { PaymentService } from '../services/PaymentService';
import { toCurrency } from '../utils/formatNumber';



describe('Test getData from DB', () => {
    it('Test get all empresaPayments from MongoDB', async () => {
        const
            result: any = await getData('pagamentos')
            , payments = result.map((p: any) => p.pagamentos)
            , { count } = new PaymentService().countGuiasPerPayment(payments)

        console.log("🚀 ~ file: getDataFromDB.test.ts ~ line 21 ~ it ~ count", count)
        expect(count).toEqual(12337)
    })

    it('Test get Total payments', async () => {
        const
            result: any = await getData('pagamentos')
            , totalPaymentsAmount = result
                .map((p: any) => p.pagamentos)
                .reduce((acc, el) => acc.concat(el), [])
                .reduce((acc, el) => acc + el.valor, 0)
        console.log("🚀 ~ file: getDataFromDB.test.ts ~ line 21 ~ it ~ totalPaymentsAmount", toCurrency(totalPaymentsAmount))

    })
})

export { }


const getData = (url: string) => new Promise((resolve, reject) => {
    let data = ''

    http.get(`http://localhost:5000/${url}`, (res: any) => {
        res.on('data', (chunk: string) => data += chunk)
        res.on('error', (err: Error) => reject(err))
        res.on('end', () => resolve(JSON.parse(data)))
    })
})
