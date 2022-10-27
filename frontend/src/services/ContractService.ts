import { Contract } from "../interfaces/Contract";
import { Debt } from "../interfaces/Debt";
import { addMonth, stringToDateObj } from "../utils/dateUtil";


export class ContractService {


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

}
