/* eslint-disable react/no-unescaped-entities */
"use client";

import { useContext } from "react";
//mantine
import {
  Center,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Space,
  Text,
} from "@mantine/core";
//styles
import classes from "./relationship-new.module.css";
//pageprops
import { configPageProps } from "../../templateprops";
//context
import { ContextEditor } from "@/components/layout/editor/editor.context";
//const
import { monthNames } from "@/const/monthnames";
import { wodaTextProps, wodaTitleProps } from "../wodaProps";
import { FormHandler } from "@/components/framework/FormHandler";
import { getDaySuffix } from "@/components/helper/getDaySuffix";

export function TemplateRelationshipVerificationNew() {
  // * DEFINITION

  const form = FormHandler.useForm();

  // * PRE STATES

  const propsText = wodaTextProps;
  const propsTitle = wodaTitleProps;

  const lh = "19.5px";

  // * STATES

  // * CONTEXT

  const { state, dispatch } = useContext(ContextEditor.Context);
  const { details } = state;

  // * PRELOAD

  // * FUNCTIONS

  // * COMPONENTS

  const DocHeader = () => {
    const _showHeader = state?.headerProps?.enable;

    return (
      <>
        <Group
          gap="4px"
          style={{
            opacity: _showHeader ? 0 : 1,
          }}
        >
          <Text {...propsText} fw={600}>
            Ref. No.:
          </Text>
          <Text {...propsText}>{form.values?.wodadoc_refno}</Text>
        </Group>
        <Group
          justify="space-between"
          style={{
            opacity: _showHeader ? 0 : 1,
          }}
        >
          <Group gap="4px">
            <Text {...propsText} fw={600}>
              Dispatch No.:
            </Text>
          </Group>
          <Group gap="4px">
            <Text {...propsText} fw={600}>
              Date:
            </Text>
            <Text {...propsText}>
              {form.values?.wodadoc_date ? (
                <>
                  {new Date(form.values?.wodadoc_date || "").getDate()}
                  <span
                    style={{
                      verticalAlign: "super",
                      fontSize: 8,
                    }}
                  >
                    {getDaySuffix(
                      new Date(form.values?.wodadoc_date).getDate()
                    )}
                  </span>{" "}
                  {monthNames[new Date(form.values?.wodadoc_date).getMonth()]},{" "}
                  {new Date(form.values?.wodadoc_date).getFullYear()}
                </>
              ) : (
                <div
                  style={{
                    display: "block",
                    width: 100,
                  }}
                ></div>
              )}
            </Text>
          </Group>
        </Group>

        <Divider
          opacity={!state.headerProps?.enableLine ? 1 : 0}
          size={1}
          color="dark.9"
          mt="xs"
          mb="md"
        />
      </>
    );
  };

  return (
    <>
      <Paper radius={0} p=".6in" className={classes.root} {...configPageProps}>
        <Space h={state?.headerProps?.height + "in" || "1in"} />

        <DocHeader />

        <Text
          {...propsTitle}
          ta="center"
          tt="uppercase"
          td="underline"
          fw={600}
          mt={".2in"}
        >
          Subject : Relationship Verification Certificate 
        
        </Text>

        <Space h=".35in" />

        <Text
          style={{
            textAlign: "justify",
          }}
          {...propsText}
        >
          This is to verify that applicant{" "}
          <b>
            {form.values?.applicant_honorific} {form.values?.applicant_name}
          </b>
          {(form.values?.applicant_citizenship ||
            form.values?.applicant_nid ||
            form.values?.applicant_passport) && (
            <>
              , holder of{" "}
              {form.values?.applicant_citizenship && (
                <>
                  Nepali Citizenship Certificate No.{" "}
                  <b>{form.values?.applicant_citizenship}</b>
                </>
              )}
              {form.values?.applicant_nid && (
                <>
                  {form.values?.applicant_citizenship ? ", " : ""}
                  National Identity Card No.{" "}
                  <b>{form.values?.applicant_nid}</b>
                </>
              )}
              {form.values?.applicant_passport && (
                <>
                  {form.values?.applicant_citizenship ||
                  form.values?.applicant_nid
                    ? ", "
                    : ""}
                  Passport No. <b>{form.values?.applicant_passport}</b>
                </>
              )}
            </>
          )}
          {form.values?.applicant_grandfather_name && (
            <>
              ,{" "}
              {form.values?.applicant_gender === "Female"
                ? "granddaughter"
                : "grandson"}{" "}
              of{" "}
              <b>
                {form.values?.applicant_grandfather_honorific}{" "}
                {form.values?.applicant_grandfather_name}
              </b>{" "}
              and{" "}
              <b>
                {form.values?.applicant_grandmother_honorific}{" "}
                {form.values?.applicant_grandmother_name || "……"}
              </b>
            </>
          )}
          {form.values?.applicant_father_name && (
            <>
              ,{" "}
              {form.values?.applicant_gender === "Female"
                ? "daughter"
                : "son"}{" "}
              of{" "}
              <b>
                {form.values?.applicant_father_honorific}{" "}
                {form.values?.applicant_father_name}
              </b>{" "}
              and{" "}
              <b>
                {form.values?.applicant_mother_honorific}{" "}
                {form.values?.applicant_mother_name || "……"}
              </b>
            </>
          )}
          , permanent resident of{" "}
          <b>{form.values?.applicant_permanent_address}</b>, has the following
          relationship with the under mentioned persons.
        </Text>

        <Space h=".1in" />

        <Text
          style={{
            textAlign: "justify",
          }}
          {...propsText}
        >
          This certificate is issued according to the{" "}
          <b>{form.values?.signature_issued_act_relationship}</b>
        </Text>

        <Space h=".12in" />

        <table className={classes.table}>
          <thead>
            <tr>
              <th style={{ width: ".4in" }}>
                <Text lh={lh} fw={600}>
                  S. N.
                </Text>
              </th>
              <th style={{ width: "1.8in" }}>
                <Text lh={lh} fw={600}>
                  Name
                </Text>
              </th>
              <th style={{ width: "2in" }}>
                <Text lh={lh} fw={600}>
                  Citizenship Certificate Number
                </Text>
              </th>
              <th style={{ width: "1.65in" }}>
                <Text lh={lh} fw={600}>
                  Relationship with the Applicant
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 — Applicant (always shown) */}
            <tr>
              <td style={{ textAlign: "center" }}>
                <Text lh={lh}>1.</Text>
              </td>
              <td>
                <Text lh={lh}>
                  {form.values?.applicant_honorific}{" "}
                  {form.values?.applicant_name}
                </Text>
              </td>
              <td>
                <Text lh={lh}>{form.values?.applicant_citizenship}</Text>
              </td>
              <td>
                <Text lh={lh}>Applicant</Text>
              </td>
            </tr>

            {/* Row 2 — Father */}
            {form.values?.applicant_father_name &&
              form.values?.applicant_father_honorific !== "Late" && (
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <Text lh={lh}>2.</Text>
                  </td>
                  <td>
                    <Text lh={lh}>
                      {form.values?.applicant_father_honorific}{" "}
                      {form.values?.applicant_father_name}
                    </Text>
                  </td>
                  <td></td>
                  <td>
                    <Text lh={lh}>Applicant&#39;s Father</Text>
                  </td>
                </tr>
              )}

            {/* Row 3 (or 2) — Mother */}
            {form.values?.applicant_mother_name &&
              form.values?.applicant_mother_honorific !== "Late" && (
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <Text lh={lh}>
                      {form.values?.applicant_father_name &&
                      form.values?.applicant_father_honorific !== "Late"
                        ? "3."
                        : "2."}
                    </Text>
                  </td>
                  <td>
                    <Text lh={lh}>
                      {form.values?.applicant_mother_honorific}{" "}
                      {form.values?.applicant_mother_name}
                    </Text>
                  </td>
                  <td></td>
                  <td>
                    <Text lh={lh}>Applicant&#39;s Mother</Text>
                  </td>
                </tr>
              )}

            {/* Last row — Extra relation */}
            {form.values?.extra_relation &&
              form.values?.relation_extra_honorific !== "Late" && (
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <Text lh={lh}>
                      {(() => {
                        const fatherShown =
                          !!(
                            form.values?.applicant_father_name &&
                            form.values?.applicant_father_honorific !== "Late"
                          );
                        const motherShown =
                          !!(
                            form.values?.applicant_mother_name &&
                            form.values?.applicant_mother_honorific !== "Late"
                          );
                        return (
                          1 +
                          (fatherShown ? 1 : 0) +
                          (motherShown ? 1 : 0) +
                          1
                        );
                      })()}.
                    </Text>
                  </td>
                  <td>
                    <Text lh={lh}>
                      {form.values?.relation_extra_honorific}{" "}
                      {form.values?.relation_extra_name}
                    </Text>
                  </td>
                  <td></td>
                  <td>
                    <Text lh={lh}>{form.values?.relation_extra_relation}</Text>
                  </td>
                </tr>
              )}
          </tbody>
        </table>

        <Space h=".07in" />

        <Text {...propsText}>
          The photographs of the persons mentioned above are attached below.
        </Text>

        <Space h=".12in" />

        <SimpleGrid
          cols={3}
          mb={
            form.values?.applicant_father_name &&
            form.values?.applicant_father_honorific !== "Late" &&
            form.values?.applicant_mother_name &&
            form.values?.applicant_mother_honorific !== "Late" &&
            form.values?.extra_relation
              ? -90
              : 0
          }
        >
          <div>
            <Center>
              <Paper radius={0} bg="none" h="40mm" w="35mm"></Paper>
            </Center>
            <Text {...propsText} ta="center">
              {form.values?.applicant_honorific} {form.values?.applicant_name}
            </Text>
            <Text {...propsText} ta="center">
              (Applicant)
            </Text>
          </div>
          {form.values?.applicant_father_name &&
            form.values?.applicant_father_honorific !== "Late" && (
              <div>
                <Center>
                  <Paper radius={0} bg="none" h="40mm" w="35mm"></Paper>
                </Center>
                <Text {...propsText} ta="center">
                  {form.values?.applicant_father_honorific}{" "}
                  {form.values?.applicant_father_name}
                </Text>
                <Text {...propsText} ta="center">
                  (Applicant's Father)
                </Text>
              </div>
            )}
          {form.values?.applicant_mother_name &&
            form.values?.applicant_mother_honorific !== "Late" && (
              <div>
                <Center>
                  <Paper radius={0} bg="none" h="40mm" w="35mm"></Paper>
                </Center>
                <Text {...propsText} ta="center">
                  {form.values?.applicant_mother_honorific}{" "}
                  {form.values?.applicant_mother_name}
                </Text>
                <Text {...propsText} ta="center">
                  (Applicant's Mother)
                </Text>
              </div>
            )}

          {form.values?.extra_relation &&
            form.values?.relation_extra_honorific !== "Late" && (
              <div>
                <Center>
                  <Paper radius={0} bg="none" h="40mm" w="35mm"></Paper>
                </Center>
                <Text {...propsText} ta="center">
                  {form.values?.relation_extra_honorific}{" "}
                  {form.values?.relation_extra_name}
                </Text>
                <Text {...propsText} ta="center">
                  ({form.values?.relation_extra_relation})
                </Text>
              </div>
            )}
        </SimpleGrid>

        <Space h=".2in" />

        <Text
          style={{
            textAlign: "justify",
          }}
          {...propsText}
        >
          This letter is issued on the basis of the applicant&#39;s written
          self-declaration, official inquiry and investigation carried out at the
          local level, confirmation by competent witnesses, and in accordance
          with the Section 12 of the Local Government Operation Act, 2074 BS
          (2017 AD).
        </Text>

        <Space h="1.2in" />

        <SimpleGrid cols={2}>
          <div />

          <div
            style={{
              paddingLeft: ".7in",
            }}
          >
            <div
              style={{
                display: "block",
                borderBottom: "2px dotted black",
                width: 200,
                margin: "auto",
              }}
            />

            <Text {...propsText} size="15.4px" fw={600} ta="center" mt=".04in">
              {form.values?.spokesperson_name}
            </Text>
            <Text {...propsText} size="15.4px" fw={600} ta="center">
              {form.values?.spokesperson_post}
            </Text>
            {form.values?.spokesperson_contact && (
              <Text {...propsText} size="15.4px" fw={600} ta="center">
                Contact No.: {form.values?.spokesperson_contact}
              </Text>
            )}
          </div>
        </SimpleGrid>
      </Paper>
    </>
  );
}
