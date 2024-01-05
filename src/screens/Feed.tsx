import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline';
import CallElement from '../components/CallElement';
import BaseLayout from '../layouts';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveCalls, getUnArchivedCallActivities } from '../query';
import { callActivityType } from '../types';

const Feed = () => {
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
            <Link to={`/call/${call.id}`} key={call.id}>
              <CallElement {...call} />
            </Link>
          ))}
      </div>
      {/* // ? end of feed */}
    </BaseLayout>
  );
};
export default Feed;
