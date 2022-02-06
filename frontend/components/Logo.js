import { useRouter } from "next/router"

export function LogoWithText({ disabled }) {

    // use router
    const router = useRouter();

    return (
        <button disabled={disabled} className="flex items-center justify-center space-x-4"
            onClick={() => {
                router.push('/landing')
            }}>
            <Logo />
            <p className="text-4xl font-extrabold text-accent glow-white-sm">
                NFTickets
            </p>
        </button>
    )
}

export function Logo() {
    return (
        <div className="flex items-end">
            <div className="absolute w-9 h-14 rounded-md ticket-clip-darker opacity-0 -rotate-[8deg]">

            </div>
            <div className="w-9 h-14 rounded-md ticket-clip opacity-100 rotate-[8deg] glow-pink-xs">

            </div>
        </div>
    )
}