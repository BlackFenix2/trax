import { PrismaClient, Artist, Song, Playlist, User } from "@prisma/client";

// add prisma to the NodeJS global type
// Prevent multiple instances of Prisma Client in development
declare const global: any;

const prisma: PrismaClient = global.prisma || new PrismaClient();

// load global prisma in development, ignore re-assignment for production
if (process.env.NODE_ENV === "development") global.prisma = prisma;

// list if prisma models for typescript validation on react components
export type SongModel = Song;
export type ArtistModel = Artist;
export type PlaylistModel = Playlist;
export type UserModel = User;

export default prisma;
