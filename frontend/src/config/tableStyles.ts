import { createTheme } from "@mui/material";


export const getMuiTheme = () => createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                body: {
                    cursor: "pointer !important",
                    fontSize: '0.6rem !important'
                },
                /* root: {
                    backgroundColor: "blue !important"
                }, */
                //head: { fontSize: '0.5rem !important' }
            }
        }
    }
})