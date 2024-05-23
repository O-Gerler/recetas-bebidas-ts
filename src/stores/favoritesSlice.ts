import { StateCreator } from "zustand";
import { RecepieType } from "../types";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: RecepieType[];
  handleClickFavorute: (recepie: RecepieType) => void;
  favoriteExists: (id: RecepieType["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (
  set,
  get,
  api
) => ({
  favorites: [],
  handleClickFavorute: (recepie) => {
    if (get().favoriteExists(recepie.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recepie.idDrink
        ),
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se elimino de favoritos",
        error: true,
      });
    } else {
      set((state) => ({
        favorites: [...state.favorites, recepie],
      }));
      createNotificationSlice(set, get, api).showNotification({
        text: "Se agrego a favoritos",
        error: false,
      });
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists: (id) =>
    get().favorites.some((favorite) => favorite.idDrink === id),
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});
