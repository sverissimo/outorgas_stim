import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { Api } from "../api/Api";
import { Loading } from "../components/Loading";
import { Contract } from "../interfaces/Contract";
import { Debt } from "../interfaces/Debt";
import { DevedorView } from "../interfaces/DevedorView";
import { Empresa } from "../interfaces/Empresa";
import { EmpresaPayments } from "../interfaces/EmpresaPayments";
import { Tjlp } from "../interfaces/Tjlp";
import { ContractService } from "../services/ContractService";
import { DebtService } from "../services/DebtService";
import { EmpresaService } from "../services/EmpresaService";

type Props = {
    title?: string,
    children: ReactNode,
};

type GlobalState = {
    contratos: Contract[];
    debitos: Debt[];
    pagamentos: EmpresaPayments[];
    tjlp: Tjlp[];
    empresas: Partial<Empresa>[];
    devedores: DevedorView[];
    totalDebt: string;
    isLoading: boolean;
}

export const GlobalDataContext = createContext({} as GlobalState)

export const GlobalDataContextProvider: React.FC<Props> = ({ children }: Props) => {

    const [state, setState] = useState({ isLoading: true } as GlobalState)

    useEffect(() => {
        async function getData() {
            const
                api = new Api()
                , endPoints = ['get_contracts_and_payments', 'tjlp/bndes', 'pagamentos', 'debitos',]
                , result = await Promise.all(endPoints.map(endPoint => api.get(`/api/${endPoint}`)))

            const [contratos, tjlp, pagamentos, debitos] = result
                , globalDebtInputData = { contratos, tjlp, pagamentos, debitos }
                , { devedores, totalDebt } = DebtService.getGlobalDebt(globalDebtInputData)

            const
                debtorsEmpresaCodes = devedores.map(d => d.codigoEmpresa!)
                , empresas = new EmpresaService()
                    .getEmpresasFromContracts(contratos)
                    .sort((a, b) => a.razaoSocial! > b.razaoSocial! ? 1 : -1)
                    .filter(e => debtorsEmpresaCodes.includes(e.codigoEmpresa!))
                , filteredContracts = contratos
                    .filter((c: Contract) => debtorsEmpresaCodes.includes(c.codigoEmpresa!))
                , viewModelContracts = ContractService.modelToView(filteredContracts)


            setState({ ...state, contratos: viewModelContracts, tjlp, pagamentos, debitos, devedores, totalDebt, empresas, isLoading: false })
        }
        getData()
    }, [])

    const globalData = useMemo(() => state, [state])

    if (state.isLoading)
        return <><Loading /></>

    return (
        <GlobalDataContext.Provider value={globalData}>
            {children}
        </GlobalDataContext.Provider>
    )
}
