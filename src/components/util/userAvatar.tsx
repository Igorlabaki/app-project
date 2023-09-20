import Image from 'next/image';
import { BiUserCircle } from 'react-icons/bi';

type UserAvatarProps = {
  avatar: string;
};

export const UserAvatarComponent = ({ avatar }: UserAvatarProps) => {
  if (!avatar) {
    return (
      <BiUserCircle
        size={35}
        className={''}
      />
    );
  }

  return (
    <Image
      src={avatar}
      width={30}
      height={30}
      alt="user-avatar"
      className={`rounded-full`}
    />
  );
};
