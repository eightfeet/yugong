import { useEffect, useRef, useCallback } from "react";
import Modal, { ModalParameters } from "@eightfeet/modal";

const useModal = (parameters: ModalParameters) => {
  const ref = useRef<Modal>();
  useEffect(() => {
    ref.current = new Modal(parameters);
    return () => {
      if (ref.current) {
        const previousModal = ref.current;
        if (document.getElementById(previousModal.state.id as string)) {
          previousModal.remove();
        }
      }
    }
  }, [parameters]);

  const createModal = useCallback<Modal['create']>((data) => {
    return ref.current?.create(data) || Promise.reject('modal is not ready yet!');
  }, []);

  const hideModal = useCallback<Modal["hide"]>((doNotRemove) => {
    return ref.current?.hide(doNotRemove) || Promise.reject('modal is not ready yet!');
  }, []);

  return { createModal, hideModal }
};

export default useModal;

