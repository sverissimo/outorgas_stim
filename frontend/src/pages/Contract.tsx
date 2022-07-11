import MUIDataTable, { FilterType, MUIDataTableOptions } from "mui-datatables"
import { useQuery } from "react-query"
import { Link, useLocation, useParams } from "react-router-dom"
import { Api } from "../api/Api"
import { ContractInfo } from "../components/ContractInfo"
import { Tjlp } from '../interfaces/Tjlp'
import { dateToFormattedString } from "../utils/dateUtil"
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
        , headers = Object.keys(debtSum[0])
        , options: MUIDataTableOptions = {
            filterType: 'dropdown' as FilterType,
            selectableRowsHideCheckboxes: true,
            responsive: 'simple',
            rowsPerPage: 100,
            rowsPerPageOptions: [25, 50, 100]
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
                columns={headers}
                options={options}
            />
        </div>
    )
}
