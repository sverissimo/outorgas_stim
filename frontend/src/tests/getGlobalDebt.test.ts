import contracts from './mockData/allContractsAndPayments.json'
import { EmpresaService } from "../services/EmpresaService";
import { getEmpresaDebt } from "../services/getEmpresaDebt";

const { empresaFilter } = new EmpresaService()

test('Test getGlobalDebt', async () => {
    const contractsSample = empresaFilter(contracts, 9060)
        //.concat(empresaFilter(contracts, 9030))
        , result = getEmpresaDebt(contractsSample)
    console.log("🚀 ~ file: getGlobalDebt.test.ts ~ line 14 ~ test ~ contractsSample", result)
})
