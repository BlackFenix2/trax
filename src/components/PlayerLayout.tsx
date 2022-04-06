import React from "react";
import { Box } from "@chakra-ui/layout";
import Sidebar from "./Sidebar";
import PlayerBar from "./PlayerBar";

const PlayerLayout: React.FunctionComponent = ({ children }) => (
  <Box width="100vw" height="100vh">
    {/* sidebar */}
    <Box position="absolute" top="0" width="250px" left="0">
      <Sidebar />
    </Box>
    {/* Main view */}
    <Box marginLeft="250px" marginBottom="100px">
      <Box width="100%" height="calc(100vh - 100px)">
        {children}
      </Box>
    </Box>
    <Box position="absolute" left="0" bottom="0">
      <PlayerBar />
    </Box>
  </Box>
);

export default PlayerLayout;
