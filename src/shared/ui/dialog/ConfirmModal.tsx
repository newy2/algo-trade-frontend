import React from "react";
import { BaseModal } from "shared/ui/dialog/BaseModal.tsx";

type ConfirmModalProps = {
  children: React.ReactNode;
  isBackgroundClickClose?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
};

export function ConfirmModal({
  children,
  isBackgroundClickClose = true,
  onConfirm = () => {},
  onCancel = () => {},
}: ConfirmModalProps) {
  return (
    <BaseModal
      isBackgroundClickClose={isBackgroundClickClose}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      {children}
      <form method="dialog">
        <div className="modal-action">
          <button className="btn" value="cancel">
            취소
          </button>
          <button className="btn text-primary" value="confirm">
            확인
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
