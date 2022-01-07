import React from 'react'
import { AppBar, Grid, Switch, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
interface IProps {
    darkMode: boolean;
    changeDarkMode: () => void;
}
const Header: React.FC<IProps> = ({ darkMode, changeDarkMode }) => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Grid container>
                    <Grid item xs={10} display={"flex"} alignItems={"center"}>
                        <Typography>
                            بیگ استور
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Box display="flex" alignItems={'center'}>
                            <Typography variant='body1'>
                                دارک/ لایت
                            </Typography>
                            <Switch checked={darkMode} onChange={changeDarkMode} />
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header
