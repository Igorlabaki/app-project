'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { TbLogout } from 'react-icons/tb';

import { ModalComponent } from '@/components/util/modal';

export const DashBoardMenuHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <span>
      <IoIosArrowDown
        size={15}
        className={`${isModalOpen ? 'rotate-180' : 'rotate-0'} duration-300 cursor-pointer`}
        onClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <ModalComponent
          onClose={handleCloseModal}
          styleInternal="top-10 overflow-hidden right-0 rounded-b-md rounded-tl-md"
          styleExternal="bg-transparet absolute"
        >
          <div className="flex justify-center items-center">
            <div
              onClick={() => {
                signOut();
              }}
              className="hover:bg-blue-50 text-sm cursor-pointer px-3 py-2 flex justify-between items-center gap-x-2"
            >
              <TbLogout size={17} />
              <p>Logout</p>
            </div>
          </div>
        </ModalComponent>
      )}
    </span>
  );
};
