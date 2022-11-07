import Tooltip from "@mui/material/Tooltip"
import { FC } from "react"
import { PaymentView } from "../interfaces/PaymentView"
import { toCurrency } from "../utils/formatNumber"
import './readjustmentCell.scss'

export const ReadjustmentCell: FC<{ data: PaymentView }> = ({ data }) => {
    const { reajuste, valorNovaOutorga, contratos } = data

    let
        formatted: string = '-'
        , cellStyle: string = 'readjustmentCellText-empty'
        , s = contratos && contratos?.length > 1 ? 's' : ''

    const novaOutorgaLabel = `Contrato${s} assinado${s}: ${contratos?.join()}`
        , reajusteLabel = `Reajuste contratual de 3,4%`

    if (reajuste || valorNovaOutorga) {
        cellStyle = 'readjustmentCellText'
        formatted = toCurrency(valorNovaOutorga! + reajuste!)
    }

    const title = reajuste ? reajusteLabel
        :
        valorNovaOutorga ? novaOutorgaLabel
            : ''

    return (
        <Tooltip title={title} >
            <div className="readjustmentCellDiv">
                <span className={cellStyle}>{formatted}</span>
            </div>
        </Tooltip>
    )
}
