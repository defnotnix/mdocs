"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
//nextjs
import { useParams, usePathname } from "next/navigation";
//mantine
import {
  ActionIcon,
  Button,
  Center,
  Group,
  Space,
  Stack,
  Text,
} from "@mantine/core";
//templates
import { T } from "@/components/templates";
import { ContextEditor } from "@/components/layout/editor/editor.context";
import { FloppyDisk } from "@phosphor-icons/react";
import { apiFile, updateRecordStatement, updateRecordWoda } from "@/api/file";

import { useReactToPrint } from "react-to-print";
import { modals } from "@mantine/modals";
import { useMutation } from "@tanstack/react-query";
import { triggerNotification } from "@/components/helper/notification";
import { createRecordStatement, createRecordWoda } from "@/api/print";
import { FormHandler } from "@/components/framework/FormHandler";

//context

//api

//print

const getComponentByType = (id: string) => {
  //@ts-ignore
  return T[id] || null;
};

export function ModuleEditorTemplate() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  const Pathname = usePathname();
  const Params: any = useParams();
  const ref: any = useRef();

  // * STATES

  const [stack, setStack] = useState<boolean>(true);

  const [loading, setLoading] = useState(false);

  // * CONTEXTS

  const { state, dispatch } = useContext(ContextEditor.Context);

  // * PRELOADS

  // * FUNCTIONS

  useEffect(() => {
    if (Params.id) {
      fetchFileData();
    }
  }, []);

  async function fetchFileData() {
    const res: any =
      Params.type == "woda"
        ? await apiFile.woda.get(Params.id)
        : await apiFile.statement.get(Params.id);

    dispatch({
      type: "API_INITIALIZE",
      payload: {
        ...res.template,
      },
    });

    dispatch({
      type: "SET_DOCINFO",
      payload: res,
    });
  }

  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => {
      setStack(false);
    },
    onAfterPrint: async () => {
      setLoading(false);
      setStack(true);
    },
    removeAfterPrint: true,
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
                details: form.values,
                docinfo: undefined,
              }),
              type: "woda",
            },
            state.docinfo.id
          )
        : await updateRecordStatement(
            {
              template: JSON.stringify({
                ...state,
              }),
              type: "statement",
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
      setLoading(false);
      triggerNotification.Form.isSuccess({
        message: "All updates have been saved for print",
      });
    },
    onError: (err) => {
      triggerNotification.Form.isError();
    },
  });

  // * COMPONENTS

  if (state.setinfo?.items?.length == 0) {
    return (
      <>
        <Center pt={400}>
          <Text size="xs" c="gray.5">
            Please select a document template
          </Text>
        </Center>
      </>
    );
  }

  if (state?.active?.startsWith("docall-")) {
    const DocComponentAll = form.values?.setinfo?.items.map(
      (docitem: any, index: number) => {
        const DocComp = getComponentByType(docitem || "");

        return (
          <React.Fragment key={index}>
            <DocComp />
          </React.Fragment>
        );
      }
    );

    return (
      <>
        <Space h="xl" />
        <Center>
          <div ref={ref}>
            <Stack gap={stack ? "sm" : 0}>{DocComponentAll}</Stack>
          </div>
        </Center>
        <Space h="xl" />

        {DocComponentAll && (
          <Button
            disabled={!state.docinfo.name}
            style={{
              position: "fixed",
              bottom: 32,
              right: 32,
            }}
            size="sm"
            leftSection={<FloppyDisk />}
            onClick={async () => {
              setLoading(true);

              if (!Pathname.includes("documentPreview")) {
                await mutationFileUpdate.mutateAsync();
              }

              modals.openConfirmModal({
                title: (
                  <Group>
                    <Text
                      size="sm"
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Would you like to save the current print?
                    </Text>
                  </Group>
                ),
                children: (
                  <Stack gap="xs" my="md">
                    <Text size="xs">
                      Proceeding will save the current print as a log for future
                      reference.
                    </Text>
                    <Text size="xs" fw={600}>
                      You will still be able to print this document regardless.
                    </Text>
                  </Stack>
                ),
                labels: { confirm: "Confirm", cancel: "Cancel" },
                styles: {
                  header: { background: "var(--mantine-color-brand-0)" },
                },
                onCancel: () => {
                  handlePrint(null, () => ref.current);
                },
                onConfirm: async () => {
                  triggerNotification.Form.isLoading();

                  if (state.docinfo.type == "woda") {
                    createRecordWoda({
                      wodadoc_id: state.docinfo.id,
                    })
                      .then(() => {
                        triggerNotification.Form.isSuccess({
                          title: "Print History Saved",
                        });
                      })
                      .catch((err) => {
                        triggerNotification.Form.isError({
                          title: "Cannot Save History",
                        });
                      });
                  } else if (state.docinfo.type == "statement") {
                    createRecordStatement({
                      statement_id: state.docinfo.id,
                    })
                      .then(() => {
                        triggerNotification.Form.isSuccess({
                          title: "Print History Saved",
                        });
                      })
                      .catch((err) => {
                        triggerNotification.Form.isError({
                          title: "Cannot Save History",
                        });
                      });
                  } else {
                  }

                  handlePrint(null, () => ref.current);
                },
              });
            }}
            loading={loading}
          >
            Print / Export
          </Button>
        )}
      </>
    );
  } else {
    const DocumentComponent = getComponentByType(state.active || "");

    return (
      <>
        {DocumentComponent ? (
          <>
            <Button
              // disabled={!state.docinfo.name}
              style={{
                position: "fixed",
                bottom: 32,
                right: 32,
              }}
              size="sm"
              leftSection={<FloppyDisk />}
              onClick={async () => {
                handlePrint(null, () => ref.current);
              }}
              loading={loading}
            >
              Print / Export
            </Button>

            <Space h="xl" />
            <Center>
              <div ref={ref}>
                <DocumentComponent />
              </div>
            </Center>
            <Space h="xl" />
          </>
        ) : (
          <Center h={"calc(100vh - 150px)"}>
            <Text size="xs" ta="center">
              Seems like this document is not linked to any template
              <br /> Please contact the devs.
            </Text>
          </Center>
        )}
      </>
    );
  }
}
