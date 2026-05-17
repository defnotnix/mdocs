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
      name: "",
    },
    validate: {
      name: (value) => value.length > 0 || "Folder name is required",
    },
  });

  // * PRESTATES

  // * PRELOADING

  // * FUNCTIONS

  const mutationCreate = useMutation({
    mutationFn: async () => {
      console.log("Initiating Create");

      triggerNotification.Form.isLoading();

      const res: any = await apiFileExplorer.create({
        name: form.values.name,
        parent: Params.id,
      });

      if (!res.err) {
      }

      return res;
    },
    onSuccess: (res: any) => {
      close();
      form.reset();
      handlerCreateFolder.close();
      //@ts-ignore
      queryClient.invalidateQueries(["explorer", Params.id]);

      triggerNotification.Form.isSuccess();
    },
    onError: (err) => {
      triggerNotification.Form.isError();
    },
  });

  const mutationEdit = useMutation({
    mutationFn: async () => {
      console.log("Initiating Edit");
      triggerNotification.Form.isLoading();

      const res: any = await apiFileExplorer.update(
        {
          name: form.values.name,
        },
        Params.id
      );

      if (!res.err) {
      }

      return res;
    },
    onSuccess: (res: any) => {
      close();
      form.reset();
      handlerEditFolder.close();
      //@ts-ignore
      queryClient.invalidateQueries(["explorer", Params.id]);
      setCurrentFolder(form.values.name);

      triggerNotification.Form.isSuccess();
    },
    onError: (err) => {
      triggerNotification.Form.isError();
    },
  });

  const handleDelete = () => {
    console.log("Initiating Delete");
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
                disabled={!Params.id}
                color="brand"
                variant="subtle"
                onClick={() => {
                  Router.back();
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
          <Group gap="xs">
            {/* <TextInput
            placeholder="Search.."
            size="xs"
            leftSection={<MagnifyingGlass />}
            {...form.getInputProps("name")}
          /> */}
            <Button
              size="xs"
              leftSection={<FilePlus />}
              variant="light"
              onClick={() => {
                Router.push("/explorer");
              }}
            >
              New Document
            </Button>

            <Popover
              withArrow
              trapFocus
              position="bottom"
              shadow="xl"
              opened={openedCreateFolder}
              onClose={handlerCreateFolder.close}
            >
              <Popover.Target>
                <Button
                  size="xs"
                  leftSection={<Plus />}
                  onClick={handlerCreateFolder.open}
                >
                  New Folder
                </Button>
              </Popover.Target>
              <Popover.Dropdown p="sm" w="300">
                <Stack gap="xs">
                  <TextInput
                    placeholder="Enter folder name"
                    label="Folder Name"
                    {...form.getInputProps("name")}
                  />
                  <Button
                    onClick={() => {
                      mutationCreate.mutate();
                    }}
                  >
                    Create
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>

            <Divider orientation="vertical" />
            <Popover
              withArrow
              trapFocus
              position="bottom"
              shadow="xl"
              opened={openedEditFolder}
              onClose={handlerEditFolder.close}
            >
              <Popover.Target>
                <Button
                  size="xs"
                  color="teal"
                  variant="light"
                  leftSection={<Pencil />}
                  onClick={handlerEditFolder.open}
                >
                  Edit
                </Button>
              </Popover.Target>
              <Popover.Dropdown p="sm" w="300">
                <Stack gap="xs">
                  <TextInput
                    placeholder="Enter folder name"
                    label="Folder Name"
                    {...form.getInputProps("name")}
                  />
                  <Button
                    onClick={() => {
                      mutationEdit.mutate();
                    }}
                  >
                    Update
                  </Button>
                </Stack>
              </Popover.Dropdown>
            </Popover>

            <Button
              disabled
              size="xs"
              color="red"
              variant="light"
              leftSection={<Trash />}
              onClick={() => handleDelete()}
            >
              Delete
            </Button>
          </Group>
        </Group>
      </Container>
    </Paper>
  );
}
