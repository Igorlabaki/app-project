import { UpdatePasswordForm } from './updatePasswordForm';

import { NextAuthLogoComponent } from '@/components/util/nextAuthLogo';

interface UpdatePasswordProps {
  id: string;
}

export default function UpdatePasswordComponent({ id }: UpdatePasswordProps) {
  return (
    <div
      className="
    w-[90%] md:w-[400px]
    shadow-2xl rounded-md bg-gray-100
    py-5 px-4 md:px-10  border-[2px] border-gray-400
    flex flex-col justify-start items-center gap-5"
    >
      <NextAuthLogoComponent />
      <UpdatePasswordForm id={id} />
    </div>
  );
}
