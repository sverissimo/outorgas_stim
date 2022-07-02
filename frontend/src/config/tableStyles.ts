import { createTheme } from "@mui/material";


export const getMuiTheme = () => createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                body: {
                    cursor: "pointer !important"
                },
                /* root: {
                    backgroundColor: "blue !important"
                }, */
                /* head: { backgroundColor: "blue !important" } */
            }
        }
    }
})