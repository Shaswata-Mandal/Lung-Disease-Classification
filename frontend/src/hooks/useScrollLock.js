import { useEffect } from 'react';

/**
 * Locks document scroll when `locked` is true.
 * Restores scroll position exactly on unlock.
 */
export default function useScrollLock(locked) {

  useEffect(() => {

    if (!locked) return;

    const scrollY = window.scrollY;

    const original = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {

      document.body.style.overflow = original.overflow;
      document.body.style.position = original.position;
      document.body.style.top = original.top;
      document.body.style.width = original.width;
      window.scrollTo(0, scrollY);

    };

  }, [locked]);
  
}
