import { StateCreator } from "zustand";
import { NotificacionType } from "../types";
import { FavoritesSliceType } from "./favoritesSlice";

export type NotificationSliceType = {
  notification: NotificacionType;
  showNotification: (payload: Pick<NotificacionType, "text" | "error">) => void;
  hideNotification: () => void;
};

export const createNotificationSlice: StateCreator<
  NotificationSliceType & FavoritesSliceType,
  [],
  [],
  NotificationSliceType
> = (
  set,
  get
) => ({
  notification: {
    text: "",
    error: false,
    show: false,
  },
  showNotification: (payload) => {
    set({
      notification: {
        text: payload.text,
        error: payload.error,
        show: true,
      },
    });
    setTimeout(() => {
      get().hideNotification()
    }, 3000);
  },
  hideNotification: () => {
    set({
      notification: {
        text: "",
        error: false,
        show: false,
      },
    });
  },
});
