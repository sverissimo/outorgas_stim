import { useContext } from "react";
import MUIDataTable, { FilterType, MUIDataTableOptions } from 'mui-datatables';
import { Container, ThemeProvider } from "@mui/material";
import { GlobalDataContext } from "../context/GlobalDataContext";
import { contratoTableColumns } from '../config/contratoTableColumns'
import { getMuiTheme } from "../config/tableStyles";
import { textLabels } from "../config/tableLabels";
import { jsonToXlsx } from "../utils/exportToXls";
import { tableDataToJson } from "../utils/tableDataToJson";
import '../styles.scss'


export const Contratos = () => {

    const { contratos } = useContext(GlobalDataContext)

    const options: MUIDataTableOptions = {
        filterType: 'dropdown' as FilterType,
        selectableRowsHideCheckboxes: true,
        print: false,
        textLabels: textLabels,
        responsive: 'simple',
        rowsPerPage: 25,
        rowsPerPageOptions: [10, 25, 50],
        onDownload: (buildHead, buildBody, columns, data) => {
            const
                formattedData = tableDataToJson(columns, data)
                , today = new Date().toLocaleDateString()
            jsonToXlsx(`Contratos_outorga - ${today}`, formattedData)
            return false
        }
    }
    return (
        <Container maxWidth={"xl"}>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title="Contratos de Outorga com saldo devedor"
                    data={contratos}
                    columns={contratoTableColumns}
                    options={options}
                />
            </ThemeProvider>
        </Container>
    )
}
