import React, { useCallback, useContext, useEffect, useRef } from "react";
import { ModalContext } from "shared/ui/dialog/ModalContext.ts";

type BaseModalProps = {
  children: React.ReactNode;
  isBackgroundClickClose?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function BaseModal({
  children,
  isBackgroundClickClose = false,
  onConfirm = () => {},
  onCancel = () => {},
}: BaseModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { popModal } = useContext(ModalContext);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const onClose = useCallback(() => {
    const closeAction = dialogRef.current?.returnValue || "cancel";

    if (closeAction === "cancel") {
      onCancel();
    } else {
      onConfirm();
    }

    popModal();
  }, [onCancel, onConfirm, popModal]);

  const onEscKeyCancel = useCallback(
    (event: React.KeyboardEvent<HTMLDialogElement>) => {
      if (!isBackgroundClickClose && event.key === "Escape") {
        event.preventDefault();
      }
    },
    [isBackgroundClickClose],
  );

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClose={onClose}
      onKeyDown={onEscKeyCancel}
    >
      <div className="modal-box">{children}</div>
      {isBackgroundClickClose && (
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      )}
    </dialog>
  );
}
