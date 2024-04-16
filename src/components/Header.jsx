import React from 'react'
import { Box, AppBar, Toolbar, Typography} from '@mui/material'

export const Header = () => {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{ top:30 }}>
                <Toolbar sx={{ justifyContent: "space-between", margin: 4.5}}>
                    <Typography variant='h6'>
                        Logo
                    </Typography>
                    <Typography>
                       dirección
                    </Typography>
                    <Typography variant='h6'>
                        SoftDev
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}