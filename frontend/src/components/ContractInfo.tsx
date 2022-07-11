import { columns } from '../config/tableColumns';
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
                Contrato nº {contract.numeroContrato}
            </div>
            <div className={cellContainer}>
                {
                    a.map(([k, v], i) =>
                        <div className={cell} key={i}>
                            <span className={cellTitle}>
                                {columns.find(el => el.name === k)?.label || k}
                            </span>
                            : {v}
                        </div>)

                }
            </div>
        </div>
    )
}
