import {
  ArchiveBoxArrowDownIcon,
  ClockIcon,
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
      <div className='bg-[#f8f8fe] p-6 min-h-screen'>{children}</div>

      <footer className='sticky bottom-0 p-3 justify-center  bg-[#eaeaf0] w-full text-black flex gap-6'>
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
      </footer>
    </>
  );
};
export default BaseLayout;
