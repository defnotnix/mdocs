"use client";

import {
  Button,
  Container,
  MultiSelect,
  NavLink,
  NumberInput,
  PasswordInput,
  PillsInput,
  Select,
  TextInput,
  Textarea,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export const configThemeComponents: any = {
  Container: Container.extend({
    defaultProps: {
      size: 1440,
    },
  }),
  Text: Text.extend({
    defaultProps: {
      fw: 500,
    },
  }),
  Button: Button.extend({
    defaultProps: {
      size: "sm",
      style: {
        fontSize: "var(--mantine-font-size-xs)",
      },
    },
  }),

  TextInput: TextInput.extend({
    defaultProps: {
      size: "sm",
      styles: {
        input: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        label: {
          fontSize: "var(--mantine-font-size-xs)",
        },
      },
    },
  }),

  PillsInput: PillsInput.extend({
    defaultProps: {
      size: "sm",
      styles: {
        input: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        label: {
          fontSize: "var(--mantine-font-size-xs)",
        },
      },
    },
  }),
  PasswordInput: PasswordInput.extend({
    defaultProps: {
      size: "sm",
      styles: {
        input: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        label: {
          fontSize: "var(--mantine-font-size-xs)",
        },
      },
    },
  }),
  NumberInput: NumberInput.extend({
    defaultProps: {
      size: "sm",
      styles: {
        input: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        label: {
          fontSize: "var(--mantine-font-size-xs)",
        },
      },
    },
  }),
  Textarea: Textarea.extend({
    defaultProps: {
      size: "sm",
      styles: {
        input: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        label: {
          fontSize: "var(--mantine-font-size-xs)",
        },
      },
    },
  }),
  Select: Select.extend({
    defaultProps: {
      size: "sm",
      styles: {
        input: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        label: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        option: {
          fontSize: "var(--mantine-font-size-xs)",
        },
      },
    },
  }),
  Pills: PillsInput.extend({
    defaultProps: {
      size: "sm",
      styles: {
        input: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        label: {
          fontSize: "var(--mantine-font-size-xs)",
        },
      },
    },
  }),
  MultiSelect: MultiSelect.extend({
    defaultProps: {
      size: "sm",
      styles: {
        input: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        label: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        option: {
          fontSize: "var(--mantine-font-size-xs)",
        },
      },
    },
  }),
  DateInput: DateInput.extend({
    defaultProps: {
      size: "sm",
      styles: {
        input: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        label: {
          fontSize: "var(--mantine-font-size-xs)",
        },
      },
    },
  }),

  NavLink: NavLink.extend({
    defaultProps: {
      styles: {
        label: {
          fontSize: "var(--mantine-font-size-xs)",
        },
      },
    },
  }),
};
