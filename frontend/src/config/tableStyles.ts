import { createTheme } from "@mui/material";


export const getMuiTheme = () => createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                body: {
                    fontSize: '0.6rem !important',
                    maxWidth: '200px !important'

                },
                root: { fontFamily: 'inherit' }, //Aplica a todas as células da tabela
                head: {
                    fontSize: '0.69rem ',
                    backgroundColor: '#f2f2f4',
                    fontWeight: '600',
                    padding: '8px 0',
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontSize: '0.69rem ',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontFamily: 'inherit'
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    ":hover": { filter: "brightness(1.3)" }
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