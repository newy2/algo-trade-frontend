import React, { ReactElement, ReactNode, useMemo, useState } from "react";
import { ModalContext } from "./ModalContext";
import _ from "lodash";

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ReactElement[]>([]);

  const actualContextActions = useMemo(
    () => ({
      pushModal: (modal: ReactElement) => {
        setModals((prev) => {
          const nextStack = [...prev];
          nextStack.push(React.cloneElement(modal, { key: Date.now() }));
          return nextStack;
        });
      },
      popModal: () => {
        setModals((prev) => {
          const nextStack = [...prev];
          nextStack.pop();
          return nextStack;
        });
      },
    }),
    [],
  );

  return (
    <ModalContext.Provider value={actualContextActions}>
      {children}
      {_.last(modals)}
    </ModalContext.Provider>
  );
}
