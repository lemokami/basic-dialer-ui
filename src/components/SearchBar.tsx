import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';

interface Props {
  searchKey: string;
  setSearchKey: (key: string) => void;
}

const SearchBar: FC<Props> = ({ searchKey, setSearchKey }) => {
  return (
    <div className='rounded-full flex relative bg-[#f0f0f8]  border'>
      <MagnifyingGlassIcon className='h-6 text-[#9ba0bc] absolute top-1/2 -translate-y-1/2 left-2' />
      <input
        type='text'
        className='p-2 rounded-full w-full pl-10 focus:outline-none text-sm text-[#9ba0bc] bg-[#f0f0f8]'
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
    </div>
  );
};
export default SearchBar;
