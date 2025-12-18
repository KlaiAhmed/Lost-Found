import { useEffect } from 'react';

type Props = {
  ref: React.RefObject<HTMLElement>;
  onClickOutside: () => void;
}

const useClickOutside = ({ref, onClickOutside}: Props) => {
  useEffect(() => {
    function handler(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onClickOutside]);
}

export default useClickOutside;
