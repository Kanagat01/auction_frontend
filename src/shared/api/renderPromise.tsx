import { ReactNode, useEffect, useState } from "react";
import { Preloader } from "~/shared/ui";

const CenteredPreloader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <Preloader />
    </div>
  );
};

type Handlers<T, E> = {
  loading?: ReactNode;
  success: ((data: T) => ReactNode) | ReactNode;
  error: ((error: E) => ReactNode) | ReactNode;
};

export function renderPromise<T, E = Error>(
  promiseFn: () => Promise<T>,
  handlers: Handlers<T, E>
) {
  const { loading = <CenteredPreloader />, success, error } = handlers;
  const [state, setState] = useState<{
    loading: boolean;
    data: T | null;
    error: E | null;
  }>({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;
    promiseFn()
      .then((data) => {
        if (isMounted) {
          setTimeout(
            () => setState({ loading: false, data, error: null }),
            1000
          );
        }
      })
      .catch((err: E) => {
        if (isMounted) {
          setState({ loading: false, data: null, error: err });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [promiseFn]);

  if (state.loading) {
    return loading;
  } else if (state.data) {
    return typeof success === "function" ? success(state.data) : success;
  } else {
    if (state.error)
      return typeof error === "function" ? error(state.error) : error;
    else throw Error("Неизвестная ошибка при отправке запроса");
  }
}
