import { ContentTitle } from "../../pages/dashboard"

export default function MainContent() {
    return (
        <div className="flex flex-col space-y-4 h-full">
            <ContentTitle title={"Featured Events"} />
            <FeaturedEventsGrid />
        </div>
    )
}

function FeaturedEventsGrid() {
    return (
        <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full">
            <FeaturedEventCard
                name={'Test Event'}
                price={0.1}
                quantity={123}
                description={'This is a description for testing!'}
            />
            <FeaturedEventCard
                name={'Test Event'}
                price={0.1}
                quantity={123}
                description={'This is a description for testing!'}
            />
            <FeaturedEventCard
                name={'Test Event'}
                price={0.1}
                quantity={123}
                description={'This is a description for testing!'}
            />
            <FeaturedEventCard
                name={'Test Event'}
                price={0.1}
                quantity={123}
                description={'This is a description for testing!'}
            />
            <FeaturedEventCard
                name={'Test Event'}
                price={0.1}
                quantity={123}
                description={'This is a description for testing!'}
            />
            <FeaturedEventCard
                name={'Test Event'}
                price={0.1}
                quantity={123}
                description={'This is a description for testing!'}
            />
        </div>
    )
}

function FeaturedEventCard({ name, imageUri, price, quantity, description }) {
    return (
        <button className="flex flex-col bg-accentD rounded-2xl p-4 space-y-4 hover:scale-[1.025] transition-all duration-300">
            <div className="h-2/5 w-full bg-blue-500 rounded-2xl">

            </div>
            <div className="text-accent font-black text-4xl">
                {name}
            </div>
            <DataField indicator={'Price'} text={price} unit={'ETH'} />
            <DataField indicator={'Quantity'} text={quantity} unit={'tickets'} />
            
        </button>
    )
}

function DataField({ indicator, text, unit }) {
    return (
        <div className="flex w-full h-12 bg-intermediateD rounded-2xl">
            <div className="flex bg-highlightD rounded-2xl text-accent font-bold items-center justify-center px-6">
                {indicator}
            </div>
            <div className="w-full" />
            <div className="flex items-center justify-center px-6 whitespace-nowrap space-x-2">
                <p className="text-accent font-bold">
                    {text}
                </p>
                <p className="text-accent font-bold">
                    {unit}
                </p>
            </div>
        </div>
    )
}

function DescriptionField({ description }) {
    return (
        <div className="flex flex-col w-full grow bg-intermediateD rounded-2xl">
            <div className="flex w-36 h-12 bg-highlightD rounded-2xl text-accent font-bold items-center justify-center px-6">
                Description
            </div>
            <div className="w-full" />
            <div className="flex p-4 whitespace-nowrap space-x-2">
                <p className="text-accent font-bold">
                    {description}
                </p>
            </div>
        </div>
    )
}