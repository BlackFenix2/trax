import { Box, Flex } from "@chakra-ui/layout";
import { Text, Image } from "@chakra-ui/react";
import type { NextPage, InferGetServerSidePropsType } from "next";
import GradientLayout from "src/components/GradientLayout";
import { useMe } from "src/lib/hooks";
import prisma from "src/lib/prisma";

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return { props: { artists } };
};

const Home: NextPage<any> = ({
  artists,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useMe();

  return (
    <GradientLayout
      color="purple"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistCount} public playlists`}
      image="/peep.png"
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top Artist this month
          </Text>
          <Text fontSize="md">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist, index) => (
            <Box paddingX="10px" width="20%" key={artist.id}>
              <Box bg="gray.900" borderRadius={4} padding={15} width="100%">
                <Text>{artist.name}</Text>
                <Image
                  src={`http://placekitten.com/300/300/?image=${index + 1}`}
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artists</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export default Home;
