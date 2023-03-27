import { FC, useContext } from "react";
import { GlobalDataContext } from "../contexts/GlobalDataContext";
import { DataTable } from "../components/DataTable";
import { contratoTableColumns } from '../config/contratoTableColumns'
import { jsonToXlsx } from "../utils/exportToXls";
import { tableDataToJson } from "../utils/tableDataToJson";
import { MUIDataTableOptions } from 'mui-datatables';
import '../styles.scss'


export const Contratos: FC = () => {

    const { contratos } = useContext(GlobalDataContext)

    const customOptions: MUIDataTableOptions = {
        rowsPerPage: 25,
        onDownload: (_, _2, columns, data) => {
            const
                formattedData = tableDataToJson(columns, data)
                , today = new Date().toLocaleDateString()
            jsonToXlsx(`Contratos_outorga - ${today}`, formattedData)
            return false
        },
        sortOrder: { name: 'razaoSocial', direction: 'asc' }
    }

    return (
        <div className="container">
            <DataTable
                title="Contratos de Outorga com saldo devedor"
                data={contratos}
                columns={contratoTableColumns}
                customOptions={customOptions}
            />
        </div>
    )
}
