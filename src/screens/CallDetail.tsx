import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCallActivity } from '../query';
import { callActivityType } from '../types';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import LoaderIcon from '../assets/icons/LoaderIcon';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';

const CallDetail = () => {
  const params = useParams();
  const navigator = useNavigate();

  const {
    data: callDetail,
    isSuccess,
    isLoading,
  } = useQuery<callActivityType>({
    queryKey: ['activity', params.id],
    queryFn: () => getCallActivity(params.id!),
  });

  return (
    <main className='h-[100svh] p-6 bg-[#f8f8fe] flex flex-col justify-between'>
      {/* // ? top section */}
      <section>
        <button
          onClick={() => navigator(-1)}
          className='rounded-full p-2 border px-4 flex items-center gap-1'>
          <ChevronLeftIcon className='h-3' />
          Back
        </button>

        {isLoading && (
          <LoaderIcon className='h-6 animate-spin mt-4 self-center w-full' />
        )}

        {isSuccess && (
          <div className='rounded-xl bg-[#e4e4f8] p-4 flex flex-col items-center gap-3 mt-4'>
            <div className='rounded-full h-24 w-24 overflow-hidden'>
              <img
                src='https://randomuser.me/api/portraits/lego/1.jpg'
                alt='user image'
              />
            </div>
            <span className='font-bold text-2xl text-[#4F5B98]'>
              {callDetail.from}
            </span>
          </div>
        )}
      </section>

      {/* // ? bottom section */}
      <section className='mt-4'>
        {callDetail?.is_archived ? (
          <button className='p-2 py-4 w-full border border-black rounded-full text-black flex items-center justify-center gap-1'>
            <ArrowPathIcon className='h-4' />
            Unarchive
          </button>
        ) : (
          <button className='p-2 py-4  w-full border border-red-400 rounded-full text-red-400 flex items-center justify-center gap-1'>
            <TrashIcon className='h-4' />
            Archive
          </button>
        )}
      </section>
    </main>
  );
};
export default CallDetail;
