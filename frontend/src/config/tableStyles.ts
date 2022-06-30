import { createTheme } from "@mui/material";


export const getMuiTheme = () => createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                /* root: {
                    backgroundColor: "blue !important"
                }, */
                /* head: { backgroundColor: "blue !important" } */
            }
        }
    }
})