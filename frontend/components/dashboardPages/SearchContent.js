import { ContentTitle } from "../../pages/dashboard"
import { FiSearch } from "react-icons/fi"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { useEffect, useState } from "react";

export default function SearchContent() {

    const events = Array(10).fill(0);

    // state for paging
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(5);

    return (
        <div className="flex flex-col space-y-4 h-full">
            <ContentTitle title={"Explore"} />
            <div className="flex space-x-4">
                <SearchBar />
                <PagingController page={page} setPage={setPage} maxPages={maxPages} />
            </div>
            <EventList events={events} />
        </div>
    )
}

function SearchBar() {
    return (
        <div className="flex w-full h-16 bg-accentD rounded-2xl items-center px-4 space-x-4">
            <FiSearch size="30" className="text-accent glow-white-sm" />
            <input type="text" placeholder="Find an event . . ."
                className="flex grow bg-transparent text-lg font-semibold outline-none text-accent">
            </input>
        </div>
    )
}

function EventList({ events }) {
    return (
        <div className="w-full h-full space-y-4 pr-2 overflow-y-scroll scrollbar">
            {
                events ?
                    events.map(event => {

                        // TODO: map data properly
                        const name = 'Test Event'
                        //const imageUri = 'QmYhmFVUGRDvnKmydvmFim1jUiL2rNZCe4zExgdxuMHCie'
                        const imageUri = ''
                        const price = 0.1
                        const quantity = 123
                        const description = 'This is a description for testing! This is a description for testing!'

                        return (
                            <EventCard name={name} imageUri={imageUri} price={price} quantity={quantity} description={description} />
                        )
                    })
                    :
                    Array(3).fill(0).map(_ => {
                        return (
                            <LoadingEventCard />
                        )
                    })
            }
        </div>
    )
}

function EventCard({ name, imageUri, price, quantity, description }) {
    return (
        <div className="flex w-full h-64 space-x-4 rounded-2xl bg-accentD p-4">
            <div className="flex w-1/3 bg-highlightD rounded-xl overflow-clip">
                <img src={`https://cloudflare-ipfs.com/ipfs/${imageUri}`} className="object-cover min-w-full min-h-full" />
            </div>
            <div className="flex flex-col space-y-4 w-2/3">
                <p className="text-accent font-black text-3xl">
                    {name}
                </p>
                <SmallDataField indicator={'Quantity'} text={quantity} unit={'tickets'} />
                <SmallDataField indicator={'Description'} text={description} />
                <div className="flex space-x-4" >
                    <SmallDataField indicator={'Price'} text={price} unit={'ETH'} />
                    <button className="flex w-full h-12 bg-accent rounded-xl items-center justify-center font-extrabold glow-white-xxs" >
                        Buy now
                    </button>
                </div>
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

function LoadingEventCard({ event }) {
    return (
        <div className="w-full h-64 rounded-2xl bg-accentD animate-pulse">

        </div>
    )
}

function PagingController({ page, setPage, maxPages }) {
    return (
        <div className="flex space-x-2">
            <button disabled={page <= 1} className="flex items-center justify-center h-16 w-12 bg-highlightD rounded-2xl text-accent pr-1 disabled:opacity-50"
                onClick={() => {
                    setPage(page - 1)
                }}>
                <HiChevronLeft size={35} />
            </button>
            <div className="flex items-center justify-center h-16 w-12 bg-highlightD rounded-2xl text-accent text-xl font-extrabold">
                {page}
            </div>
            <button disabled={page >= maxPages} className="flex items-center justify-center h-16 w-12 bg-highlightD rounded-2xl text-accent pl-1 disabled:opacity-50"
                onClick={() => {
                    setPage(page + 1)
                }}>
                <HiChevronRight size={35} />
            </button>
        </div>
    )
}