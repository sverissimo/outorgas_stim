import { Contract } from "../interfaces/Contract";
import { Debt } from "../interfaces/Debt";
import { addMonth, stringToDateObj } from "../utils/dateUtil";


let i = 0
export class ContractService {

    static modelToView = (contracts: Contract[]) => {

        const viewModelContracts = contracts.map((c: any) => {
            if (!c.convalidacao)
                c.convalidacao = 0
            if (!c.valorDevido)
                c.valorDevido = c.valorOutorga
            return c
        })
            .sort((a: Contract, b: Contract) => a.razaoSocial! > b.razaoSocial! ? 1 : -1)
        return viewModelContracts
    }


    static getContractStartDate = (contract: Contract) => {
        const
            { dataAssinatura } = contract
            , contractYear = stringToDateObj(dataAssinatura).getFullYear()

        let
            dataVigencia: Date | string = dataAssinatura
            , carencia = contract.carencia || 0

        if (carencia && carencia > 30) {
            const months = Math.floor(carencia / 30)
            dataVigencia = addMonth(dataVigencia, months)
        }
        if (contractYear < 2012) {
            dataVigencia = addMonth(dataVigencia, 6)
            carencia = 180
        }

        dataVigencia = stringToDateObj(dataVigencia)
        return { dataVigencia, carencia }
    }

    static aggregateContractsByDate(contracts: Contract[]): Omit<Debt, 'carencia'> {
        const valorDevido = contracts
            .reduce((acc, cur) => cur.valorDevido ? acc + cur.valorDevido : acc + cur.valorOutorga, 0)
            , contratos = contracts.map(c => c.numeroContrato)
            , data = contracts[0]?.dataAssinatura

        return { contratos, data, valorDevido }
    }

    static getReajuste(dateTracker: (string | Date), contractDate: string | Date, saldoDevedor: number) {

        const parsedContractDate = stringToDateObj(contractDate)
        const contractIsEligible = parsedContractDate.getFullYear() === 2013
            &&
            parsedContractDate.getTime() > new Date(2013, 3, 21).getTime()
            , readjustmentDate = stringToDateObj(dateTracker).getFullYear() === 2014 && stringToDateObj(dateTracker).getMonth() === 0
            , shouldReadjust = contractIsEligible && readjustmentDate

        /* if (parsedContractDate.getFullYear() === 2013) {
            i++
            console.log("🚀 ~ file: ContractService.ts ~ line 53 ~ ContractService ~ getReajuste ~ i", i)
        } */

        if (!shouldReadjust)
            return 0

        const readjustmentAmount = saldoDevedor * 0.034
        return readjustmentAmount
    }

}
