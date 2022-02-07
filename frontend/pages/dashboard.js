import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const navBarData = require('../data/navBarData');
import Web3AuthLoginButton from '../web3auth/Web3AuthLoginButton';
import { FiMenu } from 'react-icons/fi';
import { Web3AuthContext } from '../web3auth/Web3AuthContext';
import { useContext } from 'react';

export default function dashboard() {

    const router = useRouter()

    useEffect(() => {
        if (router && !navBarData.find(object => object.id != null && object.id == router.query.page)) {
            router.push({
                pathname: '/dashboard',
                query: {
                    page: 'search'//navBarData[0].id
                }
            }, undefined, { shallow: true })
        }
    })

    return (
        <div className="flex flex-col space-y-4 h-screen">
            <NavBar />
            <ContentView />
        </div>
    )
}

function LogoWithText() {
    return (
        <button className="flex items-center justify-center space-x-4">
            <Logo />
            <p className="text-4xl font-extrabold text-accent glow-white-sm">
                NFTickets
            </p>
        </button>
    )
}

function Logo() {
    return (
        <div className="flex items-end">
            <div className="absolute w-9 h-14 rounded-md ticket-clip-darker opacity-0 -rotate-[8deg]">

            </div>
            <div className="w-9 h-14 rounded-md ticket-clip opacity-100 rotate-[8deg] glow-pink-xs">

            </div>
        </div>
    )
}

export function ContentTitle({ title }) {
    return (
        <p className="text-6xl font-extrabold text-accent glow-white-sm">
            {title}
        </p>
    )
}

function ContentView() {

    const [content, setContent] = useState()

    const router = useRouter()

    useEffect(() => {
        const object = navBarData.find(object => object.id == router.query.page)
        setContent(object == null ? "" : object.content)
    })

    return (
        <div className='flex flex-col w-full h-full px-8'>
            {content}
        </div>
    )
}

function NavBar() {

    const [menuCollapsed, setMenuCollapsed] = useState(true);

    return (
        <div className="flex flex-col items-start space-y-4 lg:space-y-0 lg:flex-row w-full p-4 pr-6">
            <div className="flex w-full">
                <div className="scale-75 h-14 -ml-2">
                    <LogoWithText />
                </div>
                <div className="w-full" />
                <MenuToggleButton menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
            </div>
            <NavBarButtons menuCollapsed={menuCollapsed} />
        </div>
    )
}

function MenuToggleButton({ menuCollapsed, setMenuCollapsed }) {
    return (
        <button className='text-accent pr-2 lg:hidden'
            onClick={() => {
                setMenuCollapsed(!menuCollapsed)
            }}>
            <FiMenu size="28" />
        </button>
    )
}

function NavBarButtons({ menuCollapsed }) {

    const web3AuthProvider = useContext(Web3AuthContext);

    return (
        <div className={`${menuCollapsed && "hidden"} lg:flex flex flex-col lg:flex-row justify-end w-full h-full lg:h-14 space-y-4 lg:space-x-4 lg:space-y-0`}>
            {
                navBarData.map(function (data) {
                    if (!data.authRequired || (web3AuthProvider && web3AuthProvider.web3auth && web3AuthProvider.web3auth.provider)) {
                        return (
                            <NavBarButton data={data} />
                        )
                    }
                })
            }
            <Web3AuthLoginButton />
        </div>
    )
}

function NavBarButton({ data }) {

    const router = useRouter();

    return (
        <button className="flex items-center h-14 space-x-default bg-accentD rounded-xl hover:scale-105 transition-all duration-300"
            onClick={
                function () {
                    router.push({
                        pathname: data.path != null ? data.path : '/dashboard',
                        query: data.id != null && {
                            page: data.id
                        }
                    }, undefined, { shallow: true })
                }
            }>
            <div className="flex items-center justify-center h-full aspect-square bg-highlightD rounded-xl">
                <p className="text-accent glow-white-xs">
                    {data.icon}
                </p>
            </div>
            <p className="font-bold text-accent p-4 glow-white-xxs" >
                {data.title}
            </p>
        </button>
    )
}