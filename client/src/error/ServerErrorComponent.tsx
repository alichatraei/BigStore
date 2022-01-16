import React, { useEffect } from 'react'
import { Paper, Typography } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box } from '@mui/system';
import { Location } from 'history'
interface LocationType {
    error: {
        title: string;
        status: number;
    }
}
const ServerErrorComponent = () => {
    const history = useNavigate();
    const location = useLocation();
    const state = location.state as LocationType
    useEffect(() => {
    }, [])
    return (
        <Box my={3}>
            <Paper sx={{ padding: '16px' }}>
                {state?.error ? (<Typography variant='h3'>{state?.error?.title}</Typography>) : <></>}
            </Paper>
        </Box>
    )
}

export default ServerErrorComponent
