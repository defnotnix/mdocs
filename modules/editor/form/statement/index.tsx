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
import { useParams, usePathname } from "next/navigation";
import { FormApplicant } from "@/components/form/FormApplicant";
import { FormWodaGeneral } from "@/components/form/FormWodaGeneral";
import { FormWodaSpecific } from "@/components/form/FormWodaSpecific";
import { FormTemplate } from "@/components/form/FormTemplate";
import { DrawerSignatureSelect } from "@/components/ui/DrawerSignatureSelect";
import { FormBankAccount } from "@/components/form/FormBankAccount";
import { FormBankStatement } from "@/components/form/FormBankStatement";
import { ContextEditor } from "@/components/layout/editor/editor.context";

export function ModuleEditorFormStatement() {
  // * DEFINITIONS

  const Pathname = usePathname();

  const {} = FormHandler.usePropContext();

  // * DEFINITIONS

  const Params = useParams();

  // * CONTEXTS

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
  const { state, dispatch } = useContext(ContextEditor.Context);

  const tabs = [
    {
      label: "Document Sets",
      type: "statement",
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
      label: "Account Holder Details",
      type: "statement",
      tabRender: (
        <Stack gap={4}>
          <Text size="xs">Account Holder Details</Text>
          <Text size="10px" opacity={0.5}>
            Account holder details for the document.
          </Text>
        </Stack>
      ),
      value: "1",
    },
    {
      label: "Statements",
      type: "statement",
      tabRender: (
        <Stack gap={4}>
          <Text size="xs">Statements</Text>
          <Text size="10px" opacity={0.5}>
            Statements for the document.
          </Text>
        </Stack>
      ),
      value: "2",
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

              {/* {Pathname.includes("/statement") && activeTab == "2" && (
                <Group gap="xs">
                  <Button
                    size="xs"
                    onClick={() => handleSubmit()}
                    leftSection={<Check />}
                    variant="light"
                  >
                    Apply
                  </Button>
                </Group>
              )} */}
            </Group>
          </Container>
        </Paper>

        <Container size="lg">
          <Tabs.Panel value="0" py="md">
            <FormTemplate />
          </Tabs.Panel>
          <Tabs.Panel value="1" py="md">
            <FormBankAccount />
          </Tabs.Panel>
          <Tabs.Panel value="2" py="md">
            <FormBankStatement />
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
          {activeTab == "2" ? (
            <Button
              rightSection={<Check />}
              onClick={() => {
                handleSubmit();
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
