import { contractInfoFields } from '../config/ContractInfoLabels';
import { Contract } from '../interfaces/Contract'
import contractInfoStyle from './contractInfo.module.scss'

interface IProps {
    contract: Contract
    children?: JSX.Element | JSX.Element[];
}

const { container, titleContainer, cell, cellContainer, cellTitle } = contractInfoStyle

export const ContractInfo = (props: IProps) => {
    const { contract } = props
        , entries = Object.entries(contract)

    return (
        <div className={container}>
            <div className={titleContainer}>
                Contrato nº {contract.numeroContrato}
            </div>
            <div className={cellContainer}>
                {
                    entries.map(([k, v], i) =>
                        <div className={cell} key={i}>
                            <span className={cellTitle}>
                                {contractInfoFields.find(el => el.name === k)?.label || k}
                            </span>
                            : {contractInfoFields.find(el => el.name === k && el.format)?.format(v) || v}
                        </div>)

                }
            </div>
        </div>
    )
}
