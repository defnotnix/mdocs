"use client";

import React, { PropsWithChildren, useContext, useEffect } from "react";
//nextjs
import { useParams } from "next/navigation";
//mantine

//context
import { ContextEditor } from "./editor.context";
import { AppShell, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useQuery } from "@tanstack/react-query";
import { LayoutEditorHeader } from "./components/Header";
import App from "next/app";
import { LayoutEditorNavbar } from "./components/Navbar";

export function LayoutEditorContainer({ children }: PropsWithChildren) {
  // * DEFINITIONS

  const Params = useParams();

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  // * CONTEXTS

  const { state, dispatch } = useContext(ContextEditor.Context);

  // * STATES

  // * PRELOADS

  // * FUNCTIONS

  // * COMPONENTS

  return (
    <>
      <AppShell
        withBorder={false}
        header={{
          height: 60,
        }}
        navbar={{
          width: 280,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
      >
        <LoadingOverlay
          visible={state.loading}
          zIndex={1000}
          overlayProps={{ blur: 3, backgroundOpacity: 0.8, color: "dark.9" }}
          loaderProps={{ type: "bars" }}
        />

        <LayoutEditorHeader />
        <LayoutEditorNavbar />

        <AppShell.Main
          bg="var(--mantine-color-gray-light)"
          pt={60}
          pos="relative"
        >
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}
