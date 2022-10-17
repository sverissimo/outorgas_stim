import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './loading.module.scss'
console.log("🚀 ~ file: Loading.tsx ~ line 4 ~ styles", styles)

export const Loading = () => {
    return (
        <div className={styles.container}>

            <Box>
                <CircularProgress size='3.3rem' />
            </Box>
        </div>

    )
}
