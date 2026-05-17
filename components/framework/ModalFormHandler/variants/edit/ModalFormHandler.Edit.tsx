"use client";

import React, { useEffect } from "react";
//mantine
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
//props
import { propModalFormHandler } from "../../ModalFormHandler.prop";
//vadmin
import { FormHandler } from "@/components/framework/FormHandler";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FloppyDisk,
  X,
} from "@phosphor-icons/react";
import { FormTabs } from "@/components/framework/FormTabs";

export function ModalFormHandlerEdit(props: propModalFormHandler) {
  // * DEFINITION
  const {
    size = "lg",
    variant,
    target,
    children,
    formProps,
    title,
    modalOpened = false,
    modalHandler,
    preData,
    sizes,
  } = props;

  // * PRE STATES

  // * PRE LOADING

  // * FUNCTIONS

  // * COMPONENTS

  const FWrapper = () => {
    const form = FormHandler.useForm();
    const { current, handleSubmit } = FormHandler.usePropContext();

    useEffect(() => {
      form.setValues({ ...preData, _dirtcheck: preData });
    }, [preData]);

    return (
      <Modal
        size={sizes ? sizes[current] : size}
        styles={{
          header: {
            background: "var(--mantine-color-gray-1)",
          },
          body: {
            padding: "var(--mantine-spacing-sm) var(--mantine-spacing-lg)",
            transition: ".3s ease-in-out",
          },
          root: {
            transition: ".3s ease-in-out",
          },
        }}
        title={
          <Text size="sm" fw={600}>
            {title}
          </Text>
        }
        opened={modalOpened}
        onClose={() => {
          if (
            confirm(
              "Hold on! The form is still being filled. Are you sure you want to close it?"
            )
          ) {
            modalHandler.close();
          } else {
          }
        }}
      >
        {children}

        <Group mt="xl" justify="flex-end" gap="xs">
          <Button
            leftSection={<FloppyDisk />}
            color="brand"
            onClick={() => {
              handleSubmit();
            }}
          >
            Save Changes
          </Button>
          <Button
            leftSection={<X />}
            variant="light"
            onClick={modalHandler.close}
          >
            Cancel
          </Button>
        </Group>
      </Modal>
    );
  };

  return (
    <>
      <FormHandler
        {...formProps}
        handleSuccess={(res: any) => {
          modalHandler.close();
          formProps.handleSuccess(res);
        }}
      >
        <FWrapper />
      </FormHandler>
    </>
  );
}
