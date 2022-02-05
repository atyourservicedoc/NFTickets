import { Container, Box, Heading, SimpleGrid, Button } from "@chakra-ui/react";


export default function Landing() {

  return (
    <>
            <Box 
            backgroundImage="linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)) ,url('/images/splash.jpg')"
            backgroundPosition="left"
            backgroundRepeat="no-repeat"
            minHeight="100vh"
            >
                <SimpleGrid column={1} mx='10' maxW='50%'>
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
                </SimpleGrid>
            </Box>
            
    </>
  )
}