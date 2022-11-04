import { MUIDataTableMeta } from "mui-datatables"
import { contratoTableColumns as tableColumns } from "../config/contratoTableColumns"

export const tableDataToJson = (columns: Array<any>, data: Array<any>) => {
    const formattedData: any[] = []
    let contract = {}

    data.forEach(el => {
        columns.forEach((col, i) => {
            const
                fieldObj = tableColumns.find(c => c.name === col.name)
                , value = el?.data[i]
                , label = fieldObj?.label || ''
            let formattedValue = value

            if (fieldObj?.options?.customBodyRender) {
                const metaPlaceholder = {} as MUIDataTableMeta
                formattedValue = fieldObj.options.customBodyRender(value, metaPlaceholder, () => void 0)
            }

            Object.assign(contract, { [label]: formattedValue })
        })
        formattedData.push(contract)
        contract = {}
    })
    return formattedData
}
