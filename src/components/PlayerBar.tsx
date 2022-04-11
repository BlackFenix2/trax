import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "src/lib/store";
import Player from "./Player";

const PlayerBar = () => {
  const songs = useStoreState((state) => state.activeSongs);

  // TODO add DTO type beween Redux state and Prisma-generated type
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        {activeSong ? (
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="small">{activeSong.artist.name}</Text>
          </Box>
        ) : null}

        <Box width="40%">
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  );
};
export default PlayerBar;
