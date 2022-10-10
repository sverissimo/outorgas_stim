import { useState, useEffect } from "react";
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom";
import { Api } from "../api/Api"
import { debtColumns } from "../config/debtSummary"
import { Contract } from '../interfaces/Contract'
import { Tjlp } from "../interfaces/Tjlp";
import { getXlsFileName } from "../utils/exportToXls";
import { EmpresaPayments } from "../interfaces/EmpresaPayments";
import { Debt } from "../interfaces/Debt";
import { EmpresaService } from "../services/EmpresaService";
import SearchBox from "../components/SearchBox";
import { Empresa } from "../interfaces/Empresa";
import { PaymentView } from "../interfaces/PaymentView";
import { DataTable } from "../components/DataTable";
import '../styles.scss'

type State = {
    contracts: Contract[]
    tjlpBndes: Tjlp
    payments: EmpresaPayments[]
    debts: Debt[]
    selectedEmpresa: Partial<Empresa> | undefined
    empresaStatements: PaymentView[] | undefined
    showStatements: boolean
}

let i = 0;
export const EmpresasDebt = () => {

    const
        api = new Api()
        , [state, setState] = useState({} as State)

    const queryMultiple = () => {
        const contracts = useQuery('contracts', () => api.get('/api/get_contracts_and_payments'))
            , tjlpBndes = useQuery('tjlpBndes', () => api.get('/api/tjlp/bndes'))
            , payments = useQuery('payments', () => api.get('/api/pagamentos'))
            , debts = useQuery('debts', () => api.get('/api/debitos'))
        return [contracts, tjlpBndes, payments, debts]
    }

    const [
        { isLoading: loadingContracts, isSuccess: contractsOk, data: contracts, error },
        { isLoading: loadingTjlp, isSuccess: tjlpOk, data: tjlpBndes },
        { isLoading: loadingPayments, isSuccess: paymentsOk, data: payments },
        { isLoading: loadingDebts, isSuccess: debtsOk, data: debts },
    ] = queryMultiple()

    let navigate = useNavigate()

    useEffect(() => {
        if (contractsOk && paymentsOk && tjlpOk && debtsOk)
            setState({ ...state, contracts, tjlpBndes, payments, debts })
    }, [contractsOk, paymentsOk, tjlpOk, debtsOk])


    if (loadingContracts || loadingTjlp || loadingPayments || loadingDebts)
        return <h1> "Carregando..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>

    /* const a = contracts.filter(c => c.codigoEmpresa === 9370)
        .reduce((a, c) => {a + c.pagamentos.length}, 0)

    console.log("🚀 ~ file: EmpresasDebt.tsx ~ line 67 ~ EmpresasDebt ~ a", a) */
    const showEmpresaStatement = (selectedEmpresa: Partial<Empresa>) => {

        const
            empresaDebts = state.debts.filter(d => d.codigoEmpresa === selectedEmpresa.codigoEmpresa)
            , empresaPayments = state.payments.find(p => p.codigoEmpresa === selectedEmpresa.codigoEmpresa)?.pagamentos!
            , empresaStatements = new EmpresaService().getEmpresaStatements(empresaDebts, empresaPayments, tjlpBndes)

        console.log("🚀 ~ file: EmpresasDebt.tsx ~ line 72 ~ showEmpresaStatement ~ empresaPayments", empresaDebts)
        setState({ ...state, selectedEmpresa, empresaStatements, showStatements: true })
    }

    const empresas = new EmpresaService()
        .getEmpresasFromContracts(contracts)
        //@ts-ignore
        .sort((a, b) => a.razaoSocial > b.razaoSocial ? 1 : -1)

    const handleChange = (empresaInput: string) => {
        const selectedEmpresa = empresas.find(e => e.razaoSocial === empresaInput)
        if (selectedEmpresa)
            showEmpresaStatement(selectedEmpresa)
        else
            setState({ ...state, selectedEmpresa, showStatements: false })
    }

    return (
        <div className="container-center">
            <h3 style={{ textAlign: 'center' }}>Extrato de débitos de outorga por empresa</h3>
            <SearchBox
                data={empresas}
                handleChange={handleChange}
            />
            {
                state.showStatements && state.empresaStatements &&
                <div className="container">
                    <DataTable
                        title={`Extrato - ${state.selectedEmpresa!.razaoSocial}`}
                        data={state.empresaStatements}
                        columns={debtColumns}
                        fileName={`Outorgas-Extrato ${getXlsFileName(state.selectedEmpresa!.razaoSocial)}`}
                    />
                </div>
            }
        </div>
    )
}
