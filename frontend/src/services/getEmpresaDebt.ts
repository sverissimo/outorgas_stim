import { Contract } from "../interfaces/Contract";
import { isSameMonthAndYear } from "../utils/dateUtil";

interface Debt {
    contratos: string[]
    data: Date
    valorOutorga: number
}

export const getEmpresaDebt = (contracts: Contract[]): Debt[] => {

    const isSameEmpresa = new Set(contracts.map(c => c.codigoEmpresa)).size === 1

    if (!isSameEmpresa)
        throw new Error('Dude, don\'t mix up different companies...')

    const debtStatement: any[] = []
        , debtDates = new Set(contracts
            .map(c => c?.vigencia || c.dataAssinatura))

    for (const date of debtDates) {
        const sameDateContracts = contracts.filter(c => isSameMonthAndYear(c.dataAssinatura, date))
            , totalValuePerDate = sameDateContracts
                .reduce((acc, cur) => acc + cur.valorOutorga, 0)

        debtStatement.push({
            contratos: sameDateContracts.map(c => c.numeroContrato),
            data: date,
            valorOutorga: totalValuePerDate
        })
    }
    return debtStatement
}
