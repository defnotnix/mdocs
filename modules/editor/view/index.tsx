"use client";

import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
//next
import { useParams, usePathname } from "next/navigation";
//mantine
import { LoadingOverlay } from "@mantine/core";
//context
import { ContextEditor } from "@/components/layout/editor/editor.context";
//framework
import { FormHandler } from "@/components/framework/FormHandler";
import { ModuleEditorFormWoda } from "../form/woda";
import { ModuleEditorTemplate } from "../template";
import { ModuleEditorFormStatement } from "../form/statement";
import { apiFile } from "@/api/file";
//api

export function ModuleEditorView() {
  // * DEFINITIONS

  const form = FormHandler.useForm();

  // * CONTEXTS

  const { state, dispatch } = useContext(ContextEditor.Context);
  const { formView } = state;
  const Pathname = usePathname();
  const Params: any = useParams();
  const [loading, setLoading] = useState(true);

  // * STATES

  // * PRELOADS

  // * FUNCTIONS

  useEffect(() => {
    if (!state.docinfo?.name) {
      setLoading(true);
      reload();
    } else {
      setLoading(false);
    }
  }, []);

  async function reload() {
    const { template } =
      Params.type == "woda"
        ? await apiFile.woda.get(Params.id)
        : await apiFile.statement.get(Params.id);

    dispatch({
      type: "API_INIT",
      payload: template,
    });

    form.setValues({
      ...template?.details,
      applicant_dob: template?.details?.applicant_dob
        ? new Date(template?.details?.applicant_dob)
        : undefined,
      statement_start_date: template?.details?.statement_start_date
        ? new Date(template?.details?.statement_start_date)
        : undefined,
      statement_end_date: template?.details?.statement_end_date
        ? new Date(template?.details?.statement_end_date)
        : undefined,
      statements: template?.details?.statements.map((item: any) => {
        return {
          ...item,
          date: new Date(item.date),
        };
      }),
      statements_opening_date: template?.details?.statements_opening_date
        ? new Date(template?.details?.statements_opening_date)
        : undefined,
      wodadoc_date: template?.details?.wodadoc_date
        ? new Date(template?.details?.wodadoc_date)
        : undefined,
      rate_date: template?.details?.rate_date
        ? new Date(template?.details?.rate_date)
        : undefined,
      migration_date: template?.details?.migration_date
        ? new Date(template?.details?.migration_date)
        : undefined,
      address_name_change_date: template?.details?.address_name_change_date
        ? new Date(template?.details?.address_name_change_date)
        : undefined,
    });

    setLoading(false);
  }

  // * COMPONENTS

  if (loading) {
    return (
      <>
        <LoadingOverlay visible={true} />
      </>
    );
  }

  if (formView && Pathname.includes("/woda")) {
    return <ModuleEditorFormWoda />;
  }

  if (formView && Pathname.includes("/statement")) {
    return <ModuleEditorFormStatement />;
  }

  return (
    <>
      <ModuleEditorTemplate />
    </>
  );
}
