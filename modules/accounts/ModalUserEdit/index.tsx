"use client";

import React, { useContext, useEffect, useState } from "react";
//mantine
import {
  Button,
  Divider,
  Group,
  Modal,
  PasswordInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
//icons
import { Check, FilePdf, Hash } from "@phosphor-icons/react";
//context

//config
import { configTemplateInfo } from "@/components/templates";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { createUser, updateUser } from "../accounts.api";
import { triggerNotification } from "@/components/helper/notification";

export function ModuleAccountEdit({
  opened,
  handlers,
  refetch,
  initialData,
}: {
  opened: boolean;
  handlers: any;
  refetch: any;
  initialData: any;
}) {
  // * DEFINITIONS

  const form = useForm({
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) =>
        value.length < 4 ? "Username must have at least 4 letters" : null,
      password: (value) =>
        value.length < 6 ? "Password must have at least 6 letters" : null,
    },
  });

  // * CONTEXT

  const [activeSet, setActiveSet] = useState<any>(undefined);
  const [folders, setFolders] = useState<any[]>([]);

  const Params: any = useParams();

  // * FUNCTIONS

  const handleSubmit = () => {
    triggerNotification.Form.isLoading();
    updateUser(form.values, initialData.id)
      .then(() => {
        triggerNotification.Form.isSuccess();
        handlers.close();
        form.reset();
        refetch();
      })
      .catch((err) => {
        triggerNotification.Form.isError();
      });
  };

  const handleClose = () => {
    form.reset();
    handlers.close();
  };

  useEffect(() => {
    form.setValues({
      ...initialData,
      password: undefined,
    });
  }, [initialData]);

  return (
    <Modal
      title={
        <Text size="sm" tt="uppercase" fw={600}>
          <span style={{ opacity: 0.5 }}>CREATE</span> ACCOUNT
        </Text>
      }
      opened={opened}
      onClose={handleClose}
      styles={{
        header: {
          background: "var(--mantine-color-gray-1)",
        },
      }}
    >
      <Stack gap="xs" py="md">
        <Text size="xs" fw={700} tt="uppercase">
          USER DETAILS
        </Text>

        <TextInput
          label="Full Name"
          description="Enter user's full name."
          placeholder="e.g. John Doe"
          {...form.getInputProps("name")}
        />

        <TextInput
          type="email"
          label="Email Address"
          description="Enter user's email address."
          placeholder="e.g. john@gmail.com"
          {...form.getInputProps("email")}
        />

        <TextInput
          label="Username"
          description="Authentication Username"
          placeholder="e.g. johndoe"
          {...form.getInputProps("username")}
        />

        <PasswordInput
          label="Password"
          description="Enter password to force password change."
          placeholder="Enter Password"
          {...form.getInputProps("password")}
        />
      </Stack>

      <Group justify="flex-end" mt="xl">
        <Button
          disabled={
            !form.values.name && !form.values.username && !form.values.password
          }
          size="xs"
          leftSection={<Check />}
          onClick={() => {
            handleSubmit();
          }}
        >
          Save Changes
        </Button>
      </Group>
    </Modal>
  );
}
