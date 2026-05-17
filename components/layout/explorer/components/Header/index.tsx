"use client";

import React from "react";
//next
import { useParams, useRouter, usePathname } from "next/navigation";
//mantine
import {
  ActionIcon,
  Anchor,
  AppShell,
  Avatar,
  Badge,
  Breadcrumbs,
  Container,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
//icons
import { ArrowLeft, CaretRight, Folder } from "@phosphor-icons/react";
//context
import { ContextExplorer } from "../../explorer.contex";
//assets
import imgLogo from "@/assets/brand/logo.png";
//styles
import classes from "./header.module.css";
import cx from "clsx";
//components
import { HeaderUserMenu } from "@/components/ui/HeaderUserMenu";

export function Header() {
  // * DEFINITIONS

  const { id } = useParams();
  const Router = useRouter();
  const Pathname = usePathname();

  // * PRE STATES

  // * CONTEXTS

  const { state, dispatch } = React.useContext(ContextExplorer.Context);

  // * STATES

  // * PRELOADING

  // * FUNCTIONS

  // * COMPONENTS

  const HeaderLogo = () => (
    <UnstyledButton
      w={280}
      px="md"
      className={classes.headerlogo}
      onClick={() => {
        Router.push("/explorer");
      }}
    >
      <Group justify="space-between" gap="xs">
        <Group h={60} gap="xs">
          <Avatar size="xs" src={imgLogo.src} />
          <Text size="sm" fw={600}>
            Manabiya <b style={{ opacity: 0.5 }}>Docs.</b>
          </Text>
        </Group>
      </Group>
    </UnstyledButton>
  );

  const HeaderBreadcrumbs = () => (
    <Group px="md">
      <Group h={60} gap="0">
        <ActionIcon
          color="white"
          variant="subtle"
          onClick={() => {
            Router.back();
          }}
        >
          <ArrowLeft size={12} />
        </ActionIcon>
      </Group>

      <Stack gap={4}>
        <Text size="xs">New Document</Text>
        <Breadcrumbs
          separator={
            <CaretRight color="var(--mantine-color-gray-6)" size={10} />
          }
          separatorMargin={"4px"}
        >
          <Anchor size="10" tt="capitalize" c={"gray.5"}>
            <Folder weight="fill" />
          </Anchor>
          <Anchor size="10" tt="capitalize" c={"gray.0"}>
            Explore
          </Anchor>
        </Breadcrumbs>
      </Stack>
    </Group>
  );

  return (
    <AppShell.Header className={classes.root}>
      <Container size="xl">
        <SimpleGrid cols={3}>
          <HeaderLogo />

          <Group justify="center" gap={0}>
            <UnstyledButton
              key={1}
              className={cx(classes.headerbutton, {
                [classes.headerbutton_active]:
                  !Pathname.includes("/view") &&
                  !Pathname.includes("/accounts"),
              })}
              onClick={() => {
                Router.push("/explorer");
              }}
            >
              <Text size="xs">Home</Text>
            </UnstyledButton>
            <UnstyledButton
              key={2}
              className={cx(classes.headerbutton, {
                [classes.headerbutton_active]:
                  Pathname.includes("/explorer/view"),
              })}
              onClick={() => {
                Router.push("/explorer/view");
              }}
            >
              <Text size="xs">File Explorer</Text>
            </UnstyledButton>
            <UnstyledButton
              key={3}
              className={cx(classes.headerbutton, {
                [classes.headerbutton_active]:
                  Pathname.includes("/explorer/accounts"),
              })}
              onClick={() => {
                Router.push("/explorer/accounts");
              }}
            >
              <Text size="xs">Accounts</Text>
            </UnstyledButton>
          </Group>

          <Group justify="flex-end">
            <HeaderUserMenu />
          </Group>
        </SimpleGrid>
      </Container>
    </AppShell.Header>
  );
}
