import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './loading.module.scss'


export const Loading = () => {
    return (
        <div className={styles.container}>
            <Box>
                <CircularProgress size='3.3rem' />
            </Box>
        </div>

    )
}
