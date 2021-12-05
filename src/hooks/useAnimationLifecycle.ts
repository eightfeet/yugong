import { useCallback, useEffect, useRef, useState } from 'react';
import { AppDataElementsStyleTypes } from '~/types/appData';

export const useAnimationLifecycle = () => {
  const [isInView, setIsInView] = useState<boolean>();

  const [animation, setAnimation] = useState<AppDataElementsStyleTypes>();

  useEffect(() => {
    console.log(111);
  }, [isInView]);
};
