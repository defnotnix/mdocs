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
  Drawer,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  Popover,
  ScrollArea,
  SimpleGrid,
  Skeleton,
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
  Info,
  MagnifyingGlass,
  Plus,
  Trash,
  Warning,
} from "@phosphor-icons/react";
//components

//styles
import classes from "../explorer.module.css";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";
import { triggerNotification } from "@/components/helper/notification";
import { useDisclosure } from "@mantine/hooks";

import { apiFile } from "@/api/file";
import { getStatementHistory, getWodaHistory } from "../explorer.api";

export function RenderCards({
  data = [],
  refetch,
}: {
  data: any;
  refetch: any;
}) {
  // * DEFINITIONS

  const { id } = useParams();
  const Router = useRouter();
  const Pathname = usePathname();
  const Params = useParams();
  const { showContextMenu } = useContextMenu();

  // * CONTEXTS

  const { state, dispatch } = React.useContext(ContextExplorer.Context);

  // * STATES

  const [details, setDetails] = useState<any>({});

  const [history, setHistory] = useState<any>([]);

  const [openedCreateFolder, handlerCreateFolder] = useDisclosure(false);

  const [type, setType] = useState("woda");

  const [search, setSearch] = useState("");
  const [opened, { open, close }] = useDisclosure(false, {
    onClose: () => {
      setSearch("");
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

  const handleDrawerOpenWoda = async (id: any, url: string) => {
    const data = await apiFile.woda.get(id);
    const history = await getWodaHistory(id);

    setDetails({
      ...(await data),
      url,
    });

    setHistory(history);

    open();
  };

  const handleDrawerOpenStatement = async (id: any, url: string) => {
    const data = await apiFile.statement.get(id);
    const history = await getStatementHistory(id);

    setDetails({
      ...(await data),
      url,
    });

    setHistory(history);

    open();
  };

  useEffect(() => {}, [data]);

  const handleDeleteWoda = (id: string) => {
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
            Are you sure you want to proceed?
          </span>
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red", size: "xs" },
      cancelProps: { size: "xs" },
      onCancel: () => {},
      onConfirm: () => {
        triggerNotification.Form.isLoading();

        apiFile.woda
          .del(id)
          .then((res: any) => {
            triggerNotification.Form.isSuccess();
            refetch();
            close();
          })
          .catch((err: any) => {
            triggerNotification.Form.isError();
          });
      },
      styles: { header: { background: "var(--mantine-color-red-1)" } },
      size: "sm",
    });
  };

  const handleDeleteStatement = (id: string) => {
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
            Are you sure you want to proceed?
          </span>
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red", size: "xs" },
      cancelProps: { size: "xs" },
      onCancel: () => {},
      onConfirm: () => {
        triggerNotification.Form.isLoading();

        apiFile.statement
          .del(id)
          .then((res: any) => {
            triggerNotification.Form.isSuccess();
            refetch();
            close();
          })
          .catch((err: any) => {
            triggerNotification.Form.isError();
          });
      },
      styles: { header: { background: "var(--mantine-color-red-1)" } },
      size: "sm",
    });
  };

  // * COMPONENTS

  const FolderCard = ({ fdetails }: any) => {
    return (
      <Paper
        key={fdetails.id}
        withBorder
        px="md"
        py="sm"
        className={classes.foldercard}
        onClick={() => {
          Router.push(fdetails.url);
        }}
      >
        <Center>
          <fdetails.icon
            weight="fill"
            color={`var(--mantine-color-brand-6)`}
            size={100}
          />
        </Center>
        <Stack gap="4px" mb="sm">
          <Text size="xs" fw={600} ta="center">
            {fdetails.name}
          </Text>
        </Stack>
      </Paper>
    );
  };

  const FileCardWoda = ({ fdetails }: any) => {
    return (
      <Paper
        key={fdetails.id}
        withBorder
        px="md"
        py="sm"
        className={classes.foldercard}
        onClick={() => {
          handleDrawerOpenWoda(fdetails.id, fdetails.url);
          setType("woda");
        }}
      >
        <Center>
          <fdetails.icon
            weight="fill"
            color={`var(--mantine-color-teal-6)`}
            size={100}
          />
        </Center>
        <Stack gap="4px" mb="sm">
          <Text size="10px" fw={600} ta="center" opacity={0.5}>
            Woda Document
          </Text>
          <Text size="xs" fw={600} ta="center">
            {fdetails.name} ({fdetails.municipality})
          </Text>
        </Stack>
      </Paper>
    );
  };

  const FileCardStatement = ({ fdetails }: any) => {
    return (
      <Paper
        key={fdetails.id}
        withBorder
        px="md"
        py="sm"
        className={classes.foldercard}
        onClick={(e) => {
          handleDrawerOpenStatement(fdetails.id, fdetails.url);
          setType("statement");
        }}
      >
        <Center>
          <fdetails.icon
            weight="fill"
            color={`var(--mantine-color-orange-6)`}
            size={100}
          />
        </Center>
        <Stack gap="4px" mb="sm">
          <Text size="10px" fw={600} ta="center" opacity={0.5}>
            Statement Document
          </Text>
          <Text size="xs" fw={600} ta="center">
            {fdetails.name} {fdetails.bank}
          </Text>
        </Stack>
      </Paper>
    );
  };

  const RenderFolder = data?.folders?.map((item: any, index: number) => {
    return <FolderCard key={"fd" + index} fdetails={item} />;
  });

  const RenderWodaDocs = data?.woda?.map((item: any, index: number) => {
    return (
      <FileCardWoda
        key={"woda" + index}
        fdetails={{
          ...item,
          type: "woda",
        }}
      />
    );
  });

  const RenderStatementDocs = data?.statements?.map(
    (item: any, index: number) => {
      return (
        <FileCardStatement
          key={"st" + index}
          fdetails={{
            ...item,
            type: "statement",
          }}
        />
      );
    }
  );

  return (
    <div>
      <SimpleGrid cols={6} p="md" spacing="xs">
        {RenderFolder}
        {RenderWodaDocs}
        {RenderStatementDocs}
      </SimpleGrid>

      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title={<Text size="xs">Details</Text>}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <Stack gap={0}>
          <Tabs defaultValue={"docs"}>
            <Tabs.List bg="gray.0">
              <Tabs.Tab value="docs" py="md">
                <Text size="xs">Available Documents</Text>
              </Tabs.Tab>
              <Tabs.Tab value="history" py="md">
                <Text size="xs">Print History</Text>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="docs">
              <ScrollArea h="calc(100vh - 153px)">
                {details?.template?.details?.setinfo?.allItems
                  ?.filter((e: any) => {
                    return details?.template?.details?.setinfo?.items?.includes(
                      e.value
                    );
                  })
                  ?.map((docinfo: any, index: number) => (
                    <Paper p="md" className={classes.doccard} key={index}>
                      <Group>
                        <FilePdf
                          weight="fill"
                          color="var(--mantine-color-teal-6)"
                        />
                        <div>
                          <Text size="xs">{docinfo.label}</Text>
                        </div>
                      </Group>
                    </Paper>
                  ))}
              </ScrollArea>
            </Tabs.Panel>

            <Tabs.Panel value="history">
              <ScrollArea h="calc(100vh - 153px)">
                {history.map((docinfo: any, index: number) => (
                  <Paper
                    p="md"
                    className={classes.historycard}
                    key={index}
                    onClick={() => {
                      modals.openConfirmModal({
                        title: (
                          <Group>
                            <ActionIcon size="sm" color="brand" variant="light">
                              <Info size={12} />
                            </ActionIcon>
                            <Text
                              size="sm"
                              style={{
                                fontWeight: 600,
                              }}
                            >
                              View History?
                            </Text>
                          </Group>
                        ),
                        children: (
                          <Text size="xs" my="md">
                            Open Editor View?.{" "}
                            <span style={{ fontWeight: 600 }}>
                              You will be redirected to the editor view of this
                              print.
                            </span>
                          </Text>
                        ),
                        labels: { confirm: "Confirm", cancel: "Cancel" },
                        confirmProps: { color: "brand", size: "xs" },
                        cancelProps: { size: "xs" },
                        onCancel: () => {},
                        onConfirm: () => {
                          Router.push(details.url + "?type=ReadOnly");
                        },
                        styles: {
                          header: {
                            background: "var(--mantine-color-brand-light)",
                          },
                        },
                        size: "sm",
                      });
                    }}
                  >
                    <Group>
                      <FilePdf
                        weight="fill"
                        color="var(--mantine-color-teal-6)"
                      />
                      <Stack gap={4}>
                        <Text size="xs">{docinfo.name}</Text>
                        <Text size="10px" opacity={0.5}>
                          {String(new Date(docinfo.createdat)).substring(0, 25)}
                        </Text>
                      </Stack>
                    </Group>
                  </Paper>
                ))}
              </ScrollArea>
            </Tabs.Panel>
          </Tabs>
        </Stack>

        <SimpleGrid spacing={0} cols={2}>
          <Button
            fullWidth
            radius={0}
            variant="fill"
            color=""
            size="md"
            rightSection={<ArrowRight />}
            onClick={() => {
              Router.push(details.url);
            }}
          >
            View in Document View
          </Button>
          <Button
            color="red"
            fullWidth
            radius={0}
            variant="light"
            size="md"
            rightSection={<Trash />}
            onClick={() => {
              if (type === "woda") {
                handleDeleteWoda(details.id);
              } else {
                handleDeleteStatement(details.id);
              }
            }}
          >
            Delete Document
          </Button>
        </SimpleGrid>
      </Drawer>
    </div>
  );
}
