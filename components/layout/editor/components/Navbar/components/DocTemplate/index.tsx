"use client";

import React, { useContext, useEffect, useState } from "react";
//nextjs
import { useParams, usePathname, useRouter } from "next/navigation";
//mantine
import {
  ActionIcon,
  AppShell,
  Button,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {} from "@mantine/hooks";
//icons
import { CaretRight, FilePdf, Pen, Scroll, User } from "@phosphor-icons/react";
//styles
import classes from "./doc.module.css";
//contexts
import { ContextEditor } from "../../../../editor.context";
import { FormHandler } from "@/components/framework/FormHandler";

export function LayoutEditorNavbarDocTemplate() {
  // * DEFINITIONS

  const Router = useRouter();
  const Pathname = usePathname();
  const Params = useParams();

  // * CONTEXTS

  const { state, dispatch } = useContext(ContextEditor.Context);

  // * STATES

  const form = FormHandler.useForm();

  // * PRELOADS

  // * FUNCTIONS

  // * COMPONENTS

  useEffect(() => {}, [form.values.setinfo]);

  return (
    <>
      <AppShell.Section>
        <Stack gap="0">
          {form.values?.setinfo && (
            <Paper
              radius={0}
              px="sm"
              py="xs"
              className={classes.pagecard}
              onClick={() => {
                dispatch({
                  type: "SHOW_TEMPLATE",
                  payload: "docall-" + form.values?.setinfo?.value,
                });
              }}
            >
              <Grid gutter={0} align="center">
                <Grid.Col span={1.5}>
                  <FilePdf
                    weight={
                      state.active == "docall-" + form.values?.setinfo?.value
                        ? "fill"
                        : undefined
                    }
                    color={
                      state.active == "docall-" + form.values?.setinfo?.value
                        ? "var(--mantine-color-brand-5)"
                        : ""
                    }
                  />
                </Grid.Col>
                <Grid.Col span={8.5}>
                  <Text size="xs">All Documents</Text>
                </Grid.Col>
              </Grid>
            </Paper>
          )}

          {form.values?.setinfo?.allItems?.map((item: any, index: number) => {
            if (form.values.setinfo?.items?.includes(item.value)) {
              const _pageIsActive = state.active == item.value;

              return (
                <Paper
                  radius={0}
                  key={index}
                  px="sm"
                  py="xs"
                  className={classes.pagecard}
                  onClick={() => {
                    dispatch({
                      type: "SHOW_TEMPLATE",
                      payload: item.value,
                    });
                  }}
                >
                  <Grid gutter={0} align="center">
                    <Grid.Col span={1.5}>
                      <FilePdf
                        weight={_pageIsActive ? "fill" : undefined}
                        color={
                          _pageIsActive ? "var(--mantine-color-brand-5)" : ""
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={8.5}>
                      <Text size="xs">{item.label}</Text>
                    </Grid.Col>
                  </Grid>
                </Paper>
              );
            } else {
              return <></>;
            }
          })}
        </Stack>
      </AppShell.Section>
    </>
  );
}
