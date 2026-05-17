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

export function isLoading({
  title = "Processing!",
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
  message = "Request has been processed successfully!",
  ...props
}: typeFormNotification = {}) {
  updateNotification({
    ...configNotificationDefaults.isSuccess,
    title,
    message,
    ...props,
    icon: <Check />,
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
    icon: <Warning />,
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
    icon: <ExclamationMark />,
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
    icon: <Warning />,
  });
}

export function isValidationStepError({
  title = "Incomplete or Invalid Fields Detected!",
  message = "Please ensure all fields are completed with accurate information.",
  ...props
}: typeFormNotification = {}) {
  showNotification({
    ...configNotificationDefaults.isWarning,
    title,
    message,
    ...props,
    icon: <Warning />,
  });
}
