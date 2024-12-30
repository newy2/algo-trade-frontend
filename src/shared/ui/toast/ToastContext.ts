import { createContext } from "react";

export type ToastType = "success" | "error";
type ToastContextType = typeof defaultContextAction;

const defaultContextAction = {
  addToast: (type: ToastType, message: string): void => {
    throw Error(
      `useToast should be used within ToastProvider (type: ${type}, message: ${message})`,
    );
  },
};

export const ToastContext =
  createContext<ToastContextType>(defaultContextAction);
