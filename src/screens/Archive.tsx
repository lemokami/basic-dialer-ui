import BaseLayout from '../layouts';
import { callActivityType } from '../types';
import CallElement from '../components/CallElement';
import { unArchiveAllCalls, getArchivedCallActivities } from '../query';
import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const Archive = () => {
  const [expandedCallId, setExpandedCallId] = useState<string>('');
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
      <div className='rounded-full bg-[#f0f0f8] p-2 border w-full'>
        <MagnifyingGlassIcon className='h-6 text-[#9ba0bc]' />
      </div>
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

        {isLoading && <StarIcon className='h-6 animate-spin mt-4' />}

        {isSuccess &&
          callData.map((call) => (
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
