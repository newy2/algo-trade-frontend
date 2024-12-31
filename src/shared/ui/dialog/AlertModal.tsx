import React from "react";
import { BaseModal } from "./BaseModal";

type ConfirmModalProps = {
  children: React.ReactNode;
  isBackgroundClickClose?: boolean;
  onConfirm?: () => void;
};

export function AlertModal({
  children,
  isBackgroundClickClose = false,
  onConfirm = () => {},
}: ConfirmModalProps) {
  return (
    <BaseModal
      isBackgroundClickClose={isBackgroundClickClose}
      onConfirm={onConfirm}
    >
      {children}
      <form method="dialog">
        <div className="modal-action">
          <button className="btn text-primary" value="confirm">
            확인
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
