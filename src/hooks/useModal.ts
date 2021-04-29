import { useRef, useCallback, useMemo, useEffect } from "react";
import Modal, { ModalParameters } from "@eightfeet/modal";

const useModal = (parameters: ModalParameters) => {
  const ref = useRef<Modal>();
  useMemo(() => {
    ref.current = new Modal(parameters);
  }, [parameters]);

  useEffect(() => {
    return () => {
      if (ref.current) {
        const previousModal = ref.current;
        if (document.getElementById(previousModal.state.id as string)) {
          previousModal.remove();
        }
      }
    }
  }, [])

  const createModal = useCallback<Modal['create']>((data) => {
    return ref.current?.create(data) || Promise.reject('modal is not ready yet!');
  }, []);

  const hideModal = useCallback<Modal["hide"]>((doNotRemove) => {
    return ref.current?.hide(doNotRemove) || Promise.reject('modal is not ready yet!');
  }, []);

  return { createModal, hideModal, modal: ref.current }
};

export default useModal;

