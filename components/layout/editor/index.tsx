"use client";

import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
//mantine
import { LoadingOverlay } from "@mantine/core";
//contexts
import { ContextEditor } from "./editor.context";
import { LayoutEditorContainer } from "./editor";
//components
import { FormHandler } from "@/components/framework/FormHandler";

import { jwtDecode } from "jwt-decode";

export function LayoutEditor({ children }: PropsWithChildren) {
  // * DEFINITIONS

  const Query: any = useSearchParams();
  const Router = useRouter();

  // * STATES

  const formProps: any = {
    // > FORM INITIALS
    initial: {
      occupations: [],
      fiscal: [],
      statements: [],
      workedStatements: [],
      statement_start_date: new Date(),
      statement_end_date: new Date(),
      applicant_father_honorific: "Mr.",
      applicant_mother_honorific: "Mrs.",
      fiscalyears: [],
    },
    validation: [],
    // > FORM PROPS
    //type : "edit"

    // > STEPPER

    stepType: "step",
    stepclickable: false,
    initialStep: 0,

    // > TRANSFORM

    submitProps: {
      keyIgnore: ["type"],
      valueIgnore: ["asdfa"],
      stringify: false,
    },

    // > SUBMIT

    apiGet: () => {
      return true;
    },
    saveDraft: true,

    // > MISC
    submitFormData: false,
    preventResetOnSubmit: true,

    // > TEST
    testProps: {
      enableConsole: true,
    },

    // > NOTIFICATION
    notificationProps: {
      success: {
        title: "Changes Updated",
        message: "Your changes have been applied successfully.",
      },
    },
  };

  // * CONTEXTS

  const { state, dispatch } = useContext(ContextEditor.Context);

  // * PRELOADS

  // * FUNCTIONS

  useEffect(() => {
    const token: any = sessionStorage.getItem("doctoken");

    if (token) {
      try {
        jwtDecode(sessionStorage.getItem("doctoken") || "");
      } catch (err) {
        Router.push("/");
      }
    } else {
      Router.push("/");
    }
  }, []);

  // * COMPONENTS

  return (
    <>
      <ContextEditor.Provider>
        <FormHandler
          {...formProps}
          handleSuccess={async ({ formdata, form }) => {
            const calculateIndivBalance = (id: any) => {
              let balance = formdata?.statements_opening_bal;

              for (const [index, item] of formdata?.statements
                .slice(0, id + 1)
                .entries()) {
                balance += item.credit - item.debit;
              }

              return balance;
            };

            const calculateDebit = () => {
              let debit = 0;
              for (const [index, item] of formdata?.statements
                .slice(0, formdata?.statements.length + 1)
                .entries()) {
                debit += item.debit || 0;
              }

              return debit;
            };

            const calculateCredit = () => {
              let credit = 0;

              for (const [index, item] of formdata?.statements
                .slice(0, formdata?.statements.length + 1)
                .entries()) {
                credit += item.credit || 0;
              }

              return credit;
            };

            function roundHalfToEven(num: any) {
              const factor = Math.pow(10, 2);
              return Math.round(num * factor) / factor;
            }

            const _totalBalance =
              calculateIndivBalance(formdata.statements.length) || 0;

            console.log(_totalBalance);

            const _reStatements = formdata.statements.map(
              (item: any, index: number) => {
                return {
                  ...item,
                  formView: Query.get("type") != "ReadOnly",
                  balance: roundHalfToEven(
                    calculateIndivBalance(index) || 0
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
                  credit:
                    item.credit == 0
                      ? ""
                      : roundHalfToEven(item.credit).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }),
                  debit:
                    item.debit == 0
                      ? ""
                      : roundHalfToEven(item.debit).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }),
                };
              }
            );

            form.setValues({
              workedStatements: [
                ..._reStatements,
                {
                  description: "Closing Balance",
                  date: formdata?.statement_end_date,
                  code: "",
                  credit: 0,
                  debit: 0,
                  balance: _totalBalance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }),
                },
              ],
              statement_balance_total_number: _totalBalance,
              statement_balance_total: _totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              statement_total_balance: _totalBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),

              statement_credit_total: (calculateCredit() || 0).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              ),
              statement_debit_total: (calculateDebit() || 0).toLocaleString(
                undefined,
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              ),
            });
          }}
        >
          <LayoutEditorContainer>{children}</LayoutEditorContainer>
        </FormHandler>
      </ContextEditor.Provider>
    </>
  );
}
