"use client";

import React, { useContext, useEffect, useState } from "react";
//mantine
import {
  Badge,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Tabs,
  Text,
} from "@mantine/core";
//icons
//framework
import { FormHandler } from "@/components/framework/FormHandler";
import { ArrowLeft, ArrowRight, Check } from "@phosphor-icons/react";
import { useParams } from "next/navigation";
import { FormApplicant } from "@/components/form/FormApplicant";
import { FormWodaGeneral } from "@/components/form/FormWodaGeneral";
import { FormWodaSpecific } from "@/components/form/FormWodaSpecific";
import { FormTemplate } from "@/components/form/FormTemplate";
import { DrawerSignatureSelect } from "@/components/ui/DrawerSignatureSelect";
import { ContextEditor } from "@/components/layout/editor/editor.context";

export function ModuleEditorFormWoda() {
  // * DEFINITIONS

  // * DEFINITIONS

  const Params = useParams();

  // * CONTEXTS

  const { state, dispatch } = useContext(ContextEditor.Context);

  const {
    current,
    handleSubmit,
    steps,
    stepClickable,
    initialStep,
    handleStepBack,
    handleStepNext,
  } = FormHandler.usePropContext();

  // * PRESTATES

  // * STATES

  const [activeTab, setActiveTab] = useState<any>("0");

  const tabs = [
    {
      label: "Document Sets",
      type: "woda",
      tabRender: (
        <Stack gap={4}>
          <Text size="xs">Document Sets</Text>
          <Text size="10px" opacity={0.5}>
            Select document template.
          </Text>
        </Stack>
      ),
      value: "0",
    },
    {
      label: "Applicant Details",
      type: "woda",
      tabRender: (
        <Stack gap={4}>
          <Text size="xs">Applicant Details</Text>
          <Text size="10px" opacity={0.5}>
            Details of the applicant
          </Text>
        </Stack>
      ),
      value: "1",
    },
    {
      label: "Document General Details",
      type: "woda",
      tabRender: (
        <Stack gap={4}>
          <Text size="xs">Woda Details</Text>
          <Text size="10px" opacity={0.5}>
            Common document details.
          </Text>
        </Stack>
      ),
      value: "2",
    },
    {
      label: "Document Specific Details",
      type: "woda",
      tabRender: (
        <Stack gap={4}>
          <Text size="xs">Woda Specifics</Text>
          <Text size="10px" opacity={0.5}>
            Document specific details.
          </Text>
        </Stack>
      ),
      value: "3",
    },
  ];

  // * CONTEXTS

  // * FUNCTIONS

  useEffect(() => {}, []);

  // * COMPONENTS

  return (
    <>
      <Tabs defaultValue="99" value={activeTab} onChange={setActiveTab}>
        <Paper>
          <Container size="lg">
            <Group justify="space-between">
              <Tabs.List>
                {tabs
                  .filter((item: any) => {
                    return item.type == Params.type;
                  })
                  .map((item: any, index: number) => (
                    <Tabs.Tab value={item.value} key={index}>
                      {item.tabRender}
                    </Tabs.Tab>
                  ))}
              </Tabs.List>
            </Group>
          </Container>
        </Paper>

        <Container size="lg">
          <Tabs.Panel value="0" py="md">
            <FormTemplate />
          </Tabs.Panel>
          <Tabs.Panel value="1" py="md">
            <FormApplicant />
          </Tabs.Panel>
          <Tabs.Panel value="2" py="md">
            <FormWodaGeneral />
          </Tabs.Panel>
          <Tabs.Panel value="3" py="md">
            <FormWodaSpecific />
          </Tabs.Panel>
        </Container>
      </Tabs>

      <Container size="lg" px="xl" pb="xl">
        <Group justify="flex-end" gap="xs">
          <Button
            disabled={activeTab == "0"}
            variant="light"
            leftSection={<ArrowLeft />}
            onClick={() => {
              setActiveTab(String(Number(activeTab) - 1));
            }}
          >
            Back
          </Button>
          {activeTab == "3" ? (
            <Button
              rightSection={<Check />}
              onClick={() => {
                dispatch({
                  type: "TOGGLE_FORM_VIEW",
                });
              }}
            >
              View without saving.
            </Button>
          ) : (
            <Button
              onClick={() => {
                setActiveTab(String(Number(activeTab) + 1));
              }}
              rightSection={<ArrowRight />}
            >
              Next
            </Button>
          )}
        </Group>
      </Container>

      <DrawerSignatureSelect />
    </>
  );
}
