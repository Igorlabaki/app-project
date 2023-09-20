'use client';

import { twMerge } from 'tailwind-merge';

export interface PropsNewModal {
  onClose: () => void;
  styleExternal?: string;
  styleInternal?: string;
  children: React.ReactNode;
}

export function ModalComponent({ onClose, children, styleExternal, styleInternal }: PropsNewModal) {
  const handleOutsideClick = (e: any) => {
    if (e.target.id != 'internal_modal') {
      onClose();
    }
  };

  return (
    <div
      aria-hidden="true"
      id={'modal-root'}
      onClick={(e) => handleOutsideClick(e)}
      className={`${
        styleExternal ? styleExternal : 'bg-black/40'
      } flex justify-center items-center  w-screen h-screen fixed top-0 right-0 z-40 `}
    >
      <div
        id="internal_modal"
        className={twMerge(`absolute z-50 flex justify-start items-start  bg-white`, styleInternal)}
      >
        {children}
      </div>
    </div>
  );
}
