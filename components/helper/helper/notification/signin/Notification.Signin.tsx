"use client";

import { showNotification, updateNotification } from "@mantine/notifications";
//icons
//config
import { configNotificationDefaults } from "../notification.config";

export type typeFormNotification = {
  title?: string;
  message?: string;
  autoClose?: boolean | number;
};

export function isLoading({
  title = "Processing your request",
  message = "Please wait while we process your request.",
  ...props
}: typeFormNotification = {}) {
  showNotification({
    ...configNotificationDefaults.isLoading,
    title,
    message,
    ...props,
  });
}

export function isSuccess({
  title = "Success!",
  message = "Request processed successfully!",
  ...props
}: typeFormNotification = {}) {
  updateNotification({
    ...configNotificationDefaults.isSuccess,
    title,
    message,
    ...props,
  });
}

export function isWarning({
  title = "Invalid request!",
  message = "The request is incorrect or invalid.",
  ...props
}: typeFormNotification = {}) {
  updateNotification({
    ...configNotificationDefaults.isWarning,
    title,
    message,
    ...props,
  });
}

export function isError({
  title = "On Snap!",
  message = "Unfortunately your request was rejected. Please try again",
  ...props
}: typeFormNotification = {}) {
  updateNotification({
    ...configNotificationDefaults.isError,
    title,
    message,
    ...props,
  });
}

export function isValidationError({
  title = "Incomplete or Invalid Fields Detected!",
  message = "Please ensure all fields are completed with accurate information.",
  ...props
}: typeFormNotification = {}) {
  updateNotification({
    ...configNotificationDefaults.isWarning,
    title,
    message,
    ...props,
  });
}
