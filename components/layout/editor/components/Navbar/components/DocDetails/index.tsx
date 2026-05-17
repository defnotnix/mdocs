"use client";

import { FormHandler } from "@/components/framework/FormHandler";
import { Grid, Stack, Text } from "@mantine/core";
//moment
import moment from "moment";
import { useParams } from "next/navigation";

export function LayoutEditorNavbarDocDetails() {
  // * DEFINITIONS

  const Params = useParams();

  // * CONTEXTS

  // * STATES

  const form = FormHandler.useForm();

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

  const overviewWoda = [
    {
      label: "Name",
      value: form.values?.applicant_name,
    },
    {
      label: "Gender",
      value: form.values?.applicant_gender,
    },
    {
      label: "Address",
      value: form.values?.applicant_permanent_address,
    },
    {
      label: "Birthday",
      value: moment(form.values?.applicant_dob).format("YYYY/MM/DD"),
    },
    {
      label: "Citizenship",
      value: form.values?.applicant_citizenship,
    },
  ];

  const overviewStatement = [
    {
      label: "Acc. Holder",
      value: form.values?.statement_account_holder,
    },
    {
      label: "Acc. Number",
      value: form.values?.statement_account_no,
    },
    {
      label: "Address",
      value: form.values?.statement_account_address,
    },
    {
      label: "Start Date",
      value: moment(form.values?.statement_start_date).format("YYYY/MM/DD"),
    },
    {
      label: "End Date",
      value: moment(form.values?.statement_end_date).format("YYYY/MM/DD"),
    },
  ];

  // * PRELOADS

  // * FUNCTIONS

  // * COMPONENTS

  const RenderOverview = () => {
    switch (Params.type) {
      case "woda":
        return (
          <Stack gap="xs" px="md" pb="lg">
            {overviewWoda.map((item, index) => (
              <Grid key={index} align="center">
                <Grid.Col span={4}>
                  <Text size="10px" opacity={0.5}>
                    {item.label}
                  </Text>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Text size="xs">{item.value}</Text>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        );
      case "statement":
        return (
          <Stack gap="xs" px="md" pb="lg">
            {overviewStatement.map((item, index) => (
              <Grid key={index} align="center">
                <Grid.Col span={4}>
                  <Text size="10px" opacity={0.5}>
                    {item.label}
                  </Text>
                </Grid.Col>
                <Grid.Col span={8}>
                  <Text size="xs">{item.value}</Text>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        );
      default:
        return <>Nothing here for this template type</>;
    }
  };

  return (
    <>
      <RenderOverview />
    </>
  );
}
