import useSwr from "swr";

import fetcher from "./fetcher";
import { PlaylistModel } from "./prisma";

export const useMe = () => {
  const { data, error } = useSwr("/me", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const usePlaylists = () => {
  const { data, error } = useSwr("/playlist", fetcher);

  return {
    playlists: (data || []) as PlaylistModel[],
    isLoading: !error && !data,
    isError: error,
  };
};
