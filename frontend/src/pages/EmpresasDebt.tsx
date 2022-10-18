import { useState, useEffect, useTransition, useContext } from "react";
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom";
import { Api } from "../api/Api"
import { EmpresaContext } from "../context/EmpresaContext";
import { EmpresaService } from "../services/EmpresaService";
import { debtColumns } from "../config/debtSummary"
import { getXlsFileName } from "../utils/exportToXls";
import { Contract } from '../interfaces/Contract'
import { Tjlp } from "../interfaces/Tjlp";
import { EmpresaPayments } from "../interfaces/EmpresaPayments";
import { Debt } from "../interfaces/Debt";
import { Empresa } from "../interfaces/Empresa";
import { PaymentView } from "../interfaces/PaymentView";
import { DataTable } from "../components/DataTable";
import { Loading } from "../components/Loading";
import SearchBox from "../components/SearchBox";
import '../styles.scss'

type State = {
    contracts: Contract[]
    tjlpBndes: Tjlp
    payments: EmpresaPayments[]
    debts: Debt[]
    empresas: Partial<Empresa>[]
    selectedEmpresa: Partial<Empresa> | undefined
    empresaStatements: PaymentView[] | undefined
    showStatements: boolean
}

export const EmpresasDebt = () => {

    const [isPending, startTransition] = useTransition();
    const
        api = new Api()
        , [state, setState] = useState({} as State)
        , { empresaFilter } = useContext(EmpresaContext)

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

    useEffect(() => {
        if (contractsOk && paymentsOk && tjlpOk && debtsOk) {
            setState({ ...state, contracts, tjlpBndes, payments, debts })
        }
    }, [contractsOk, paymentsOk, tjlpOk, debtsOk])

    useEffect(() => {
        if (state.contracts) {
            const empresas = new EmpresaService()
                .getEmpresasFromContracts(contracts)
                .sort((a, b) => a.razaoSocial! > b.razaoSocial! ? 1 : -1)
                .filter(e => empresaFilter.includes(e.codigoEmpresa!))
            setState({ ...state, empresas })
            console.log("🚀 ~ file: EmpresasDebt.tsx ~ line 82 ~ EmpresasDebt ~ empresas", state.empresas)
        }
    }, [state.contracts])


    if (loadingContracts || loadingTjlp || loadingPayments || loadingDebts)
        return <><Loading /></>
    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>


    const showEmpresaStatement = (selectedEmpresa: Partial<Empresa>) => {

        const
            empresaDebts = state.debts.filter(d => d.codigoEmpresa === selectedEmpresa.codigoEmpresa)
            , empresaPayments = state.payments.find(p => p.codigoEmpresa === selectedEmpresa.codigoEmpresa)?.pagamentos!
            , empresaStatements = new EmpresaService().getEmpresaStatements(empresaDebts, empresaPayments, tjlpBndes)

        setState({ ...state, selectedEmpresa, empresaStatements, showStatements: true })
    }

    const handleChange = (empresaInput: string) => {
        const selectedEmpresa = state.empresas.find(e => e.razaoSocial === empresaInput)
        if (selectedEmpresa) {
            startTransition(() => {
                showEmpresaStatement(selectedEmpresa)
            })
        }
        else {
            setState({ ...state, selectedEmpresa, showStatements: false })
        }
    }

    return (
        <div className="container-center">
            <h3 style={{ textAlign: 'center', marginRight: state.showStatements || isPending ? 0 : '17px' }}>Extrato de débitos de outorga por empresa</h3>
            {state.empresas && <SearchBox
                data={state.empresas}
                handleChange={handleChange}
            />}
            {
                isPending && <>
                    <Loading />
                </>
            }
            {
                state.showStatements && state.empresaStatements &&
                <div className="container fk">
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
