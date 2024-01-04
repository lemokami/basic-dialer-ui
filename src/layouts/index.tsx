import {
  ArchiveBoxArrowDownIcon,
  ClockIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import FooterIcon from '../components/FooterIcon';
import { NavLink } from 'react-router-dom';
import { FC, ReactNode } from 'react';

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <div className='min-h-screen bg-[#f8f8fe] p-6'>{children}</div>

      <footer className='sticky bottom-0 p-4 bg-[#1b3692] w-full text-[#f8f8fe]/50 flex gap-2 rounded-t-3xl'>
        <NavLink to='/'>
          {({ isActive }) => (
            <FooterIcon
              name='Recent'
              icon={<ClockIcon className='h-6' />}
              active={isActive}
            />
          )}
        </NavLink>

        <NavLink to='/archive'>
          {({ isActive }) => (
            <FooterIcon
              name='Archive'
              icon={<ArchiveBoxArrowDownIcon className='h-6' />}
              active={isActive}
            />
          )}
        </NavLink>

        <NavLink to='/settings'>
          {({ isActive }) => (
            <FooterIcon
              name='Settings'
              icon={<Cog6ToothIcon className='h-6' />}
              active={isActive}
            />
          )}
        </NavLink>
      </footer>
    </>
  );
};
export default BaseLayout;
