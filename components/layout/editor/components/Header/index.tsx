"use client";

import React, { useContext, useEffect } from "react";
//nextjs
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
//mantine
import {
  ActionIcon,
  Anchor,
  AppShell,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Group,
  Menu,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {} from "@mantine/hooks";
//icons
import {
  ArrowLeft,
  CaretDown,
  CaretRight,
  Folder,
  GearSix,
  Pencil,
  Plus,
  Power,
  User,
  Warning,
  Wrench,
  X,
} from "@phosphor-icons/react";
//styles
import classes from "./header.module.css";
//contexts
import { ContextEditor } from "../../editor.context";
//assets
import imgLogo from "@/assets/brand/logo.png";

import { modals } from "@mantine/modals";
import { LayoutEditorHeaderButtonSaveDocument } from "./SaveFile";

export function LayoutEditorHeader() {
  // * DEFINITIONS

  const Router = useRouter();
  const Pathname = usePathname();
  const Params = useParams();
  const Query: any = useSearchParams();

  // * CONTEXTS

  const { state, dispatch } = useContext(ContextEditor.Context);

  // * STATES

  // * PRELOADS

  // * FUNCTIONS

  // * COMPONENTS

  const HeaderLogo = () => (
    <UnstyledButton
      w={280}
      px="md"
      className={classes.headerlogo}
      onClick={() => {
        modals.openConfirmModal({
          title: (
            <Group>
              <ActionIcon size="sm" color="brand" variant="light">
                <Warning size={12} />
              </ActionIcon>
              <Text
                size="sm"
                style={{
                  fontWeight: 600,
                }}
              >
                Are you sure you want to go back?
              </Text>
            </Group>
          ),
          children: (
            <Text size="xs" my="md">
              This action cannot be reverted.{" "}
              <span style={{ fontWeight: 600 }}>
                All the progress on the editor will be lost, unless you have
                saved the document.
              </span>
            </Text>
          ),
          labels: { confirm: "Confirm", cancel: "Cancel" },
          confirmProps: { color: "brand", size: "xs" },
          cancelProps: { size: "xs" },
          onCancel: () => {},
          onConfirm: () => {
            Router.push("/explorer");
          },
          styles: {
            header: { background: "var(--mantine-color-brand-light)" },
          },
          size: "sm",
        });
      }}
    >
      <Group justify="space-between" gap="xs">
        <Group h={60} gap="xs">
          <Avatar size="xs" src={imgLogo.src} />
          <Text size="sm" fw={600}>
            Manabiya <b style={{ opacity: 0.5 }}>Docs.</b>
          </Text>
        </Group>

        <Badge size="xs" color="brand" variant="filled">
          v 1.0.2
        </Badge>
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
            modals.openConfirmModal({
              title: (
                <Group>
                  <ActionIcon size="sm" color="brand" variant="light">
                    <Warning size={12} />
                  </ActionIcon>
                  <Text
                    size="sm"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Are you sure you want to go back?
                  </Text>
                </Group>
              ),
              children: (
                <Text size="xs" my="md">
                  This action cannot be reverted.{" "}
                  <span style={{ fontWeight: 600 }}>
                    All the progress on the editor will be lost, unless you have
                    saved the document.
                  </span>
                </Text>
              ),
              labels: { confirm: "Confirm", cancel: "Cancel" },
              confirmProps: { color: "brand", size: "xs" },
              cancelProps: { size: "xs" },
              onCancel: () => {},
              onConfirm: () => {
                Router.back();
              },
              styles: {
                header: { background: "var(--mantine-color-brand-light)" },
              },
              size: "sm",
            });
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
          <Anchor size="10" tt="capitalize" c={"gray.6"}>
            Editor
          </Anchor>
          <Anchor size="10" tt="capitalize" c={"gray.6"}>
            Woda Documents
          </Anchor>
        </Breadcrumbs>
      </Stack>
    </Group>
  );

  return (
    <>
      <AppShell.Header className={classes.root}>
        <Group justify="space-between" pr="md">
          <Group gap={0}>
            <HeaderLogo />
            <HeaderBreadcrumbs />
          </Group>

          {Query.get("type") != "ReadOnly" && (
            <Group gap="xs">
              <Button
                size="xs"
                leftSection={state.formView ? <X /> : <Pencil />}
                onClick={() => {
                  dispatch({
                    type: "TOGGLE_FORM_VIEW",
                  });
                }}
              >
                {state.formView ? "Back to Form" : "Edit Details"}
              </Button>
              <LayoutEditorHeaderButtonSaveDocument />
            </Group>
          )}
        </Group>
      </AppShell.Header>
    </>
  );
}
