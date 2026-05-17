import { AxiosResponse } from "axios";
import { ReactNode } from "react";

type typeSubmitProp = {
  valueIgnore?: any[];
  keyIgnore?: any[];
  stringify?: boolean;
};

type testProps = {};

export type propFormHandler = {
  // core
  type?: "new" | "edit";
  editType?: "post" | "patch";

  initial?: {};
  validation?: any[];

  // steps
  steps?: string[];
  stepType?: string;
  stepClickable?: boolean;
  initialStep?: number;

  //transform
  transformOnSubmit?: (data: any) => {};

  // pre-submit
  submitFormData?: boolean;

  // api
  apiSubmit?: (body: any, id?: any) => Promise<AxiosResponse<any, any>> | any;
  apiGet?: () => void;
  saveDraft: boolean;
  submitProps?: typeSubmitProp;

  // post-submit
  handleSuccess?: (res: any) => any;
  handleError?: (res: any) => any;

  preventResetOnSubmit?: boolean;

  // misc

  // func

  // transform

  //variants

  //test
  testProps?: testProps;

  // *

  children: ReactNode;

  notificationProps?: any;
};
