"use client";

import { makeLogout } from "@/modules/auth/auth.api";
import { Avatar, Button, Menu, Stack, Text } from "@mantine/core";
import { CaretDown, GearSix, Power, User } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

export function HeaderUserMenu() {
  const Router = useRouter();

  const [userinfo, setUserInfo] = useState<any>({
    name: "User Account",
  });

  useEffect(() => {
    try {
      //@ts-ignore
      const _data = jwtDecode(sessionStorage.getItem("doctoken"));
      setUserInfo(_data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Menu withArrow>
      <Menu.Target>
        <Button
          h={60}
          ta="left"
          variant="subtle"
          leftSection={
            <Avatar
              variant="filled"
              name={userinfo.name}
              color="initials"
              size="sm"
            />
          }
          rightSection={<CaretDown size={10} />}
          c="gray.1"
        >
          <Stack gap={2}>
            <Text size="xs">{userinfo.name}</Text>
            <Text size="10px" opacity={0.4}>
              General Account
            </Text>
          </Stack>
        </Button>
      </Menu.Target>
      <Menu.Dropdown w={200}>
        <Menu.Item
          key={1}
          leftSection={<Power size={12} />}
          onClick={async () => {
            await makeLogout();
            Router.push("/");
            sessionStorage.removeItem("doctoken");
          }}
        >
          <Text size="xs">Sign Out</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
