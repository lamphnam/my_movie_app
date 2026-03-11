import { useCallback, useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import type { MovieListItem } from "@/types";

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<MovieListItem[]>(
    "favorites",
    [],
  );

  const addFavorite = useCallback(
    (movie: MovieListItem) => {
      setFavorites((prev) => {
        if (prev.some((fav) => fav.slug === movie.slug)) return prev;
        return [movie, ...prev];
      });
    },
    [setFavorites],
  );

  const removeFavorite = useCallback(
    (slug: string) => {
      setFavorites((prev) => prev.filter((fav) => fav.slug !== slug));
    },
    [setFavorites],
  );

  const isFavorited = useCallback(
    (slug: string) => {
      return favorites.some((fav) => fav.slug === slug);
    },
    [favorites],
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, [setFavorites]);

  const toggleFavorite = useCallback(
    (movie: MovieListItem) => {
      setFavorites((prev) => {
        if (prev.some((fav) => fav.slug === movie.slug)) {
          return prev.filter((fav) => fav.slug !== movie.slug);
        }
        return [movie, ...prev];
      });
    },
    [setFavorites],
  );

  return useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
      isFavorited,
      clearFavorites,
      toggleFavorite,
    }),
    [
      favorites,
      addFavorite,
      removeFavorite,
      isFavorited,
      clearFavorites,
      toggleFavorite,
    ],
  );
};
