//import { ThemeProvider } from "@mui/material";
import MUIDataTable, { FilterType, MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables"
import { ThemeProvider } from "@mui/material";
import { getMuiTheme } from "../config/tableStyles";
import { csvToXlsx } from "../utils/exportToXls";
import { textLabels } from "../config/tableLabels";

type MUITableDownloadHandler = (
    buildHead: (columns: any) => string,
    buildBody: (data: any) => string,
    columns: any,
    data: any,
) => string | boolean;

interface DataTableProps {
    title: string
    data: any
    columns: MUIDataTableColumn[]
    customOptions?: MUIDataTableOptions
    fileName?: string
    customDownloadHandler?: MUITableDownloadHandler
}

export const DataTable = ({ title, data, columns, customOptions, customDownloadHandler, fileName = '' }: DataTableProps) => {

    const defaultDownloadHandler: MUITableDownloadHandler = (buildHead, buildBody, columns, data) => {
        const csvData = buildHead(columns) + buildBody(data)
        csvToXlsx(`${fileName}`, csvData)
        return false
    }


    const defaultOptions: MUIDataTableOptions = {
        filterType: 'dropdown' as FilterType,
        selectableRowsHideCheckboxes: true,
        responsive: 'simple',
        rowsPerPage: 50,
        rowsPerPageOptions: [25, 50, 100, 150],
        print: false,
        textLabels: textLabels,
        filter: false,
        onDownload: customDownloadHandler || defaultDownloadHandler,
        downloadOptions: {
            filename: fileName,
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