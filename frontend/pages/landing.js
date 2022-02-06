import { Container, Box, Heading, SimpleGrid, Button } from "@chakra-ui/react";
import { LogoWithText } from "../components/Logo";
import Web3AuthLoginButton from "../web3auth/Web3AuthLoginButton";

export default function Landing() {

    return (
        <>
            <Box
                backgroundImage="linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)) ,url('/images/splash.jpg')"
                backgroundPosition="left"
                backgroundRepeat="no-repeat"
                minHeight="100vh"
            >
                <div className="h-screen backdrop-blur-xl bg-black/75">

                    <div className="p-10">
                        <LogoWithText disabled={true} />
                    </div>
                    <SimpleGrid column={1} mx='16' maxW='50%'>
                        <div style={{ color: 'white', position: 'relative', top: '10%' }}>
                            <p className="text-accent font-bold text-3xl py-10 glow-white-xs">
                                Organise your event
                            </p>
                            <p className="text-accent font-black text-5xl glow-white-xs">
                                Cut out the middleman,
                            </p>
                            <p className="text-accent font-black text-5xl glow-white-xs">
                                Take control of your tickets
                            </p>
                            <p className="text-gray-400 font-bold text-2xl py-10">
                                With NFTickets you can cut out the middleman. No hidden charges.
                                No surprise fees. The ticket price is what you pay.
                                Thanks to blockchain technology, you can rest assured your ticket is real, affordable, and sellable as you need.
                            </p>
                            <Web3AuthLoginButton />
                        </div>
                    </SimpleGrid>
                </div>
            </Box>

        </>
    )
}

/*

<div  style={{color:'white', position:'relative', top:'50%'}}>
                        <Heading  as='h2' size='lg' py="10">
                            Organise your event
                        </Heading>
                        <Heading  as='h2' size='3xl'>
                            Cut out the middleman,
                        </Heading>
                        <Heading  as='h2' size='3xl'>
                            Take control of your tickets
                        </Heading>
                        <Heading  as='h2' size='lg' py="10">
                            With NFTickets you can cut out the middleman. No hidden charges.
                            No surprise fees. The ticket price is what you pay.
                            Thanks to blockchain technology, you can rest assured your ticket is real, affordable, and sellable as you need.
                        </Heading>
                        <Button colorScheme="pink"> Log In</Button>
                    </div>

                    */