"use client";

import React, { useContext, useEffect, useState } from "react";
//mantine
import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Group,
  Paper,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ContextEditor } from "@/components/layout/editor/editor.context";
import { apiSignature } from "@/api/signature";
import { date } from "zod";

//styles
import classes from "./drawer.module.css";
import { FormHandler } from "@/components/framework/FormHandler";
import {
  DotsThree,
  DotsThreeVertical,
  Pen,
  Plus,
  Trash,
  Warning,
} from "@phosphor-icons/react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { triggerNotification } from "@/components/helper/notification";
import { usePathname } from "next/navigation";
import { modals } from "@mantine/modals";

export function DrawerSignatureSelect() {
  // * DEFINITIONS

  const Pathname = usePathname();

  // * CONTEXTS

  const form = FormHandler.useForm();
  const _form = useForm({
    initialValues: {
      id: "",
      value: "",
      type: "new",
    },
    validate: {
      value: (value: string) => {
        if (!value) {
          return "Signature cannot be empty";
        }
      },
    },
  });

  const { state, dispatch } = useContext(ContextEditor.Context);

  const [enableForm, handleEnableForm] = useDisclosure(false, {
    onClose: () => {
      form.setValues({
        value: "",
        type: "new",
      });
    },
  });

  // * PRESTATES

  // * STATES

  // * PRELOADS

  const { data, refetch } = useQuery({
    queryKey: ["signature"],
    queryFn: async () => {
      const res: any = await apiSignature.get();

      return res.err ? [] : res.data;
    },
    refetchOnWindowFocus: false,
  });

  // * FUNCTIONS

  const mutation = useMutation({
    mutationFn: async () => {
      const set = Pathname.includes("/woda") ? "woda" : "statement";

      triggerNotification.Form.isLoading();

      const res: any = await apiSignature.create({
        set,
        template: state?.signatureProps?.template,
        value: _form.values.value,
      });

      return res;
    },
    onSuccess: (res: any) => {
      refetch();
      form.setFieldValue(state?.signatureProps?.field, form.values.value);
      handleEnableForm.close();
      triggerNotification.Form.isSuccess();
    },
    onError: (err) => {
      triggerNotification.Form.isError();
    },
  });

  const mutationEdit = useMutation({
    mutationFn: async () => {
      triggerNotification.Form.isLoading();

      const res: any = await apiSignature.update(
        {
          value: _form.values.value,
        },
        _form.values.id
      );

      handleEnableForm.close();

      return res;
    },
    onSuccess: (res: any) => {
      refetch();
      handleEnableForm.close();
      triggerNotification.Form.isSuccess();
    },
    onError: (err) => {
      triggerNotification.Form.isError();
    },
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

        apiSignature
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

  return (
    <div>
      <Drawer
        position="right"
        opened={state.signatureDrawerOpen}
        title={
          <Text size="xs" tt="uppercase" fw={700}>
            Select Signature
          </Text>
        }
        onClose={() => {
          dispatch({
            type: "HIDE_SIGNATURE",
          });
        }}
        styles={{
          header: {
            background: "var(--mantine-color-brand-light)",
          },
          body: {
            padding: 0,
          },
        }}
      >
        <Stack gap={0}>
          {enableForm && (
            <Paper radius={0} bg="gray.0" p="md">
              <Stack gap="xs">
                <Text size="xs" fw={600} tt="uppercase" mb="sm">
                  New Signature
                </Text>

                <Textarea
                  rows={10}
                  placeholder="Enter Signature"
                  {..._form.getInputProps("value")}
                />
                <Button.Group>
                  {_form.values.type == "new" ? (
                    <Button fullWidth onClick={() => mutation.mutate()}>
                      Create
                    </Button>
                  ) : (
                    <Button fullWidth onClick={() => mutationEdit.mutate()}>
                      Save
                    </Button>
                  )}
                  <Button
                    fullWidth
                    variant="light"
                    onClick={handleEnableForm.close}
                  >
                    Cancel
                  </Button>
                  {_form.values.type == "edit" && (
                    <Button
                      fullWidth
                      variant="light"
                      color="red"
                      onClick={() => handleDelete(_form.values.id)}
                    >
                      Delete
                    </Button>
                  )}
                </Button.Group>
              </Stack>
            </Paper>
          )}

          <Group justify="space-between" my="sm" px="md">
            <Text size="xs" fw={600}>
              Showing {state.signature?.length || 0} Available Signatures
            </Text>

            <Button
              disabled={enableForm}
              size="xs"
              variant="light"
              leftSection={<Plus />}
              onClick={() => {
                _form.setValues({
                  value: "",
                  type: "new",
                });
                handleEnableForm.open();
              }}
            >
              New Signature
            </Button>
          </Group>

          <Divider />

          {data
            ?.filter((item: any) => {
              return item.template == state.signatureProps.template;
            })
            .map((item: any, index: number) => {
              return (
                <Paper
                  radius={0}
                  className={classes.card}
                  key={index}
                  p="md"
                  onClick={() => {
                    form.setFieldValue(state.signatureProps?.field, item.value);
                    dispatch({
                      type: "HIDE_SIGNATURE",
                    });
                  }}
                >
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Text size="xs">{item.value}</Text>

                    <ActionIcon
                      size="md"
                      variant="subtle"
                      onClick={(e) => {
                        e.stopPropagation();
                        _form.setValues({
                          ...item,
                          type: "edit",
                        });
                        handleEnableForm.open();
                      }}
                    >
                      <DotsThreeVertical weight="bold" />
                    </ActionIcon>
                  </Group>
                </Paper>
              );
            })}
        </Stack>
      </Drawer>
    </div>
  );
}
