import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import GradientLayout from "src/components/GradientLayout";
import SongsTable from "src/components/SongsTable";
import { validateToken } from "src/lib/auth";
import prisma from "src/lib/prisma";

export const getServerSideProps = async ({
  query,
  req,
}: GetServerSidePropsContext) => {
  let user;
  try {
    user = await validateToken(req.cookies.TRAX_ACCESS_TOKEN);
    console.info(user);
  } catch (e) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      // convet string to number
      id: +query.id,

      // TODO uncomment once playlists can be uploaded.
      // userId: (user as any).id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return { props: { playlist } };
};

const getBGColor = (id: number): string => {
  const colors = [
    "red",
    "purple",
    "blue",
    "green",
    "yellow",
    "orange",
    "gray",
    "teal",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist: React.FunctionComponent<any> = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { playlist } = props;

  const color = getBGColor(playlist.id);
  return (
    <>
      <Head>
        <title>Trax Playlist</title>
      </Head>
      <GradientLayout
        color={color}
        subtitle="Playlists"
        title={playlist.name}
        description={`${playlist.songs.length} songs`}
        image={`https://picsum.photos/400?random=${playlist.id}`}
        roundImage={false}
      >
        <SongsTable songs={playlist.songs} />
      </GradientLayout>
    </>
  );
};

export default Playlist;
