import Head from 'next/head';
import {Box, Container} from '@chakra-ui/react'

const Layout = ({children, router}) => {
    return (
        <Box as="main">
            <Head>
                <link rel="shortcut icon" href="/images/favicon.png"/>
                <meta name="viewport" content="width=device-width, intial-scale=1"/>
                <meta charSet="UTF-8" />
                <meta name="keywords" content="" />
                <meta name="author" content="" />
                <meta name="description" content=""></meta>
                <title>NFTickets</title>
            </Head>
                {children}
        </Box>
    )
}

export default Layout