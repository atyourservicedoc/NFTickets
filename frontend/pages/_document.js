import NextDocument, { Html, Head, Main, NextScript} from 'next/document';

export default class Document extends NextDocument {

    render () {
        return(
            <Html lang="en" style={{minHeight: '100%'}}>
                <Head>
                    
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}