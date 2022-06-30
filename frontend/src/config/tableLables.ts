import { MUIDataTableTextLabels } from "mui-datatables";


export const textLabels: Partial<MUIDataTableTextLabels> = {
    body: {
        noMatch: "Nenhum registro encontrado.",
        toolTip: "Ordenar",
        columnHeaderTooltip: column => `ordenar por ${column.label}`
    },
    pagination: {
        next: "Próxima página",
        previous: "Página anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de",
    },
    toolbar: {
        search: "Procurar",
        downloadCsv: "Download CSV",
        print: "Imprimir",
        viewColumns: "Exibir/ocultar colunas",
        filterTable: "Filtrar",
    },
    filter: {
        all: "Todos",
        title: "FILTROS",
        reset: "LIMPAR FILTROS",
    },
    viewColumns: {
        title: "Exibir Colunas",
        titleAria: "Exibir/ocultar colunas",
    },
    selectedRows: {
        text: "linha(s) selecionadas",
        delete: "Apagar",
        deleteAria: "Apagar linhas selecionadas",
    },
}