"use client";

import React, { PropsWithChildren, useContext, useState } from "react";
//mantine
import {
  ActionIcon,
  Badge,
  Center,
  Container,
  Group,
  Menu,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
//context

//components

import {
  CaretDown,
  FilePlus,
  Folder,
  FolderOpen,
  MagnifyingGlass,
  Plus,
  Users,
} from "@phosphor-icons/react";

import classes from "./explore.module.css";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { ContextExplorer } from "@/components/layout/explorer/explorer.contex";

export function ModuleExploreIntro() {
  // * DEFINITION

  // * CONTEXT

  const { state, dispatch } = useContext(ContextExplorer.Context);

  const Router = useRouter();

  const [search, setSearch] = useState("");

  // * STATES

  // * PRESTATES

  // * PRELOADING

  // * FUNCTIONS

  // * COMPONENTS

  return (
    <>
      <Container size="xs">
        <AnimatePresence>
          <SimpleGrid spacing="xs" cols={2} pt={150}>
            <motion.div
              key={1}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
            >
              <Paper
                px="md"
                py={100}
                withBorder
                className={classes.foldercard}
                onClick={() => {
                  Router.push("/editor/woda/new");
                }}
              >
                <Stack gap="md">
                  <Center>
                    <FilePlus
                      weight="fill"
                      color="var(--mantine-color-blue-6)"
                      size={100}
                    />
                  </Center>
                  <Stack gap="4px" mb="sm">
                    <Text size="xs" fw={600} ta="center">
                      New Woda Document
                    </Text>

                    <Text size="10px" ta="center" c="gray.6">
                      Create a new Woda Document
                    </Text>
                  </Stack>
                </Stack>
              </Paper>
            </motion.div>
            <motion.div
              key={2}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
            >
              <Paper
                px="md"
                py={100}
                withBorder
                className={classes.foldercard}
                onClick={() => {
                  Router.push("/editor/statement/new");
                }}
              >
                <Stack gap="md">
                  <Center>
                    <FilePlus
                      weight="duotone"
                      color="var(--mantine-color-indigo-6)"
                      size={100}
                    />
                  </Center>
                  <Stack gap="4px" mb="sm">
                    <Text size="xs" fw={600} ta="center">
                      New Statement Document
                    </Text>

                    <Text size="10px" ta="center" c="gray.6">
                      Create a new Statement Document
                    </Text>
                  </Stack>
                </Stack>
              </Paper>
            </motion.div>
          </SimpleGrid>

          <motion.div
            key={3}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
          >
            <TextInput
              mt="sm"
              size="lg"
              rightSection={
                <ActionIcon
                  onClick={() => {
                    dispatch({
                      type: "UPDATE_SEARCH",
                      payload: search,
                    });
                    Router.push(
                      "/explorer/search?search=" +
                        search +
                        "&type=" +
                        state?.searchType
                    );
                  }}
                >
                  <MagnifyingGlass />
                </ActionIcon>
              }
              placeholder="Search Documents"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </motion.div>

          <Group justify="flex-end">
            <Menu withArrow>
              <Menu.Target>
                <UnstyledButton>
                  <Badge
                    size="sm"
                    variant="light"
                    rightSection={<CaretDown />}
                    tt="uppercase"
                  >
                    Searches {state?.searchType} Documents
                  </Badge>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  key={2}
                  onClick={() => {
                    dispatch({
                      type: "UPDATE_SEARCH_TYPE",
                      payload: "woda",
                    });
                  }}
                >
                  <Text size="xs">Woda Documents </Text>
                </Menu.Item>
                <Menu.Item
                  key={3}
                  onClick={() => {
                    dispatch({
                      type: "UPDATE_SEARCH_TYPE",
                      payload: "statement",
                    });
                  }}
                >
                  <Text size="xs">Statement Documents </Text>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </AnimatePresence>
      </Container>
    </>
  );
}
