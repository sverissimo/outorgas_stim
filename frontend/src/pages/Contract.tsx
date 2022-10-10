import MUIDataTable, { FilterType, MUIDataTableOptions } from "mui-datatables"
import { useQuery } from "react-query"
import { Link, useLocation, useParams } from "react-router-dom"
import { Api } from "../api/Api"
import { ContractInfo } from "../components/ContractInfo"
import { ThemeProvider } from "@mui/material";
import { debtColumns } from "../config/debtSummary"
import { textLabels } from "../config/tableLabels"
import { Tjlp } from '../interfaces/Tjlp'
import { csvToXlsx } from "../utils/exportToXls"
import { getMuiTheme } from "../config/tableStyles"
import { DebtService } from "../services/DebtService"

interface UseLocationState {
    parcelasPagas: number,
    tjlpBndes: Tjlp[]
}

export const Contract: React.FC = () => {

    const
        api = new Api()
        , location = useLocation()
        , state: UseLocationState = location.state as UseLocationState
        , { numeroContrato } = useParams()
        , { isLoading, data: contract, error } = useQuery(`contract${numeroContrato}`, () => api.get(`/api/get_contract/${numeroContrato}`))

    if (isLoading)
        return <h1> "Carregando..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>



    const
        { pagamentos, ...contractInfo } = contract
        , { tjlpBndes, parcelasPagas } = state
        , debtSum = DebtService.getContractDebt(contract, tjlpBndes)


        , options: MUIDataTableOptions = {
            filterType: 'dropdown' as FilterType,
            selectableRowsHideCheckboxes: true,
            responsive: 'simple',
            rowsPerPage: 100,
            rowsPerPageOptions: [25, 50, 100],
            print: false,
            textLabels: textLabels,
            filter: false,
            onDownload: (buildHead, buildBody, columns, data) => {
                const csvData = buildHead(columns) + buildBody(data)
                csvToXlsx(`Contrato ${contractInfo.numeroContrato}`, csvData)
                return false
            }
        }

    Object.assign(
        contractInfo,
        {
            parcelasPagas: parcelasPagas,
            saldoDevedor: debtSum[debtSum.length - 1].saldoDevedor
        })

    return (
        <div className="container">
            <ContractInfo contract={contractInfo} />
            <p>
                <Link to='/outorgas' className="link">
                    ◄ Voltar para contratos
                </Link>
            </p>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={`Saldo do contrato nº ${contractInfo.numeroContrato}`}
                    data={debtSum}
                    columns={debtColumns}
                    options={options}
                />
            </ThemeProvider>
        </div>
    )
}
