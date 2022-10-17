import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import './header.scss'
import { HeaderMenuButton } from './HeaderMenuButton';

export function Header() {
    return (
        <div className="headerContainer">
            <Toolbar>
                <HeaderMenuButton />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Sistema de gestão de débitos de outorgas do Transporte Intermunicipal de MG
                </Typography>
                {/*     <Button color="inherit">Login</Button> */}
            </Toolbar>
        </div>






    );
}
