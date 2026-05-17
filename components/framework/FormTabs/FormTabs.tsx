"use client";

import React from "react";

//step
import { FormLayoutStepCard } from "./FormTab.step";

//props
import { propFormTabs } from "./FormTabs.type";
import { SimpleGrid } from "@mantine/core";

export function FormTabs({ current, steps }: propFormTabs) {
  return (
    <>
      <SimpleGrid
        spacing={0}
        cols={{
          base: 1,
          md: steps.length,
        }}
      >
        {steps.map((step: any, index: number) => (
          <React.Fragment key={index}>
            <FormLayoutStepCard
              current={current}
              total={steps.length}
              info={{
                label: step,
                key: index,
              }}
            />
          </React.Fragment>
        ))}
      </SimpleGrid>
    </>
  );
}
