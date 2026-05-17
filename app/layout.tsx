"use client";

import React, { PropsWithChildren } from "react";
//mantine
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { ContextMenuProvider } from "mantine-contextmenu";
//@mantine-styles
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/spotlight/styles.css";
import "mantine-contextmenu/styles.layer.css";

//clsx
import cx from "clsx";
//styles

import { configMantineTheme } from "@/config/theme/mantine.theme.config";
import "@/global/css/global.css";
//query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
//props

export default function Layout({ children }: PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  axios.defaults.baseURL = "https://vdocs.manabiyanepal.com.np";
  //axios.defaults.baseURL = "http://192.168.200.8:8000";

  return (
    <>
      <html lang="en">
        <head>
          <title>Manabiya Docs</title>
        </head>
        <body>
          <ColorSchemeScript defaultColorScheme={"light"} />
          <MantineProvider
            theme={configMantineTheme}
            defaultColorScheme={"light"}
          >
            <ContextMenuProvider>
              <ModalsProvider>
                <Notifications />
                <QueryClientProvider client={client}>
                  {children}
                </QueryClientProvider>
              </ModalsProvider>
            </ContextMenuProvider>
          </MantineProvider>
        </body>
      </html>
    </>
  );
}
