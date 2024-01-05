import BaseLayout from '../layouts';
import { Link } from 'react-router-dom';
import { callActivityType } from '../types';
import CallElement from '../components/CallElement';
import { UnArchiveAllCalls, getArchivedCallActivities } from '../query';
import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Archive = () => {
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
    mutationFn: UnArchiveAllCalls,
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
            <Link to={`/call/${call.id}`} key={call.id}>
              <CallElement {...call} />
            </Link>
          ))}
      </div>
      {/* // ? end of feed */}
    </BaseLayout>
  );
};
export default Archive;
