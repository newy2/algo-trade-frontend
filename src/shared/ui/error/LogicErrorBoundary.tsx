import { ReactNode, useEffect } from "react";
import { useToast } from "shared/ui/toast";
import _ from "lodash";

export function LogicErrorBoundary({ children }: { children: ReactNode }) {
  const { addToast } = useToast();

  useEffect(() => {
    const alertErrorMessage = (error?: Error) => {
      console.error(error);
      addToast("error", error?.message || "Unknown Error");
    };

    const defaultErrorHandler = (
      _message: string | Event,
      _source: string | undefined,
      _lineno: number | undefined,
      _colno: number | undefined,
      error: Error | undefined,
    ) => {
      alertErrorMessage(error);
      return true;
    };

    const promiseErrorHandler = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      alertErrorMessage(event.reason);
    };

    window.onerror = _.debounce(defaultErrorHandler, 100, {
      leading: true,
      trailing: false,
    });
    window.addEventListener("unhandledrejection", promiseErrorHandler);

    return () => {
      window.removeEventListener("unhandledrejection", promiseErrorHandler);
    };
  }, [addToast]);

  return children;
}
