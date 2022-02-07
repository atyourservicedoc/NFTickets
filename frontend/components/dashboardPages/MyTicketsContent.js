import Image from "next/image";
import { ContentTitle } from "../../pages/dashboard"

export default function MyTicketsContent() {

    const tickets = Array(10).fill(0);

    return (
        <div className="flex flex-col space-y-4 h-full">
            <ContentTitle title={"My Tickets"} />
            <TicketList tickets={tickets} />
        </div>
    )
}

function TicketList({ tickets }) {
    return (
        <div className="w-full h-full space-y-4 pr-2 overflow-y-scroll scrollbar">
            {
                tickets &&
                    tickets.map(event => {

                        // TODO: map data properly
                        const name = 'Test Event'
                        //const imageUri = 'QmYhmFVUGRDvnKmydvmFim1jUiL2rNZCe4zExgdxuMHCie'
                        const imageUri = ''
                        const price = 0.1
                        const quantity = 123
                        const description = 'This is a description for testing! This is a description for testing!'

                        return (
                            <TicketCard name={name} imageUri={imageUri} price={price} quantity={quantity} description={description} key={event.id} />
                        )
                    })
            }
        </div>
    )
}

function TicketCard({ name, imageUri, price, quantity, description }) {
    return (
        <div className="flex w-full h-64 space-x-4 rounded-2xl bg-accentD p-4">
            <div className="flex w-1/3 bg-highlightD rounded-xl overflow-clip">
                <Image src={`https://cloudflare-ipfs.com/ipfs/${imageUri}`} className="object-cover min-w-full min-h-full" alt=""/>
            </div>
            <div className="flex flex-col space-y-4 w-2/3">
                <p className="text-accent font-black text-3xl">
                    {name}
                </p>
                <SmallDataField indicator={'Description'} text={description} />
            </div>
        </div>
    )
}

function SmallDataField({ indicator, text, unit }) {
    return (
        <div className="flex w-full h-12 bg-intermediateD rounded-xl overflow-hidden">
            <div className="flex bg-highlightD rounded-xl text-accent font-bold items-center justify-center px-6">
                {indicator}
            </div>
            <div className="w-full" />
            <div className="flex grow items-center justify-center px-6 whitespace-nowrap space-x-2 pr-4">
                <p className="text-accent font-bold">
                    {text}
                </p>
                {
                    unit &&
                    <p className="text-accent font-bold">
                        {unit}
                    </p>
                }
            </div>
        </div>
    )
}