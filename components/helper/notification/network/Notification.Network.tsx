"use client";

import { showNotification, updateNotification } from "@mantine/notifications";

//config
import { configNotificationDefaults } from "../notification.config";
import { Check, ExclamationMark, Warning } from "@phosphor-icons/react";

export type typeFormNotification = {
  title?: string;
  message?: string;
  autoClose?: boolean | number;
};

export function isServerOffline({
  title = "Cannot connect to server!",
  message = "Cannot connect to server. Please try again later.",
  ...props
}: typeFormNotification = {}) {
  showNotification({
    ...configNotificationDefaults.isError,
    title,
    message,
    ...props,
    autoClose: 10000,
  });
}
