import { Contract } from "../interfaces/Contract";
import { Payment } from "../interfaces/Payment";
import { Tjlp } from "../interfaces/Tjlp";
import { isSameMonthAndYear, stringToDateObj, addMonth } from "../utils/dateUtil";

interface empresaDebtInput {
    tjlp: Tjlp[]
    contracts: Contract[]
    missingPayments: any[]
}

interface empresaCreditInput {
    contracts: Contract[]
    missingPayments: any[]
}


export const getEmpresaCreditStatement = (empresaCreditInput: empresaCreditInput) => {

    const
        { contracts, missingPayments } = empresaCreditInput
        , identifiedPayments: Payment[] = contracts.map(c => ({ ...c.pagamentos, linhasId: c.linhasId, codigoEmpresa: c.codigoEmpresa }))
        , allPayments = identifiedPayments.concat(missingPayments)
}

export const mergePayments = (payments: Payment[]) => {

    const
        mergedPayments = [] as Payment[]
        , firstPaymentDate = getFirstPaymentDate(payments)
        , today = new Date().toLocaleDateString()
        , emptyPayment: Payment = {
            numeroGuia: '',
            dataPagamento: '',
            valor: 0
        }

    let i = 0
    let pgDate = firstPaymentDate
    while (!isSameMonthAndYear(pgDate, today) && i < 1222) {

        const sameMonthPayments = payments.filter(p => isSameMonthAndYear(p.dataPagamento, pgDate))

        let guias = ''
            , valorTotal = 0

        if (sameMonthPayments.length) {
            sameMonthPayments.forEach(p => {
                guias += p.numeroGuia + ', '.slice(-2)
                valorTotal += p.valor
            })
            mergedPayments.push({
                numeroGuia: guias,
                dataPagamento: pgDate.toLocaleDateString(),
                valor: valorTotal
            })
            /* if (sameMonthPayments.length > 1) {
                console.log("🚀 ~ file: getEmpresaDebt.ts ~ line 58 ~ mergePayments ~ sameMonthPayments", sameMonthPayments)

            } */
        }
        else
            mergedPayments.push({
                ...emptyPayment,
                dataPagamento: pgDate.toLocaleDateString()
            })
        i++
        pgDate = addMonth(pgDate)
    }
    return mergedPayments
}

/* const getPaymentsStatement = () => {

}
 */
const getFirstPaymentDate = (payments: Payment[]) => {
    const firstPayment = payments
        .reduce((acc, cur) => new Date(acc.dataPagamento).getTime() > new Date(cur.dataPagamento).getTime() ? cur : acc)
        .dataPagamento
    const firstPaymentDate = stringToDateObj(firstPayment)
    return firstPaymentDate
}





//sortedPgs = payments.sort((a: Payment, b: Payment) => new Date(a.dataPagamento).getTime() - new Date(b.dataPagamento).getTime())
//return sortedPgs.slice(-2)

/* export function getEmpresaBalance(tjlp: Tjlp[], contracts: Contract[], missingPayments: any[]) {

    const
        totalOutorga = []
        , empresas = new Set(contracts.map(e => e.codigoEmpresa))


    for (const empresa of empresas) {
        const empresaCreditStatement = getEmpresaCreditStatement({ tjlp, contracts, missingPayments })
        totalOutorga.push(empresaDebtSummary)
    }

    return totalOutorga
}
 */