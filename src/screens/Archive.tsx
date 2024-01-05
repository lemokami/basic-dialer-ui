import BaseLayout from '../layouts';
import { callActivityType } from '../types';
import CallElement from '../components/CallElement';
import { unArchiveAllCalls, getArchivedCallActivities } from '../query';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import LoaderIcon from '../assets/icons/LoaderIcon';
import SearchBar from '../components/SearchBar';

const Archive = () => {
  const [expandedCallId, setExpandedCallId] = useState<string>('');
  const [filterKey, setFilterKey] = useState<string>('');
  const queryClient = useQueryClient();

  const {
    data: callData,
    isSuccess,
    isLoading,
  } = useQuery<callActivityType[]>({
    queryKey: ['activities/archived'],
    queryFn: getArchivedCallActivities,
  });

  const unArchiveAll = useMutation({
    mutationFn: unArchiveAllCalls,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['activities/archived'],
      });
    },
  });

  const handleUnArchiveAll = () => {
    unArchiveAll.mutate();
  };

  return (
    <BaseLayout>
      {/* // ? search bar */}
      <SearchBar
        searchKey={filterKey}
        setSearchKey={(key) => setFilterKey(key.trim())}
      />
      {/* // ? end of search bar */}

      {/* // ? feed */}
      <div className='flex flex-col gap-2 mt-8'>
        <div className='flex items-center justify-between text-sm'>
          <span className='font-semibold text-[#9ba0bc]'>
            Calls ({callData?.length || 0}){' '}
          </span>
          <button
            onClick={handleUnArchiveAll}
            className='p-2 px-4 rounded-full border'>
            unarchive all
          </button>
        </div>

        {isLoading && (
          <LoaderIcon className='h-6 animate-spin mt-4 self-center' />
        )}

        {isSuccess &&
          callData
            .filter(
              (item) =>
                filterKey == '' || item.from.toString().includes(filterKey)
            )
            .map((call) => (
              <CallElement
                {...call}
                key={call.id}
                expanded={expandedCallId === call.id}
                setExpanded={() =>
                  setExpandedCallId((id) => (id === call.id ? '' : call.id))
                }
              />
            ))}
      </div>
      {/* // ? end of feed */}
    </BaseLayout>
  );
};
export default Archive;
