import { ReactNode } from "react";

export type propModalFormHandler =
  | {
      variant: "new";
      size?: string | number;
      sizes?: any[];
      target?: JSX.Element;
      formProps: any;
      title?: string;
      children: ReactNode;
      modalOpened?: boolean;
      modalHandler?: any;
      preData?: any;
      hideStepper?: boolean;
    }
  | {
      variant: "edit";
      size?: string | number;
      sizes?: any[];
      target: JSX.Element;
      formProps: any;
      title?: string;
      children: ReactNode;
      modalOpened: boolean;
      modalHandler: any;
      preData?: any;
      hideStepper?: boolean;
    };
