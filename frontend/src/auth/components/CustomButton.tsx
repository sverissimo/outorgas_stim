import React, { FC } from 'react';
import { Button, ButtonProps } from '@material-ui/core';

interface CustomButtonProps extends ButtonProps {
    label: string;
    color?: (string | any);
    icon?: React.ReactNode;
    onClick: (event: any) => void;
}

export const CustomButton: FC<CustomButtonProps> = ({ label, icon, onClick, color, ...rest }) => {
    return (
        <Button
            size="small"
            color={color || 'primary'}
            className='saveButton'
            variant="contained"
            onClick={onClick}
            {...rest}
        >
            {label}
            {icon && (
                <>
                    <span>&nbsp;&nbsp;</span>
                    {icon}
                </>
            )}
        </Button>
    );
};

