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
                head: { fontSize: '0.68rem !important' }
            }
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    //backgroundColor: 'pink'
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                h6: {
                    fontSize: '1rem',
                    fontWeight: 600,
                    fontFamily: 'Segoe UI, Tahoma, Verdana, Roboto'
                }
            }
        }
    }
})