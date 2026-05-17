"use client";

import React, { PropsWithChildren, useEffect } from "react";
//mantine
import { AppShell } from "@mantine/core";
//icons

//components

//components
import { ContextExplorer } from "./explorer.contex";
import { useDisclosure } from "@mantine/hooks";
import { Header } from "./components/Header";
//decode
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export function LayoutExplorer({ children }: PropsWithChildren) {
  // * DEFINITIONS

  const Router = useRouter();

  // * PRE STATES

  // * CONTEXTS

  const { state, dispatch } = React.useContext(ContextExplorer.Context);

  // * STATES

  // * PRELOADING

  // * FUNCTIONS

  useEffect(() => {
    const token: any = sessionStorage.getItem("doctoken");

    if (token) {
      try {
        jwtDecode(sessionStorage.getItem("doctoken") || "");
      } catch (err) {
        Router.push("/");
      }
    } else {
      Router.push("/");
    }
  }, []);

  // * COMPONENTS

  return (
    <>
      <ContextExplorer.Provider>
        <AppShell
          withBorder={false}
          header={{
            height: 60,
          }}
        >
          <Header />
          <AppShell.Main bg="var(--mantine-color-brand-light)" pt={60}>
            {children}
          </AppShell.Main>
        </AppShell>
      </ContextExplorer.Provider>
    </>
  );
}
