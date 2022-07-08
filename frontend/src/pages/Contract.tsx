import { useQuery } from "react-query"
import { Link, useLocation, useParams } from "react-router-dom"
import { Api } from "../api/Api"
import { Contract as IContract } from "../interfaces/Contract"
import { Tjlp } from '../interfaces/Tjlp'
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
        , { isLoading, data, error } = useQuery('contract', () => api.get(`/api/get_contract/${numeroContrato}`))


    if (isLoading)
        return <h1> "Loading..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>

    const
        { pagamentos, ...contractInfo } = data
        , { tjlpBndes, parcelas_pagas } = state

    contractInfo.parcelasPagas = parcelas_pagas

    const debtSum = getDebt(contractInfo.valor_outorga, pagamentos, tjlpBndes)

    return (
        <>
            <div>Contract</div>
            <Link to='/outorgas'>
                Back to outorgas
            </Link>
            <p>
                {JSON.stringify(contractInfo)}
            </p>
            <p>
                *-************************** {JSON.stringify(debtSum)}
            </p>
            {/*  {
                pagamentos.map(({ data_pagamento, numero_guia, valor }: Pagamento, i: number) => (
                    <div key={numero_guia}>
                        <h4>
                            Pagamento número {i}
                        </h4>
                        <ul>
                            <li>Data pg: {data_pagamento} </li>
                            <li>NGuia: {numero_guia}  </li>
                            <li>Valor:  {valor} </li>
                        </ul>
                    </div>
                ))} */}

        </>
    )
}
