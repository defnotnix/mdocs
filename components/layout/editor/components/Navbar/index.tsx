import {
  Accordion,
  AppShell,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { LayoutEditorNavbarDocDetails } from "./components/DocDetails";
import { LayoutEditorNavbarDocHeader } from "./components/DocHeader";
import { LayoutEditorNavbarDocTemplate } from "./components/DocTemplate";
import {
  ClockClockwise,
  File,
  FloppyDisk,
  Ruler,
  Scroll,
  Wrench,
} from "@phosphor-icons/react";
import { ContextEditor } from "../../editor.context";

export function LayoutEditorNavbar() {
  // * DEFINITIONS

  // * CONTEXTS

  const { state, dispatch } = useContext(ContextEditor.Context);
  const [, forceUpdate] = useState({});

  // * STATES

  // * PRELOADS

  // * FUNCTIONS

  // * COMPONENTS

  const navSections = [
    {
      label: "Document Details",
      body: (
        <Stack pt="md">
          <LayoutEditorNavbarDocDetails />
        </Stack>
      ),
      icon: Scroll,
      color: "blue",
    },
    {
      label: "Header Settings",
      body: <LayoutEditorNavbarDocHeader />,
      icon: Ruler,
      color: "indigo",
    },
    {
      label: "Templates",
      body: <LayoutEditorNavbarDocTemplate />,
      icon: File,
      color: "orange",
    },
  ];

  return (
    <AppShell.Navbar>
      <Accordion
        multiple={true}
        defaultValue={["0", "2"]}
        styles={{
          content: {
            padding: "0!important",
          },
        }}
      >
        {navSections.map((item, index) => {
          return (
            <Accordion.Item key={index} value={String(index)}>
              <Accordion.Control
                bg={`${item.color}.0`}
                icon={
                  <item.icon
                    weight="fill"
                    size={12}
                    color={`var(--mantine-color-${item.color}-6)`}
                  />
                }
              >
                <Text size="xs" fw={600} tt="uppercase">
                  {item.label}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>{item.body}</Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </AppShell.Navbar>
  );
}
