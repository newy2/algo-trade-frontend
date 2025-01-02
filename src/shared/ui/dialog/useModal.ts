import { useContext } from "react";
import { ModalContext } from "./ModalContext";

export function useModal() {
  const { pushModal } = useContext(ModalContext);
  return { pushModal };
}
