"use client";

import React, { PropsWithChildren, useContext } from "react";
//next
import { useParams, usePathname } from "next/navigation";
//mantine
import {} from "@mantine/core";
//context
import { ContextEditor } from "@/components/layout/editor/editor.context";
//framework
import { FormHandler } from "@/components/framework/FormHandler";
import { ModuleEditorFormWoda } from "../form/woda";
import { ModuleEditorTemplate } from "../template";
import { ModuleEditorFormStatement } from "../form/statement";
//api

export function ModuleEditorNew() {
  // * DEFINITIONS

  // * CONTEXTS

  const { state, dispatch } = useContext(ContextEditor.Context);
  const { formView } = state;
  const Pathname = usePathname();

  // * STATES

  // * PRELOADS

  // * FUNCTIONS

  // * COMPONENTS

  if (formView && Pathname.includes("/woda")) {
    return <ModuleEditorFormWoda />;
  }

  if (formView && Pathname.includes("/statement")) {
    return <ModuleEditorFormStatement />;
  }

  return <ModuleEditorTemplate />;
}
