import { useEffect, useRef, useCallback } from "react";
import Loading, { LoadingParameters } from "@eightfeet/loading";

const useLoading = (parameters: LoadingParameters) => {
  const ref = useRef<Loading>();
  useEffect(() => {
    ref.current = new Loading(parameters);
    return () => {
      if (ref.current) {
        const previousLoading = ref.current;
        if (document.getElementById(previousLoading.id as string)) {
          previousLoading.destory();
        }
      }
    }
  }, [parameters]);

  const showLoading = useCallback<Loading['show']>(() => {
    return ref.current?.show();
  }, []);

  const hideLoading = useCallback<Loading["hide"]>(() => {
    return ref.current?.hide();
  }, []);

  return { showLoading, hideLoading }
};

export default useLoading;
