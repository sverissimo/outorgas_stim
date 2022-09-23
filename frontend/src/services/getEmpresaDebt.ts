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
    missingPayments: Payment[]
}


export const getEmpresaPayments = (empresaCreditInput: empresaCreditInput) => {

    const
        { contracts, missingPayments } = empresaCreditInput

    const
        mp = missingPayments.slice(0, 5)
        , foundPayments = [] as Payment[]
    contracts
        .slice(0, 10)
        .map(c => c.pagamentos)
        .forEach(p => foundPayments.push(...p))
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