import React from 'react'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { ICounterReducer } from './counterReducer'
const ContactPage = () => {
    const { counter, title } = useSelector((state: ICounterReducer) => state)
    return (
        <>
            <Typography variant='h3'>{counter} , {title}</Typography>
        </>
    )
}

export default ContactPage
