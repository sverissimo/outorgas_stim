import contracts from './mockData/allContractsAndPayments.json'
import { EmpresaService } from "../services/EmpresaService";


const { empresaFilter, getEmpresaDebt, getAllDebts } = new EmpresaService()

test('Test getEmpresaDebt', async () => {
    const
        contractsSample = empresaFilter(contracts, 9060)
        , result = getEmpresaDebt(contractsSample)
    console.log("🚀 ~ file: getGlobalDebt.test.ts ~ line 14 ~ test ~ contractsSample", result)
})

test('Test getGlobalDebt', async () => {
    const globalDebt = getAllDebts(contracts)

    globalDebt.forEach((r, i) => i < 20 ? console.log(r) : void 0)
    //return globalDebt
})
