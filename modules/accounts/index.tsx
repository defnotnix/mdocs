"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { Pen, Plus, Trash, Warning } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteUser, getUser } from "./accounts.api";
import { useDisclosure } from "@mantine/hooks";
import { ModuleAccount } from "./ModalUser";

import classes from "./account.module.css";
import { modals } from "@mantine/modals";
import { triggerNotification } from "@/components/helper/notification";
import { ModuleAccountEdit } from "./ModalUserEdit";

export function ModuleExploreAccount() {
  // * DEFINITION

  const [openForm, handlersForm] = useDisclosure(false);
  const [openFormEdit, handlersFormEdit] = useDisclosure(false);
  const [editData, setEditData] = useState({});

  const { data, refetch } = useQuery({
    queryKey: ["auth", "accounts"],
    queryFn: async () => {
      const res: any = await getUser();

      return res?.data;
    },
    initialData: [],
  });

  const handleDelete = (id: any) => {
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

        deleteUser(id)
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

  return (
    <>
      <Container size="sm" py="md">
        <Group justify="space-between">
          <div>
            <Text size="xl" fw={500}>
              Accounts
            </Text>
            <Text size="xs" opacity={0.5}>
              Organize accounts that can use this software.
            </Text>
          </div>
          <Group>
            <Button
              size="xs"
              leftSection={<Plus />}
              onClick={handlersForm.open}
            >
              New
            </Button>
          </Group>
        </Group>

        <Stack gap="2px" mt="xl">
          {data.map((item: any, index: number) => (
            <Paper key={index} p="sm" className={classes.usercard}>
              <Group justify="space-between">
                <Group>
                  <Avatar size="sm" name={item.name} color="initials" />
                  <div>
                    <Text size="xs">{item.name}</Text>
                    <Text size="10px" opacity={0.3}>
                      {item.username}
                    </Text>
                  </div>
                </Group>
                <Group gap={"xs"}>
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    onClick={() => {
                      handlersFormEdit.open();
                      setEditData(item);
                    }}
                  >
                    <Pen />
                  </ActionIcon>
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    color="red"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash />
                  </ActionIcon>
                </Group>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Container>

      <ModuleAccount
        refetch={refetch}
        opened={openForm}
        handlers={handlersForm}
      />

      <ModuleAccountEdit
        refetch={refetch}
        opened={openFormEdit}
        handlers={handlersFormEdit}
        initialData={editData}
      />
    </>
  );
}
