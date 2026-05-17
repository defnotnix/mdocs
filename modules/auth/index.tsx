"use client";

import React from "react";
//mantine
import {
  Alert,
  Anchor,
  Badge,
  Button,
  Checkbox,
  Container,
  Grid,
  Group,
  Image,
  Menu,
  Paper,
  PasswordInput,
  SimpleGrid,
  Space,
  Text,
  TextInput,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
//icons
import {} from "@tabler/icons-react";
import {
  CaretDown,
  Check,
  Info,
  Warning,
  X,
  User,
  Key,
} from "@phosphor-icons/react";
//styles
import classes from "./login.module.css";
//api
import { useMutation, useQuery } from "@tanstack/react-query";
//notification
import { triggerNotification } from "@/components/helper/notification";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { makeLogin } from "./auth.api";
//context

//img
import imgLogo from "@/assets/brand/logo.png";

export function ModuleLogin() {
  // * DEFINITIONS

  const Router = useRouter();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      fLoading: false,
      remember: false,
    },
  });

  // * PRE STATES

  // * CONTEXT

  // * STATES

  // * FUNCTIONS

  function api(value: any) {}

  const handleRememberMe = () => {};

  const mutation = useMutation({
    mutationFn: async () => {
      form.setFieldValue("fLoading", true);
      triggerNotification.Login.isLoading();
      const res = await makeLogin(form.values);

      return res;
    },
    onSuccess: (res: any) => {
      sessionStorage.setItem("doctoken", res?.data?.access_token || "");

      if (form.values.remember) {
        handleRememberMe();
      }

      form.setFieldValue("fLoading", false);
      triggerNotification.Login.isSuccess();
      setTimeout(() => {
        Router.push("/explorer");
      }, 100);
    },
    onError: (err) => {
      form.setFieldValue("fLoading", false);
      triggerNotification.Login.isError();
    },
  });

  function handleSignIn() {
    mutation.mutate();
  }

  // * COMPONENTS

  const RenderAlert = () => {
    const errorType: string = "";

    switch (errorType) {
      case "info":
        return (
          <Alert py="xs" color="blue" icon={<Info weight="bold" />}>
            <Text size="xs" c="blue.8" fw={500} py="2">
              Server under Maintainance, Try Later!
            </Text>
          </Alert>
        );
      case "pending":
        return (
          <Alert py="xs" color="indigo" icon={<Info weight="bold" />}>
            <Text size="xs" c="indigo.8" fw={500} py="2">
              Verification Pending, Try Later!
            </Text>
          </Alert>
        );
      case "blocked":
        return (
          <Alert py="xs" color="red" icon={<X weight="bold" />}>
            <Text size="xs" c="red.8" fw={500} py="2">
              Account Blocked! Contact Admin
            </Text>
          </Alert>
        );
      default:
        return (
          <Alert py="xs" color="red" icon={<Warning weight="bold" />}>
            <Text size="xs" c="red.8" fw={500} py="2">
              Invalid Credentials. Try Again!
            </Text>
          </Alert>
        );
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Container size="sm" pt={{ base: 100, lg: 160 }}>
          <Paper withBorder p="xl">
            <Grid>
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <Group>
                  <Image h={24} w={24} alt="icon" src={imgLogo.src} />

                  <Text size="xs">
                    Manabiya <b>Docs</b>
                  </Text>
                </Group>

                <Space h="md" />

                <Text size={"xl"}>Sign In.</Text>
                <Text size="xs" c="gray.7">
                  Access your admin portal.
                </Text>
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <form>
                  <SimpleGrid spacing="xs">
                    <TextInput
                      disabled={form.values.fLoading}
                      variant="filled"
                      size="lg"
                      placeholder="Email Address"
                      leftSection={<User size={12} />}
                      {...form.getInputProps("username")}
                    />
                    <PasswordInput
                      disabled={form.values.fLoading}
                      variant="filled"
                      size="lg"
                      placeholder="Enter Password"
                      leftSection={<Key size={12} />}
                      {...form.getInputProps("password")}
                    />
                    {mutation.isError && <RenderAlert />}
                  </SimpleGrid>

                  <Group justify="space-between" my="lg">
                    <Group gap="xs">
                      {/* <Text size="xs">Stay signed in</Text> */}
                    </Group>

                    <Anchor>
                      <Text size="xs" c="brand" fw={500}>
                        Forgot password?
                      </Text>
                    </Anchor>
                  </Group>

                  <Group justify="flex-end">
                    <Button
                      loading={form.values.fLoading}
                      color={mutation.isSuccess ? "teal" : "brand"}
                      size="md"
                      styles={{
                        loader: {
                          fontSize: 16,
                        },
                      }}
                      fs="xs"
                      onClick={() => {
                        if (!mutation.isSuccess) {
                          handleSignIn();
                        }
                      }}
                      leftSection={mutation.isSuccess && <Check />}
                    >
                      {mutation.isSuccess ? "Welcome Back!" : "Sign In"}
                    </Button>
                  </Group>
                </form>
              </Grid.Col>
            </Grid>
          </Paper>

          <Space h="sm" />

          <Group justify="space-between" px="sm">
            <Group gap="xs">
              <Text size="11" lh={5} fw={900} c="gray.0">
                vFramework
              </Text>
              <Menu>
                <Menu.Target>
                  <UnstyledButton>
                    <Badge variant="light" color="dark.2" c="gray.0" size="lg">
                      <Group gap={3}>
                        <Text fw={500} size="11" lh={5} tt="none">
                          English (United States)
                        </Text>
                        <CaretDown size="11" />
                      </Group>
                    </Badge>
                  </UnstyledButton>
                </Menu.Target>
              </Menu>
            </Group>

            <Group gap="xs">
              <Anchor>
                <Text size="11" lh={5} fw={500} c="gray.0">
                  Help
                </Text>
              </Anchor>
              <Anchor>
                <Text size="11" lh={5} fw={500} c="gray.0">
                  Privacy
                </Text>
              </Anchor>
              <Anchor>
                <Text size="11" lh={5} fw={500} c="gray.0">
                  Terms
                </Text>
              </Anchor>
            </Group>
          </Group>
        </Container>
      </div>
    </>
  );
}
