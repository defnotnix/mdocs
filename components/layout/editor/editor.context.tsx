"use client";

import { sign } from "crypto";
import { redirect } from "next/dist/server/api-utils";
import React, { createContext, useReducer, PropsWithChildren } from "react";

const initialState: any = {
  formView: true,
  signatureDrawerOpen: false,
  signatureProps: {
    template: "",
    field: "",
  },
  headerProps: {
    enable: false,
    enableLine: false,
    height: 1,
  },
  docinfo: {},
  details: {
    applicant_honorific: "",
    applicant_name: "",

    applicant_dob_bs: "",
    applicant_permanent_address: "",
    applicant_guardians: [
      {
        name: "",
        relationship: "",
        honorific: "",
      },
      {
        name: "",
        relationship: "",
        honorific: "",
      },
    ],
    applicant_earning_guardian: "",
    applicant_citizenship: "",
    applicant_citizenship_issuer: "",

    // * SPOKESPERSON
    spokesperson_name: "",
    spokesperson_post: "",
    spokesperson_contact: "",

    // * WODA DOC
    wodadoc_refno: "",

    signature_issued_act_relationship: ``,

    // * WODA DOC 2
    occupations: [],

    occupation_note: `
    `,
    pan_status: false,

    // * WODA DOC 3
    applicant_birth_address: "",

    // * WODA DOC 3
    fiscalyears: [[], [], []],
    usd_rate: 1,
    rate_date: [1, "", ""],

    // * WODA DOC 5

    signature_tax: [``],
    tax_clearance_issuer: "",
    tax: 0,

    // * STATEMENTS
    statement_opening_balance: 0,
    statement_total_balance: 0,
    statement_balance_total: 0,
    statement_debit_total: 0,
    statement_credit_total: 0,
    statements: [],
    migration_date: new Date(),
  },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "API_INIT":
      return {
        ...state,
        ...action.payload,
      };

    //* TEMPLATES

    case "SET_TEMPLATES":
      return {
        ...state,
        setinfo: action.payload,
      };

    // * FORM DATA

    // * DOC INFO

    case "SET_DOCINFO":
      return {
        ...state,
        docinfo: action.payload,
      };

    // * HEADER PROPS
    case "UPDATE_HEADER":
      return {
        ...state,
        headerProps: {
          ...state.headerProps,
          ...action.payload,
        },
      };

    // * SIGNATURE

    case "SHOW_SIGNATURE":
      return {
        ...state,
        signatureDrawerOpen: true,
        signatureProps: action.payload,
      };

    case "HIDE_SIGNATURE":
      return {
        ...state,
        signatureDrawerOpen: false,
        signatureProps: { template: "", field: "" },
      };

    // * VIEW

    case "TOGGLE_FORM_VIEW":
      return { ...state, formView: !state.formView };

    case "SHOW_TEMPLATE":
      return { ...state, formView: false, active: action.payload };

    // * DEFAULT

    default:
      return state;
  }
};

const Context = createContext<any>({
  state: initialState,
  dispatch: redirect,
});

const Provider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const ContextEditor = { Context, Provider };
