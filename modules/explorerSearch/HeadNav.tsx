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
  Divider,
  Group,
  Modal,
  Paper,
  Popover,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
//motion
import { AnimatePresence, motion } from "framer-motion";
//query
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFileExplorer } from "@/api/folder";
//context
import { ContextExplorer } from "@/components/layout/explorer/explorer.contex";
//contextmenu
import { useContextMenu } from "mantine-contextmenu";
//icons
import {
  ArrowLeft,
  CaretRight,
  FilePdf,
  FilePlus,
  Folder,
  FolderOpen,
  MagnifyingGlass,
  Pencil,
  Plus,
  Trash,
  Warning,
} from "@phosphor-icons/react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { triggerNotification } from "@/components/helper/notification";
import { modals } from "@mantine/modals";

export function HeadNav() {
  // * DEFINITIONS

  const { id } = useParams();
  const Router = useRouter();
  const Pathname = usePathname();
  const Params: any = useParams();
  const Query: any = useSearchParams();
  const { showContextMenu } = useContextMenu();
  const queryClient = useQueryClient();

  // * CONTEXTS

  const { state, dispatch } = React.useContext(ContextExplorer.Context);

  const [currentFolder, setCurrentFolder] = useState<any>(Query.get("parent"));

  // * STATES

  const [openedCreateFolder, handlerCreateFolder] = useDisclosure(false);
  const [openedEditFolder, handlerEditFolder] = useDisclosure(false, {
    onOpen: () => {
      form.setFieldValue("name", currentFolder);
    },
  });

  const form = useForm({
    initialValues: {
      search: "",
      searchType: "",
    },
    validate: {
      search: (value) => value.length > 0 || "Search Value is required",
    },
  });

  // * PRESTATES

  const [searchType, setSearchType] = useState("");
  const [search, setSearch] = useState("");

  // * PRELOADING
  useEffect(() => {
    form.setFieldValue("searchType", Query.get("type") || "all");
    form.setFieldValue("search", Query.get("search"));
  }, []);

  // * FUNCTIONS

  const handleDelete = () => {
    modals.openConfirmModal({
      title: (
        <Group>
          <ActionIcon size="sm" color="red" variant="light">
            <Warning size={12} />
          </ActionIcon>
          <Text
            size="sm"
            style={{
              fontWeight: 600,
            }}
          >
            Please confirm your action
          </Text>
        </Group>
      ),
      children: (
        <Text size="xs" my="md">
          This action cannot be reverted.{" "}
          <span style={{ fontWeight: 600 }}>
            Are you sure you want to delete <b>{Query.get("parent")}</b>{" "}
            permanently?
          </span>
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red", size: "xs" },
      cancelProps: { size: "xs" },
      onCancel: () => {},
      onConfirm: async () => {
        triggerNotification.Form.isLoading();
        const res: any = await apiFileExplorer.del(Params.id);
        triggerNotification.Form.isSuccess();
        if (!res.err) {
          Router.back();
        }
      },
      styles: { header: { background: "var(--mantine-color-red-1)" } },
      size: "sm",
    });
  };

  return (
    <Paper px="md" py="sm" radius={0}>
      <Container size="xl">
        <Group justify="space-between">
          <Group>
            <Group gap="0">
              <ActionIcon
                color="brand"
                variant="subtle"
                onClick={() => {
                  Router.push("/explorer");
                }}
              >
                <ArrowLeft size={12} />
              </ActionIcon>
            </Group>

            <Stack gap={4}>
              <Breadcrumbs
                separator={
                  <CaretRight color="var(--mantine-color-gray-6)" size={10} />
                }
                separatorMargin={"4px"}
              >
                <Anchor size="xs" tt="capitalize">
                  <Folder weight="fill" />
                </Anchor>
                {Query.get("parent") && (
                  <Anchor size="xs" tt="capitalize" c="dark.5">
                    ...
                  </Anchor>
                )}
                {Query.get("parent") ? (
                  <Anchor size="xs" tt="capitalize" c="dark.5">
                    {currentFolder}
                  </Anchor>
                ) : (
                  <Anchor size="xs" tt="capitalize" c="dark.5">
                    Explore
                  </Anchor>
                )}
              </Breadcrumbs>
            </Stack>
          </Group>
          <Group gap={0}>
            <Select
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              radius={0}
              size="sm"
              data={[
                { value: "woda", label: "Woda Documents" },
                { value: "statement", label: "Statement Documents" },
              ]}
              placeholder="Search Type"
              {...form.getInputProps("searchType")}
            />

            <TextInput
              radius={0}
              w={400}
              placeholder="Search.."
              size="sm"
              {...form.getInputProps("search")}
            />
            <ActionIcon
              size="36"
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              onClick={() => {
                dispatch({
                  type: "UPDATE_SEARCH",
                  payload: form.values.search,
                });

                window.location.href =
                  "/explorer/search?search=" +
                  form.values.search +
                  "&type=" +
                  form.values.searchType;
              }}
            >
              <MagnifyingGlass />
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Paper>
  );
}
