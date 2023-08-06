import React from 'react'
import { Button, SxProps } from '@mui/material'
import { Theme } from '@emotion/react';

interface Props {
    buttonText: string;
    onClick: () => void;
    sx?: SxProps<Theme>
}


const OutlinedButton = (props: Props) => {
    const { sx, buttonText, onClick } = props;
    return (
        <Button
            onClick={onClick} 
            variant={'outlined'}
            sx={sx}
        >
            {buttonText}
        </Button>
    )
}

export default OutlinedButton