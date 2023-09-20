import Image from 'next/image';

export const NextAuthLogoComponent = () => {
  return (
    <div className="flex gap-x-2 justify-center items-center">
      <Image
        src={'/assets/auth/next-auth-logo.png'}
        alt="next-auth-logo"
        width={50}
        height={50}
      />
      <div>
        <h1 className="text-[25px] md:text-[35px] font-bold">NextAuth</h1>
        <p className="hidden md:flex text-gray-500 font-[500] text-center text-sm">
          Authentication for Next.js
        </p>
      </div>
    </div>
  );
};
