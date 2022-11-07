import { useState, useTransition, useContext, FC } from "react";
import { GlobalDataContext } from "../context/GlobalDataContext";
import { EmpresaService } from "../services/EmpresaService";
import { empresaStatementsColumns } from "../config/empresaStatementsColumns"
import { csvToXlsx, getXlsFileName } from "../utils/exportToXls";
import { Contract } from '../interfaces/Contract'
import { Tjlp } from "../interfaces/Tjlp";
import { EmpresaPayments } from "../interfaces/EmpresaPayments";
import { Debt } from "../interfaces/Debt";
import { Empresa } from "../interfaces/Empresa";
import { PaymentView } from "../interfaces/PaymentView";
import { DataTable } from "../components/DataTable";
import { Loading } from "../components/Loading";
import SearchBox from "../components/SearchBox";
import { toCurrency } from "../utils/formatNumber";
import '../styles.scss'


type State = {
    contracts: Contract[]
    tjlpBndes: Tjlp
    payments: EmpresaPayments[]
    debts: Debt[]
    empresas: Partial<Empresa>[]
    selectedEmpresa: Partial<Empresa> | undefined
    empresaStatements: PaymentView[] | undefined
    saldoDevedor: string
    showStatements: boolean,
    fileName: string
}

export const EmpresaDebts: FC = () => {

    const
        [isPending, startTransition] = useTransition()
        , [state, setState] = useState({} as State)
        , { empresas, tjlp, debitos, pagamentos } = useContext(GlobalDataContext)

    const showEmpresaStatement = (selectedEmpresa: Partial<Empresa>) => {
        const
            empresaDebts = debitos.filter(d => d.codigoEmpresa === selectedEmpresa.codigoEmpresa)
            , empresaPayments = pagamentos.find(p => p.codigoEmpresa === selectedEmpresa.codigoEmpresa)?.pagamentos!
            , empresaStatements = new EmpresaService().getEmpresaStatements(empresaDebts, empresaPayments, tjlp)
            , saldoDevedor = toCurrency(empresaStatements[empresaStatements.length - 1]?.saldoDevedor)
            , fileName = `Outorgas-Extrato ${getXlsFileName(selectedEmpresa!.razaoSocial)}`

        setState(prevState => ({ ...prevState, selectedEmpresa, empresaStatements, showStatements: true, saldoDevedor, fileName }));
    }

    const handleChange = (empresaInput: string) => {
        const selectedEmpresa = empresas.find(e => e.razaoSocial === empresaInput)
        if (selectedEmpresa) {
            startTransition(() => {
                showEmpresaStatement(selectedEmpresa)
            })
        }
        else {
            setState({ ...state, selectedEmpresa, showStatements: false })
        }
    }

    //@ts-ignore
    const customDownloadHandler = (buildHead, buildBody, columns, data) => {
        const formattedData = data.map((el: any) => {
            const dataArray = el.data

            dataArray[0] = dataArray[0].toLocaleString()
            if (dataArray[1])
                dataArray[1] = dataArray[1].replaceAll(',', ';')
            return el
        })
        const csvData = buildHead(columns) + buildBody(formattedData)
        csvToXlsx(`${state.fileName}`, csvData)
        return false
    }

    return (
        <div className="container-center">
            <h3 style={{ textAlign: 'center', marginRight: state.showStatements || isPending ? 0 : '17px' }}>Extrato de débitos de outorga por empresa</h3>
            {
                empresas && <SearchBox
                    data={empresas}
                    handleChange={handleChange}
                />
            }
            {
                isPending && <>
                    <Loading />
                </>
            }
            {
                state.showStatements && state.empresaStatements &&
                <div className="container">
                    <DataTable
                        title={`Extrato - ${state.selectedEmpresa!.razaoSocial} - Saldo devedor: ${state.saldoDevedor}`}
                        data={state.empresaStatements}
                        columns={empresaStatementsColumns}
                        fileName={`Outorgas-Extrato ${getXlsFileName(state.selectedEmpresa!.razaoSocial)}`}
                        customDownloadHandler={customDownloadHandler}
                    />
                </div>
            }
        </div>
    )
}
