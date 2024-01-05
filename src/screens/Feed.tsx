import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline';
import CallElement from '../components/CallElement';
import BaseLayout from '../layouts';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveCalls, getUnArchivedCallActivities } from '../query';
import { callActivityType } from '../types';
import { useState } from 'react';

const Feed = () => {
  const [expandedCallId, setExpandedCallId] = useState<string>('');
  const queryClient = useQueryClient();
  const {
    data: callData,
    isSuccess,
    isLoading,
  } = useQuery<callActivityType[]>({
    queryKey: ['activities/unarchived'],
    queryFn: getUnArchivedCallActivities,
  });

  const archiveCallMutation = useMutation({
    mutationFn: async () =>
      await archiveCalls(callData?.map((call) => call.id)),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['activities/unarchived'],
      });
    },
  });

  const handleArchiveCall = () => {
    archiveCallMutation.mutate();
  };

  return (
    <BaseLayout>
      {/* // ? top bar */}
      <div className='rounded-full bg-[#f0f0f8] p-2 border'>
        <MagnifyingGlassIcon className='h-6 text-[#9ba0bc]' />
      </div>
      {/* // ? end of top bar */}

      {/* // ? feed */}
      <div className='flex flex-col gap-2 mt-8'>
        <div className='flex items-center justify-between text-sm'>
          <span className='font-semibold text-[#9ba0bc]'>
            Calls ({callData?.length || 0}){' '}
          </span>
          <button
            onClick={handleArchiveCall}
            className='p-2 px-4 rounded-full border'>
            archive all
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
export default Feed;
