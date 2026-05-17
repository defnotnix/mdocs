"use client";

import React, { useContext, useEffect, useState } from "react";
//next
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
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
import { Query, useMutation, useQuery } from "@tanstack/react-query";
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
import { getSignatureFiles, getWodaFiles } from "@/api/search";

export function ModuleExplorerSearch() {
  // * DEFINITIONS

  const { id } = useParams();

  const Query: any = useSearchParams();

  // * PRESTATES

  const { state, dispatch } = useContext(ContextExplorer.Context);

  // * PRELOADING

  const { data, isLoading, isError, refetch }: any = useQuery({
    queryKey: ["explorer", id],
    queryFn: async () => {
      if (Query.get("type") == "statement") {
        const res: any = await getSignatureFiles({
          params: { query: Query.get("search") },
        });

        return {
          folders: [],
          statements: res?.data?.results?.map((item: any) => {
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
          woda: [],
        };
      } else if (Query.get("type") == "woda") {
        const res: any = await getWodaFiles({
          params: { query: Query.get("search") },
        });

        return {
          folders: [],
          statements: [],
          woda: res?.data?.results?.map((item: any) => {
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
      } else {
        const _wodaData: any = await getWodaFiles({
          params: { query: Query.get("search") },
        });

        const _stData: any = await getSignatureFiles({
          params: { query: Query.get("search") },
        });

        return {
          folders: [],
          statements: _stData?.data?.results?.map((item: any) => {
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
          woda: _wodaData?.data?.results?.map((item: any) => {
            return {
              ...item,
              id: item.id,
              label: item.name,
              icon: FilePdf,
              description: "Woda Documents",
              url: "/editor/statement/file/" + item.id,
              color: "grape",
            };
          }),
        };
      }
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
        </AnimatePresence>
      </Container>
    </div>
  );
}
