import { createContext, ReactElement } from "react";

type ModalContextType = typeof defaultContextAction;

const defaultContextAction = {
  pushModal: (content: ReactElement, isBackgroundClose?: boolean): void => {
    throw Error(
      `[push] useModal should be used within ModalProvider (type: ${content}, message: ${isBackgroundClose})`,
    );
  },
  popModal: (): void => {
    throw Error("[pop] useModal should be used within ModalProvider");
  },
};

export const ModalContext =
  createContext<ModalContextType>(defaultContextAction);
