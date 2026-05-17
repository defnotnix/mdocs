/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { apiFileExplorer } from "@/api/folder";
import {
  ActionIcon,
  Button,
  ButtonGroup,
  Center,
  Grid,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  CaretDown,
  CaretLeft,
  FilePdf,
  FloppyDisk,
  FolderOpen,
  FolderPlus,
  Plus,
} from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classes from "./save.module.css";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { triggerNotification } from "@/components/helper/notification";
import { usePathname } from "next/navigation";
import {
  createRecordStatement,
  createRecordWoda,
  updateRecordStatement,
  updateRecordWoda,
} from "@/api/file";
import { ContextEditor } from "@/components/layout/editor/editor.context";
import { FormHandler } from "@/components/framework/FormHandler";

export function LayoutEditorHeaderButtonSaveDocument() {
  const Pathname = usePathname();

  const [parent, setParent] = useState<any>(null);
  const [folderHistory, setFolderHistory] = useState<any[]>([]);

  const { state, dispatch } = useContext(ContextEditor.Context);

  const [filename, setFilename] = useState("");

  const form = useForm({});
  const _form = FormHandler.useForm();

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState<any>({
    folders: [],
    statements: [],
    woda: [],
  });

  const [opened, handlers] = useDisclosure(false, {});

  const mutateFolderCreate = useMutation({
    mutationFn: async () => {
      triggerNotification.Form.isLoading();

      const res: any = await apiFileExplorer.create({
        name: form.values.foldername,
        parent: parent,
      });

      if (!res.err) {
      }

      return res;
    },
    onSuccess: (res: any) => {
      modals.closeAll();
      close();

      form.reset();
      //@ts-ignore
      reloadData(parent);
      triggerNotification.Form.isSuccess();
    },
    onError: (err) => {
      triggerNotification.Form.isError();
    },
  });

  const mutationFileCreate = useMutation({
    mutationFn: async () => {
      triggerNotification.Form.isLoading();

      const res: any = Pathname.includes("/editor/woda/")
        ? await createRecordWoda({
            name: form.values.filename,
            folder: parent,
            template: JSON.stringify({
              ...state,
              signature: [],
              details: _form.values,
              docinfo: undefined,
            }),
            type: "woda",
            municipality: form.values.extra,
          })
        : await createRecordStatement({
            name: form.values.filename,
            folder: parent,
            template: JSON.stringify({
              ...state,
              signature: [],
              details: _form.values,
              docinfo: undefined,
            }),
            type: "statement",
            bank: form.values.extra,
          });

      if (!res.err) {
        dispatch({
          type: "SET_DOCINFO",
          payload: res.data,
        });
      }

      return res;
    },
    onSuccess: (res: any) => {
      handlers.close();

      form.reset();
      //@ts-ignore
      reloadData(parent);
      triggerNotification.Form.isSuccess();
    },
    onError: (err) => {
      triggerNotification.Form.isError();
    },
  });

  const mutationFileUpdate = useMutation({
    mutationFn: async () => {
      triggerNotification.Form.isLoading();

      const res: any = Pathname.includes("/editor/woda/")
        ? await updateRecordWoda(
            {
              template: JSON.stringify({
                ...state,
                signature: [],
                details: _form.values,
                docinfo: undefined,
              }),
              type: "woda",
              municipality: form.values.extra,
            },
            state.docinfo.id
          )
        : await updateRecordStatement(
            {
              template: JSON.stringify({
                ...state,
                signature: [],
                details: _form.values,
                docinfo: undefined,
              }),
              type: "statement",
              bank: form.values.extra,
            },
            state.docinfo.id
          );

      if (!res.err) {
        dispatch({
          type: "SET_DOCINFO",
          payload: res.data,
        });
      }

      return res;
    },
    onSuccess: (res: any) => {
      handlers.close();

      form.reset();
      //@ts-ignore
      reloadData(parent);
      triggerNotification.Form.isSuccess({
        message: "Changes saved to the file",
      });
    },
    onError: (err) => {
      triggerNotification.Form.isError();
    },
  });

  const reloadData: any = async (pid: any) => {
    setLoading(true);

    const res: any = await apiFileExplorer.get({
      parent: pid ? pid : Pathname.includes("/editor/woda/") ? "2" : "1",
    });

    setData(
      res.err
        ? []
        : Array.isArray(res.data)
        ? {
            folders: res.data.map((item: any) => {
              return {
                ...item,
                icon: FolderOpen,
                url:
                  "/explore/view/" +
                  item.name.replace(" ", "+") +
                  "?parent=" +
                  item.id,
              };
            }),
          }
        : {
            folders: res.data?.children?.map((item: any) => {
              return {
                ...item,
                icon: FolderOpen,
                url:
                  "/explore/view/" +
                  item.name.replace(" ", "+") +
                  "?parent=" +
                  item.id,
              };
            }),
            statements: res.data?.statements?.map((item: any) => {
              return {
                ...item,
                id: item.id,
                label: item.name,
                icon: FilePdf,
                description: "Woda Documents",
                url: "/editor/statement/view/" + item.id,
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
                url: "/editor/statement/view/" + item.id,
                color: "teal",
              };
            }),
          }
    );

    setLoading(false);
  };

  useEffect(() => {
    reloadData();
    setParent(
      !parent ? (Pathname.includes("/editor/woda/") ? "2" : "1") : parent
    );
  }, []);

  return (
    <>
      {state?.docinfo?.name ? (
        <ButtonGroup>
          <Button
            color="teal.7"
            size="xs"
            onClick={() => {
              mutationFileUpdate.mutate();
            }}
            leftSection={<FloppyDisk />}
          >
            Save Changes
          </Button>
          <Tooltip label="Save as New Document">
            <Button
              color="indigo.9"
              size="xs"
              onClick={() => {
                handlers.open();
              }}
            >
              Save As
            </Button>
          </Tooltip>
        </ButtonGroup>
      ) : (
        <Button
          color="teal.7"
          size="xs"
          onClick={() => {
            handlers.open();
          }}
          leftSection={<FloppyDisk />}
        >
          Save Document
        </Button>
      )}

      <Modal
        styles={{
          body: {
            padding: 0,
          },
        }}
        title={
          <Group>
            <ActionIcon
              disabled={folderHistory.length == 0}
              size="sm"
              variant="light"
              onClick={async () => {
                setParent(folderHistory.slice(-1)[0]);
                setFolderHistory(folderHistory.slice(0, -1));
                reloadData(folderHistory.slice(-1)[0]);
              }}
            >
              <CaretLeft />
            </ActionIcon>
            <Text size="xs" tt="uppercase">
              Save Document
            </Text>
          </Group>
        }
        opened={opened}
        onClose={handlers.close}
        size="xl"
      >
        <Paper bg="var(--mantine-color-brand-light)" pos="relative">
          <LoadingOverlay visible={loading} />
          <ScrollArea h={500}>
            <AnimatePresence>
              <SimpleGrid cols={4} p="md" spacing="xs">
                <Paper
                  withBorder
                  px="md"
                  py="sm"
                  className={classes.foldercard}
                  bg="none"
                  onClick={async () => {
                    modals.open({
                      title: "Subscribe to newsletter",
                      children: (
                        <>
                          <TextInput
                            label="Folder Name"
                            placeholder="Enter Folder Name"
                            data-autofocus
                            {...form.getInputProps("foldername")}
                          />
                          <Button
                            fullWidth
                            onClick={() => {
                              mutateFolderCreate.mutate();
                            }}
                            mt="md"
                          >
                            Create
                          </Button>
                        </>
                      ),
                    });
                  }}
                >
                  <Stack gap="md">
                    <Center>
                      <FolderPlus
                        weight="duotone"
                        color={`var(--mantine-color-${"brand"}-6)`}
                        size={100}
                      />
                    </Center>
                    <Stack gap="4px" mb="sm">
                      <Text size="xs" fw={600} ta="center">
                        New Folder
                      </Text>
                    </Stack>
                  </Stack>
                </Paper>

                {data?.folders?.map((item: any, index: number) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      key={index}
                    >
                      <Paper
                        withBorder
                        px="md"
                        py="sm"
                        className={classes.foldercard}
                        onClick={async () => {
                          setFolderHistory([...folderHistory, parent]);
                          setParent(item.id);
                          reloadData(item.id);
                        }}
                      >
                        <Stack gap="md">
                          <Center>
                            <item.icon
                              weight="fill"
                              color={`var(--mantine-color-${
                                item.color || "brand"
                              }-6)`}
                              size={100}
                            />
                          </Center>
                          <Stack gap="4px" mb="sm">
                            <Text size="xs" fw={600} ta="center">
                              {item.name}
                            </Text>
                          </Stack>
                        </Stack>
                      </Paper>
                    </motion.div>
                  );
                })}

                {data?.woda?.map((item: any, index: number) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      key={index}
                    >
                      <Paper
                        opacity={0.5}
                        withBorder
                        px="md"
                        py="sm"
                        className={classes.foldercard}
                      >
                        <Stack gap="md">
                          <Center>
                            <item.icon
                              weight="fill"
                              color={`var(--mantine-color-${
                                item.color || "brand"
                              }-6)`}
                              size={100}
                            />
                          </Center>
                          <Stack gap="4px" mb="sm">
                            <Text size="xs" fw={600} ta="center">
                              {item.name.substring(0, 10)}
                              {item?.name?.length > 10 ? "..." : ""}
                            </Text>
                          </Stack>
                        </Stack>
                      </Paper>
                    </motion.div>
                  );
                })}

                {data?.statements?.map((item: any, index: number) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 24 }}
                      key={index}
                    >
                      <Paper
                        opacity={0.5}
                        withBorder
                        px="md"
                        py="sm"
                        className={classes.foldercard}
                      >
                        <Stack gap="md">
                          <Center>
                            <item.icon
                              weight="fill"
                              color={`var(--mantine-color-${
                                item.color || "brand"
                              }-6)`}
                              size={100}
                            />
                          </Center>
                          <Stack gap="4px" mb="sm">
                            <Text size="xs" fw={600} ta="center">
                              {item.name.substring(0, 10)}
                              {item?.name?.length > 10 ? "..." : ""}
                            </Text>
                          </Stack>
                        </Stack>
                      </Paper>
                    </motion.div>
                  );
                })}
              </SimpleGrid>
            </AnimatePresence>
          </ScrollArea>
        </Paper>
        <Paper p="md">
          <Text size="xs" fw={700} tt="uppercase" mb="sm">
            Save at current location
          </Text>
          <Grid gutter="xs">
            <Grid.Col span={4.5}>
              <TextInput
                label="Save file as"
                placeholder="Enter File Name"
                {...form.getInputProps("filename")}
              />
            </Grid.Col>
            <Grid.Col span={4.5}>
              <TextInput
                label={
                  Pathname.includes("/editor/woda/") ? "Municipality" : "Bank"
                }
                placeholder={
                  Pathname.includes("/editor/woda/") ? "Municipality" : "Bank"
                }
                {...form.getInputProps("extra")}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <Button
                fullWidth
                leftSection={<FloppyDisk />}
                disabled={!parent}
                mt="24px"
                onClick={() => {
                  mutationFileCreate.mutate();
                }}
              >
                Save Document
              </Button>
            </Grid.Col>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}
