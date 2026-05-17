"use client";

import React, { useContext, useEffect, useState } from "react";
//next
import { useParams, useRouter, usePathname } from "next/navigation";
//mantine
import {
  ActionIcon,
  Anchor,
  Breadcrumbs,
  Button,
  Center,
  Container,
  Drawer,
  Grid,
  Group,
  Loader,
  LoadingOverlay,
  Modal,
  Paper,
  Popover,
  ScrollArea,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
//motion
import { AnimatePresence, motion } from "framer-motion";
//query
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiFileExplorer } from "@/api/folder";
//context
import { ContextExplorer } from "@/components/layout/explorer/explorer.contex";
//contextmenu
import { useContextMenu } from "mantine-contextmenu";
//icons
import {
  ArrowLeft,
  ArrowRight,
  CaretRight,
  FilePdf,
  FilePlus,
  Folder,
  FolderOpen,
  MagnifyingGlass,
  Plus,
  Trash,
  Warning,
} from "@phosphor-icons/react";
//components

//styles
import classes from "./explorer.module.css";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { triggerNotification } from "@/components/helper/notification";
import { useDisclosure } from "@mantine/hooks";
import { HeadNav } from "./HeadNav";
import { apiFile } from "@/api/file";
import { getStatementHistory, getWodaHistory } from "./explorer.api";
import { RenderCards } from "./RenderCards";

export function ModuleExplorer() {
  // * DEFINITIONS

  const { id } = useParams();

  // * PRESTATES

  // * PRELOADING

  const { data, isFetching, isLoading, isError, refetch }: any = useQuery({
    queryKey: ["explorer", id],
    queryFn: async () => {
      const res: any = await apiFileExplorer.get({ parent: id });

      return res.err
        ? []
        : Array.isArray(res.data)
        ? {
            folders: res.data.map((item: any) => {
              return {
                ...item,
                icon: FolderOpen,
                url: "/explorer/view/" + item.id + "?parent=" + item.name,
              };
            }),
          }
        : {
            folders: res.data?.children?.map((item: any) => {
              return {
                ...item,
                icon: FolderOpen,
                url: "/explorer/view/" + item.id + "?parent=" + item.name,
              };
            }),
            statements: res.data?.statements?.map((item: any) => {
              return {
                ...item,
                id: item.id,
                label: item.name,
                icon: FilePdf,
                description: "Woda Documents",
                url: "/editor/statement/file/" + item.id,
                color: "teal",
              };
            }),
            woda: res.data?.wodadoc?.map((item: any) => {
              return {
                ...item,
                id: item.id,
                label: item.name,
                icon: FilePdf,
                description: "Bank Statement",
                url: "/editor/woda/file/" + item.id,
                color: "teal",
              };
            }),
          };
    },
    initialData: {
      folders: [],
      statements: [],
      woda: [],
    },
  });

  // * FUNCTIONS

  return (
    <div>
      <HeadNav />

      <Container size="xl">
        <AnimatePresence>
          <RenderCards data={data} refetch={refetch} />

          {(isFetching || isLoading) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Loader
                style={{
                  position: "fixed",
                  bottom: 50,
                  right: 50,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
}
