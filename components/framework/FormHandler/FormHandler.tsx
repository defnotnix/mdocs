"use client";

import React, { useState } from "react";

//context
import {
  FormProvider,
  useFormContext,
  useForm,
  PropContext,
  usePropContext,
} from "./FormHandler.context";
//type
import { propFormHandler } from "./FormHandler.type";
import { useMutation } from "@tanstack/react-query";

import { triggerNotification } from "@/components/helper/notification";
import { toFormData } from "@/components/helper/toFormData";
//validation
import { zodResolver } from "@mantine/form";
import { z } from "zod";

//styles

export function FormHandler({
  //  CORE ESSENTIALS
  type = "new",
  editType = "post",

  // FORM INITIALS
  initial = {},
  validation = [],

  //  STEPS
  steps = [],
  stepType = "step",
  stepClickable = false,
  initialStep = 0,

  //  TRASNSFORM
  transformOnSubmit = (formdata) => formdata,

  // PRE SUBMIT
  submitFormData = true,

  //  API
  apiSubmit = () => {},
  apiGet = () => {},
  saveDraft = false,
  submitProps = {},

  // POST SUBMIT

  handleSuccess,
  handleError,

  preventResetOnSubmit = false,

  //  MISC

  //  FUNCTIONALITY

  //  VARIANTS

  //  TEST
  testProps = {
    enableConsole: false,
  },

  //  CHILD

  children,

  notificationProps,
}: propFormHandler) {
  // * DEFINITION

  const [current, setCurrent] = useState(0);

  const form = useForm({
    mode: "controlled",
    initialValues: initial,
    validate:
      validation.length > 0
        ? zodResolver(z.object(validation[current]))
        : undefined,
  });

  // * CONTEXTS

  // * STATES

  // * QUERY

  // * PRE LOADING

  // * FUNCTION

  // > MUTATION

  const mutationSubmit = useMutation({
    mutationFn: async (mutationdata) => {
      const _dataToProcess = transformOnSubmit(form.values);
      const _formdata = submitFormData
        ? await toFormData({
            values: _dataToProcess,
            ...submitProps,
            hasDirtCheck: form.values._dirtcheck !== null,
          })
        : _dataToProcess;

      return apiSubmit(_formdata, form.values.id);
    },
    onSuccess: (res: any) => {
      triggerNotification.Form.isSuccess({
        title: notificationProps?.success?.title,
        message: notificationProps?.success?.message,
      });
      // initialization

      if (!preventResetOnSubmit) {
        form.setValues(undefined);
      }

      setCurrent(0);
      // handleSubmit
      if (handleSuccess) {
        handleSuccess(
          type == "edit"
            ? form.values
            : {
                res: res,
                formdata: form.values,
                form: form,
              }
        );
      }
    },
    onError: (err: any) => {
      let errObject = err.object?.response?.data;

      switch (errObject.type) {
        case "Validation Error":
          form.setErrors(errObject);
          triggerNotification.Form.isError({
            title: "Whoops! Hold on a Moment 🖐️",
            message:
              "It seems some fields are missing or incorrect. Please review and resubmit.",
          });
      }

      if (handleError) {
        handleError(err);
      }
    },
  });

  // > VALIDATION

  const checkValidity = async () => {
    const hasErrors = form.validate().hasErrors;

    return {
      err: hasErrors,
      errObj: hasErrors ? form.errors : null,
    };
  };

  // > STEPS

  const handleStepNext = async () => {
    const hasErrors = await checkValidity();

    if (hasErrors.err) {
      triggerNotification.Form.isValidationStepError();
    } else {
      setCurrent(current + 1);
    }
  };

  const handleStepBack = () => {
    setCurrent(current - 1);
  };

  // > SUBMIT

  const handleSubmit = async () => {
    const { err, errObj } = await checkValidity();
    // > Trigger Notification
    triggerNotification.Form.isLoading();
    if (err) {
      // > IN-HOUSE VALIDATION ERROR
      triggerNotification.Form.isValidationError();
    } else {
      // > API CALL
      switch (type) {
        case "new":
          onCreate();
          break;
        case "edit":
          editType == "post" ? onEditPost() : onEditPatch();
          break;
        default:
          console.error("Invalid prop type received for FormContainer 'type'");
          break;
      }
    }
  };

  const onCreate = async () => {
    mutationSubmit.mutate();
  };

  const onEditPost = async () => {
    mutationSubmit.mutate();
  };

  const onEditPatch = async () => {
    mutationSubmit.mutate();
  };

  const onDraftSave = async () => {};

  const handleReset = async () => {
    setCurrent(0);
    form.reset();
  };

  return (
    <>
      <FormProvider form={form}>
        <PropContext.Provider
          value={{
            current,
            handleSubmit,
            steps,
            stepClickable,
            initialStep,
            handleStepBack,
            handleStepNext,
            handleReset,
          }}
        >
          <form
            onSubmit={(e: any) => {
              e.preventDefault();
            }}
          >
            {children}
          </form>
        </PropContext.Provider>
      </FormProvider>
    </>
  );
}

FormHandler.useForm = useFormContext;
FormHandler.usePropContext = usePropContext;
