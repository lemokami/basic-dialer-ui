import { FC, ReactNode } from 'react';

interface FooterIconProps {
  name: string;
  icon: ReactNode;
  active?: boolean;
}

const FooterIcon: FC<FooterIconProps> = ({ name, icon, active = false }) => {
  return (
    <div
      className={`flex flex-col items-center rounded-full p-2 px-5 text-white ${
        active ? 'bg-white/20' : 'bg-transparent '
      }`}>
      {icon}
      <span className='text-xs'>{name}</span>
    </div>
  );
};
export default FooterIcon;
