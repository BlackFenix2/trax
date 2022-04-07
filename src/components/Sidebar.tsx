import {
  List,
  Box,
  ListItem,
  ListIcon,
  Divider,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import React from "react";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import NextImage from "next/image";
import NextLink from "next/link";
import { usePlaylists } from "src/lib/hooks";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/create-playlist",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const Sidebar: React.FunctionComponent = () => {
  const { playlists } = usePlaylists();
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menu) => (
              <ListItem key={menu.name} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        marginRight="20px"
                        color="white"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box marginTop="20px" marginBottom="20px">
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <ListItem key={menu.name} paddingX="20px" fontSize="16px">
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        marginRight="20px"
                        color="white"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider bg="gray.800" />
        <Box
          height="66%"
          overflowY="auto"
          paddingY="20px"
          // fix scrollbar visibility on browser
          sx={{
            "&::-webkit-scrollbar": {
              width: "16px",
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
          }}
        >
          <List spacing={2}>
            {playlists?.map((playlist) => (
              <ListItem key={playlist.id} paddingX="20px">
                <LinkBox>
                  <NextLink href={`/playlist/${playlist.id}`} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={MdPlaylistAdd}
                        marginRight="20px"
                        color="white"
                      />
                      {playlist.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
