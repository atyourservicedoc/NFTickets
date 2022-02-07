import { MoralisProvider } from 'react-moralis';

export default function MoralisWrapper(props) {
    return (
        <MoralisProvider appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID} serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}>
            {props.children}
        </MoralisProvider>
    )
}