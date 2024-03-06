import React from "react";
import Navbar from "../../nav/Navbar";
import { Flex, Text } from "@chakra-ui/react";

function TimeTracker() {
    return (

        <Flex height="100vh" align="center" justify="center">
              <Navbar />
            <Text fontSize="2xl">Tracker</Text>
        </Flex>
    )
}


export default TimeTracker;