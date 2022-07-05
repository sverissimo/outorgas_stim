import { useQuery } from "react-query"
import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom"
import { Api } from "../api/Api"


export const Contract = () => {

    const
        { numeroContrato } = useParams()
        , location = useLocation()
        , { state, pathname } = location
        , api = new Api()
        , { isLoading, data, error } = useQuery('contract', () => api.get(`/api/get_contract/${numeroContrato}`))
    console.log("🚀 ~ file: Contract.tsx ~ line 14 ~ Contract ~ data", data)

    if (isLoading)
        return <h1> "Loading..."</h1>

    if (error)
        return <h4>An error has occurred: {JSON.stringify(error)} </h4>

    const { pagamentos, ...contractInfo } = data
    contractInfo.parcelasPagas = state.parcelas_pagas



    return (
        <>
            <div>Contract</div>
            <Link to='/outorgas'>
                Back to outorgas
            </Link>
            <p>
                {JSON.stringify(contractInfo)}
            </p>
            {
                pagamentos.map(({ data_pagamento, numero_guia, valor }, i) => (
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
                ))}
            {/* <Outlet /> */}
        </>
    )
}
