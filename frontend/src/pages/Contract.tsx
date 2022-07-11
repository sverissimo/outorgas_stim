import MUIDataTable, { FilterType, MUIDataTableOptions } from "mui-datatables"
import { useQuery } from "react-query"
import { Link, useLocation, useParams } from "react-router-dom"
import { Api } from "../api/Api"
import { ContractInfo } from "../components/ContractInfo"
import { debtColumns } from "../config/debtSummary"
import { textLabels } from "../config/tableLables"
import { Tjlp } from '../interfaces/Tjlp'
import { dateToFormattedString } from "../utils/dateUtil"
import { exportToXlsx } from "../utils/exportToXls"
import { getDebt } from "../utils/getDebt"

interface UseLocationState {
    parcelas_pagas: number,
    tjlpBndes: Tjlp[]
}

export const Contract: React.FC = () => {

    const
        api = new Api()
        , location = useLocation()
        , state: UseLocationState = location.state as UseLocationState
        , { numeroContrato } = useParams()
        , { isLoading, data, error } = useQuery(`contract${numeroContrato}`, () => api.get(`/api/get_contract/${numeroContrato}`))

    if (isLoading)
        return <h1> "Loading..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>

    const
        { pagamentos, ...contractInfo } = data
        , { tjlpBndes, parcelas_pagas } = state

    contractInfo.parcelasPagas = parcelas_pagas

    const
        debtSum = getDebt(contractInfo.valorOutorga, pagamentos, tjlpBndes)
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
                exportToXlsx(`Contrato ${contractInfo.numeroContrato}`, csvData)
                return false
            },
        }

    debtSum.forEach(el => el.mes = dateToFormattedString(el.mes))

    return (
        <div className="container">
            <ContractInfo contract={contractInfo} />
            <Link to='/outorgas'>
                Back to outorgas
            </Link>
            <MUIDataTable
                title={`Saldo do contrato nº ${contractInfo.numeroContrato}`}
                data={debtSum}
                columns={debtColumns}
                options={options}
            />
        </div>
    )
}
