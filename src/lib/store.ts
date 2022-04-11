import { createStore, action, Action, createTypedHooks } from "easy-peasy";
import { SongModel } from "./prisma";

type SongsModel = {
  activeSongs: SongModel[];
  activeSong: SongModel | null;
  changeActiveSong: Action<SongsModel, SongModel>;
  changeActiveSongs: Action<SongsModel, SongModel[]>;
};

export const store = createStore<SongsModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSong: action((state, payload) => {
    state.activeSong = payload;
  }),
  changeActiveSongs: action((state, payload) => {
    state.activeSongs = payload;
  }),
});

const typedHooks = createTypedHooks<SongsModel>();

export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;
