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
import { getEmpresaDebt } from "../services/getEmpresaDebt";
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
export const Relatorios = () => {

    const
        api = new Api()
        , [state, setState] = useState({} as State)

    const queryMultiple = () => {
        //const contracts = useQuery('contracts', () => api.get('/api/get_contracts'))
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
        if (contractsOk && paymentsOk && tjlpOk && debtsOk) {
            setState({ ...state, contracts, tjlpBndes, payments, debts })
            setTimeout(() => {

                getGlobalReport()
            }, 2600);
        }
    }, [contractsOk, paymentsOk, tjlpOk, debtsOk])


    if (loadingContracts || loadingTjlp || loadingPayments || loadingDebts)
        return <h1> "Carregando..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>


    const getGlobalReport = () => {
        const empresas = new EmpresaService()
            .getEmpresasFromContracts(contracts)
            //@ts-ignore
            .sort((a, b) => a.razaoSocial > b.razaoSocial ? 1 : -1)
            , r = []


        for (const empresa of empresas) {
            const
                empresaDebts = state.debts.filter(d => d.codigoEmpresa === empresa.codigoEmpresa)
                , empresaPayments = state.payments.find(p => p.codigoEmpresa === empresa.codigoEmpresa)?.pagamentos!

            if (empresaDebts && empresaPayments) {
                const empresaStatements = getEmpresaDebt(empresaDebts, empresaPayments, tjlpBndes)
                    //, debt = empresaStatements[empresaPayments.length - 1].saldoDevedor
                    , debt = empresaStatements[empresaStatements.length - 1].saldoDevedor

                r.push({
                    empresa: empresa.razaoSocial,
                    debt
                });
            }
        }
        const totalDebt = r.map(r => r.debt)
            .reduce((acc, curr) => acc + curr)
        console.log("🚀 ~ file: Relatorios.tsx ~ line 94 ~ getGlobalReport ~ r", totalDebt)
        console.log("🚀 ~ file: Relatorios.tsx ~ line 94 ~ getGlobalReport ~ r", r.sort((a, b) => a.debt - b.debt))
        console.log("🚀 ~ file: Relatorios.tsx ~ line 94 ~ getGlobalReport ~ r", r.length)

        //setState({ ...state, selectedEmpresa, empresaStatements, showStatements: true })
    }


    /*     if (i === 0 && state.debts)
            console.log("🚀 ~ file: Relatorios.tsx ~ line 93 ~ Relatorios ~ state.debts", state.debts)
        getGlobalReport()
        i++ */

    return (
        <div className="container-center">
            Hi!!
        </div>
    )
}
