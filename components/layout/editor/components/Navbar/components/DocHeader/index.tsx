"use client";

import React, { useContext, useState } from "react";
//nextjs
import { useParams, usePathname, useRouter } from "next/navigation";
//mantine
import {
  ActionIcon,
  AppShell,
  Button,
  Grid,
  Group,
  NumberInput,
  SimpleGrid,
  Slider,
  Stack,
  Switch,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import {} from "@mantine/hooks";
import { ContextEditor } from "@/components/layout/editor/editor.context";

export function LayoutEditorNavbarDocHeader() {
  // * DEFINITIONS

  const Pathname = usePathname();

  // * CONTEXTS
  const { state, dispatch } = useContext(ContextEditor.Context);
  const { headerProps } = state;
  const [headerHeight, setHeaderHeight] = useState(headerProps?.height);

  // * STATES

  // * PRELOADS

  // * FUNCTIONS

  // * COMPONENTS

  return (
    <>
      <AppShell.Section py="md" px="md">
        <Stack gap="xs">
          {Pathname.includes("/editor/woda/") && (
            <Group justify="space-between">
              <Text size="xs">Hide Header</Text>
              <Switch
                value={headerProps?.enable}
                size="xs"
                onChange={(e) => {
                  dispatch({
                    type: "UPDATE_HEADER",
                    payload: {
                      enable: e.target.checked,
                    },
                  });
                }}
              />
            </Group>
          )}

          {Pathname.includes("/editor/woda/") && (
            <Group justify="space-between">
              <Text size="xs">Hide Header Line</Text>
              <Switch
                value={headerProps?.enableLine}
                size="xs"
                onChange={(e) => {
                  dispatch({
                    type: "UPDATE_HEADER",
                    payload: {
                      enableLine: e.target.checked,
                    },
                  });
                }}
              />
            </Group>
          )}

          {Pathname.includes("/editor/woda/") && (
            <>
              <Group justify="space-between">
                <Text size="xs">Header Height</Text>
                <NumberInput
                  min={0.5}
                  max={2}
                  defaultValue={headerProps?.height}
                  value={headerHeight}
                  size="xs"
                  hideControls
                  w={60}
                  rightSectionWidth={24}
                  rightSection={<Text size="xs">in</Text>}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_HEADER",
                      payload: {
                        height: e,
                      },
                    });
                  }}
                />
              </Group>

              <Slider
                size="xs"
                defaultValue={headerProps?.height}
                value={headerHeight}
                min={0.5}
                max={2}
                label={(value) => value.toFixed(1)}
                step={0.1}
                styles={{ markLabel: { display: "none" } }}
                onChange={(value) => {
                  setHeaderHeight(value);
                }}
                onChangeEnd={(value) => {
                  dispatch({
                    type: "UPDATE_HEADER",
                    payload: {
                      height: value,
                    },
                  });
                }}
              />
            </>
          )}

          {Pathname.includes("/editor/statement/") && (
            <>
              <Group justify="space-between">
                <Text size="xs">Header Height</Text>
                <NumberInput
                  min={0.2}
                  max={2}
                  step={0.2}
                  defaultValue={headerProps?.height}
                  value={headerHeight}
                  size="xs"
                  hideControls
                  w={60}
                  rightSectionWidth={24}
                  rightSection={<Text size="xs">in</Text>}
                  onChange={(e) => {
                    dispatch({
                      type: "UPDATE_HEADER",
                      payload: {
                        height: e,
                      },
                    });
                  }}
                />
              </Group>

              <Slider
                size="xs"
                defaultValue={headerProps?.height}
                value={headerHeight}
                min={0.2}
                max={2}
                label={(value) => value.toFixed(1)}
                step={0.2}
                styles={{ markLabel: { display: "none" } }}
                onChange={(value) => {
                  setHeaderHeight(value);
                }}
                onChangeEnd={(value) => {
                  dispatch({
                    type: "UPDATE_HEADER",
                    payload: {
                      height: value,
                    },
                  });
                }}
              />
            </>
          )}
        </Stack>
      </AppShell.Section>
    </>
  );
}
