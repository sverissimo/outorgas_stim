import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderMenuState {
    menuIsOpen: boolean;
    anchorEl: null | HTMLElement;
}

export function HeaderMenuButton(props: React.PropsWithChildren) {
    const
        [state, setState] = useState<HeaderMenuState>({
            menuIsOpen: false,
            anchorEl: null
        })
        , navigate = useNavigate()

    const toggleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setState({
            ...state,
            menuIsOpen: !state.menuIsOpen,
            anchorEl: event.currentTarget
        })
    }

    const handleClick = (routerLink: string, event: any) => {
        setState({ ...state, menuIsOpen: false, anchorEl: null })

        navigate(`/${routerLink}`)
    }
    const handleClose = (e: any) => {
        //console.log("🚀 ~ file: HeaderMenuButton.tsx ~ line 36 ~ handleClose ~ e", e)
        setState({ ...state, menuIsOpen: false, anchorEl: null })
    }

    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={state.menuIsOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={state.menuIsOpen ? 'true' : undefined}
                onClick={toggleMenu}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={state.anchorEl}
                open={state.menuIsOpen}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={e => handleClick('empresas', e)}>Ordenar por Empresas</MenuItem>
                <MenuItem onClick={e => handleClick('', e)}>Ordenar por Contratos</MenuItem>
                <MenuItem onClick={handleClose}>Relatórios</MenuItem>
            </Menu>
        </div>
    )
}