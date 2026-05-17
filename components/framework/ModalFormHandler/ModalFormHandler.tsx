"use client";

import { propModalFormHandler } from "./ModalFormHandler.prop";

// variants
import { ModalFormHandlerNew } from "./variants/new";
import { ModalFormHandlerEdit } from "./variants/edit/ModalFormHandler.Edit";

export function ModalFormHandler(props: propModalFormHandler) {
  switch (props.variant) {
    case "edit":
      return <ModalFormHandlerEdit {...props} />;
    default:
      return <ModalFormHandlerNew {...props} />;
  }
}
