import { ReactNode } from 'react';

import { ButtonComponent } from './button';

interface WarningProps {
  text: string;
  title: string;
  bgColor: string;
  textColor: string;
  button: ReactNode;
}

export default function WarningComponent({
  text,
  title,
  button,
  bgColor,
  textColor,
}: WarningProps) {
  return (
    <div
      className={`flex flex-col md:flex-row md:justify-between md:items-center gap-y-4 p-4 mb-4 text-sm ${textColor} rounded-lg ${bgColor}  dark:bg-gray-800 dark:text-red-400 w-full shadow-lg`}
      role="alert"
    >
      <div className="flex flex-col gap-2">
        <h1 className="font-medium">{title}</h1>
        <p>{text}</p>
      </div>
      {button}
    </div>
  );
}
