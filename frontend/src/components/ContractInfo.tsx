import { Contract } from '../interfaces/Contract'
import contractInfoStyle from './contractInfo.module.scss'

interface IProps {
    contract: Contract
    children?: JSX.Element | JSX.Element[];
}

const { container, titleContainer, cell, cellContainer, cellTitle } = contractInfoStyle

export const ContractInfo = (props: IProps) => {
    const { contract } = props
        , a = Object.entries(contract)

    return (
        <div className={container}>
            <div className={titleContainer}>
                Contrato nº {contract.numero_contrato}
            </div>
            <div className={cellContainer}>
                {
                    a.map(([k, v], i) =>
                        <div className={cell} key={i}>
                            <span className={cellTitle}>
                                {k}
                            </span>
                            : {v}
                        </div>)

                }
            </div>
        </div>
    )
}
