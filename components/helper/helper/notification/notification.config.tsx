"use client";

const autoCloseDuration = 6000;

export const configNotificationDefaults = {
  isLoading: {
    id: "notification",
    color: "blue",
    loading: true,
    autoClose: false,
  },
  isSuccess: {
    id: "notification",
    color: "teal",
    loading: false,
    autoClose: autoCloseDuration,
    //icon: <Check />,
  },
  isWarning: {
    id: "notification",
    color: "orange",
    loading: false,
    autoClose: autoCloseDuration,
    //icon: <Warning />,
  },
  isError: {
    id: "notification",
    color: "red",
    loading: false,
    autoClose: autoCloseDuration,
    //icon: <Warning />,
  },
};
