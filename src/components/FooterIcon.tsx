import { FC, ReactNode } from 'react';

interface FooterIconProps {
  name: string;
  icon: ReactNode;
  active?: boolean;
}

const FooterIcon: FC<FooterIconProps> = ({ name, icon, active = false }) => {
  return (
    <div
      className={`flex flex-col gap-0.5 items-center rounded-full p-2 px-5 text-black`}>
      <span
        className={`p-1 px-4 rounded-full ${
          active ? 'bg-black/10' : 'bg-transparent'
        }`}>
        {icon}
      </span>
      <span className='text-xs'>{name}</span>
    </div>
  );
};
export default FooterIcon;
