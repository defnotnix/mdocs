import {
  Avatar,
  Grid,
  Group,
  Loader,
  Paper,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Check, Hash } from "@phosphor-icons/react";

export function FormLayoutStepCard({
  info,
  current,
  total,
}: {
  info: any;
  current: number;
  total: number;
}) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const colorCode = {
    active: {
      base: theme.colors.blue[0],
      active: theme.colors.blue[5],
      text: theme.colors.blue[6],
    },
    completed: {
      base: theme.colors.teal[0],
      active: theme.colors.teal[5],
      text: theme.colors.teal[6],
    },
  };

  const style = {
    active: {
      background: colorCode.active.base,
      borderBottom: "2px solid " + colorCode.active.active,
    },
    inactive: {
      opacity: 0.5,
      borderBottom: "1px solid var(--mantine-color-gray-5)",
      background: "var(--mantine-color-gray-0)",
    },
    completed: {
      background: colorCode.completed.base,
      borderBottom: "2px solid " + colorCode.completed.active,
    },
  };

  const active = info.key == current;

  return (
    <>
      <Paper
        radius={0}
        px="lg"
        py="sm"
        style={
          current > info.key
            ? style.completed
            : active
              ? style.active
              : style.inactive
        }
      >
        <Grid>
          {current > info.key && (
            <Grid.Col span={2}>
              <Avatar size="xs" color="teal" variant="filled">
                <Check weight="bold" size={8} />
              </Avatar>
            </Grid.Col>
          )}

          <Grid.Col span={10}>
            <div>
              <Text
                fw={700}
                style={{
                  fontSize: 8,
                  color:
                    current > info.key
                      ? colorCode.completed.text
                      : active
                        ? colorCode.active.text
                        : "",
                }}
              >
                {current > info.key
                  ? "Completed"
                  : active
                    ? "Ongoing"
                    : "Step " + (info.key + 1) + " of " + total}
              </Text>
              <Text size="xs" fw={700}>
                {info.label}
              </Text>
            </div>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
}
