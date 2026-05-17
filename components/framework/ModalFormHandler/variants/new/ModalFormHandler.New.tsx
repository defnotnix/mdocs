"use client";

import React, { useEffect } from "react";
//mantine
import { Box, Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
//props
import { propModalFormHandler } from "../../ModalFormHandler.prop";
//vadmin
import { FormHandler } from "@/components/framework/FormHandler";
import { ArrowLeft, ArrowRight, Check, X } from "@phosphor-icons/react";
import { FormTabs } from "@/components/framework/FormTabs";
import { useParams } from "next/navigation";

export function ModalFormHandlerNew(props: propModalFormHandler) {
  // * DEFINITION

  const [opened, { open, close }] = useDisclosure(false);
  const {
    target,
    children,
    formProps,
    title,
    size = "lg",
    hideStepper = false,
    sizes,
    modalOpened,
    modalHandler,
  } = props;

  // * PRE STATES

  // * PRE LOADING

  const Params = useParams();

  // * FUNCTIONS

  // * COMPONENTS

  const FWrapper = () => {
    const form = FormHandler.useForm();
    const {
      current,
      handleSubmit,
      handleStepBack,
      handleStepNext,
      handleReset,
    } = FormHandler.usePropContext();

    useEffect(() => {
      form.setValues({
        ...formProps.initial,
        applicant_dob: new Date(formProps.initial.applicant_dob),
        wodadoc_date: new Date(formProps.initial.wodadoc_date),
        occupations: formProps.initial.occupations.map(
          (item: any, index: number) => {
            return {
              name: item.name,
              income1: item.income[0],
              income2: item.income[1],
              income3: item.income[2],
            };
          }
        ),
        rate_date: new Date(formProps.initial.rate_date),
      });
    }, [Params]);

    return (
      <>
        <Modal
          size={sizes ? sizes[current] : size}
          styles={{
            header: {
              background: "var(--mantine-color-gray-1)",
              borderBottom: "1px solid var(--mantine-color-gray-3)",
            },
            body: {
              padding: 0,
            },
          }}
          title={
            <Text size="sm" fw={700} tt="uppercase">
              <span style={{ color: "var(--mantine-color-gray-6)" }}>
                Create a{" "}
              </span>{" "}
              {title}
            </Text>
          }
          opened={modalOpened || opened}
          onClose={() => {
            if (
              confirm(
                "Hold on! The form is still being filled. Are you sure you want to close it?"
              )
            ) {
              close();
              handleReset();
              modalHandler.close();
            } else {
            }
          }}
        >
          {!formProps.hideStepper && formProps.steps && (
            <FormTabs steps={formProps.steps} current={current} />
          )}

          <Box
            style={{
              padding: "var(--mantine-spacing-sm) var(--mantine-spacing-lg)",
            }}
          >
            {children}

            {formProps.steps ? (
              <Group mt="xl" justify="space-between" gap="xs">
                <Button
                  leftSection={<X />}
                  variant="light"
                  onClick={() => {
                    close();
                    modalHandler.close();
                  }}
                >
                  Cancel
                </Button>

                <Group gap="xs">
                  <Button
                    disabled={current == 0}
                    leftSection={<ArrowLeft />}
                    color="brand"
                    onClick={() => handleStepBack()}
                  >
                    Back
                  </Button>
                  {current < formProps.steps.length - 1 && (
                    <Button
                      leftSection={<ArrowRight />}
                      color="brand"
                      onClick={() => handleStepNext()}
                    >
                      Next
                    </Button>
                  )}
                  {current == formProps.steps.length - 1 && (
                    <Button
                      leftSection={<Check />}
                      color="teal"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Create
                    </Button>
                  )}
                </Group>
              </Group>
            ) : (
              <Group mt="xl" justify="flex-end" gap="xs">
                <Button
                  leftSection={<Check />}
                  color="brand"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Create
                </Button>
                <Button
                  leftSection={<X />}
                  variant="light"
                  onClick={() => {
                    close();
                    modalHandler.close();
                  }}
                >
                  Cancel
                </Button>
              </Group>
            )}
          </Box>
        </Modal>
      </>
    );
  };

  return (
    <>
      <div onClick={open}>{target}</div>

      <FormHandler
        {...formProps}
        handleSuccess={(res: any) => {
          close();
          modalHandler.close();
          formProps.handleSuccess(res);
        }}
      >
        <FWrapper />
      </FormHandler>
    </>
  );
}
