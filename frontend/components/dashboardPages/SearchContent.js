import { ContentTitle } from "../../pages/dashboard"
import { FiSearch } from "react-icons/fi"

export default function SearchContent() {

    const events = Array(100).fill(0);

    return (
        <div className="contents space-y-4 h-full bg-green-500 pb-8">
            <ContentTitle title={"Search"} />
            <SearchBar />
            <EventList events={events}/>
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
        <div className="w-full h-full space-y-4 overflow-y-scroll">
            {
                events ?
                    events.map(event => {
                        return (
                            <EventCard event={event} />
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

function EventCard({ event }) {
    return (
        <div className="flex w-full h-64 rounded-2xl bg-accentD">

        </div>
    )
}

function LoadingEventCard({ event }) {
    return (
        <div className="w-full h-64 rounded-2xl bg-accentD animate-pulse">

        </div>
    )
}