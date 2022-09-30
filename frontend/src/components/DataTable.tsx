//import { ThemeProvider } from "@mui/material";
import MUIDataTable, { FilterType, MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables"
import { ThemeProvider } from "@mui/material";
import { getMuiTheme } from "../config/tableStyles";
import { csvToXlsx } from "../utils/exportToXls";
import { textLabels } from "../config/tableLabels";

interface DataTableProps {
    title: string
    data: any
    columns: MUIDataTableColumn[]
    customOptions?: MUIDataTableOptions
    fileName?: string
}

export const DataTable = ({ title, data, columns, customOptions, fileName = '' }: DataTableProps) => {

    const defaultOptions: MUIDataTableOptions = {
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
            csvToXlsx(`${fileName}`, csvData)
            return false
        }
    }

    const options = Object.assign(defaultOptions, customOptions)

    return (
        <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
                title={title}
                data={data}
                columns={columns}
                options={options}
            />
        </ThemeProvider>
    )
}