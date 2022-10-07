import { Contract } from "../interfaces/Contract";
import { Debt } from "../interfaces/Debt";
import { isSameMonthAndYear } from "../utils/dateUtil";
import { EmpresaService } from "./EmpresaService";


export class DebtService {

    static getFirstMonthDebt = (debts: Debt[]) => {

        const
            sortedDebts = debts
                .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
            , firstDebts = debts
                .filter(d => isSameMonthAndYear(d.data, sortedDebts[0].data))
            , firstMonthTotalDebt = firstDebts
                .map(d => d.valorOutorga)
                .reduce((prev, curr) => prev + curr)

        return firstMonthTotalDebt
    }

    static getAllDebtsPerMonth = (contracts: Contract[]) => {
        const allDebts = new EmpresaService().getAllDebts(contracts)
        console.log("🚀 ~ file: DebtService.ts ~ line 25 ~ DebtService ~ allDebts", allDebts.slice(0, 1))
        console.log("🚀 ~ file: DebtService.ts ~ line 25 ~ DebtService ~ allDebts", allDebts.length)

    }
}
