import {
  PhoneArrowDownLeftIcon,
  PhoneArrowUpRightIcon,
  PhoneXMarkIcon,
} from '@heroicons/react/24/solid';
import { FC } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { callActivityType } from '../types';

dayjs.extend(relativeTime);

interface Props extends callActivityType {}

const CallElement: FC<Props> = ({
  call_type,
  from,
  direction,
  duration,
  created_at,
}) => {
  return (
    <div className='rounded-xl p-5 py-8 flex justify-between bg-white/50'>
      <div className='flex items-start gap-3'>
        {direction == 'inbound' &&
          (call_type == 'missed' || call_type == 'voicemail') && (
            <PhoneXMarkIcon className='h-5 text-red-500 mt-1' />
          )}
        {direction == 'inbound' && call_type == 'answered' && (
          <PhoneArrowDownLeftIcon className='h-5 text-green-500 mt-1' />
        )}

        {direction == 'outbound' && (
          <PhoneArrowUpRightIcon className='h-5 text-green-500 mt-1' />
        )}

        <div className='flex flex-col gap-0.5'>
          <span className='font-bold text-lg text-[#4F5B98]'>{from}</span>
          {direction == 'inbound' && (
            <div className='flex items-center gap-1 text-gray-600 text-sm'>
              {call_type == 'missed' && <span>Missed Call</span>}
              {call_type == 'answered' && <span>Inbound Call</span>}
              {call_type == 'voicemail' && <span>Voicemail</span>}
              <span> - {duration} mins</span>
            </div>
          )}

          {direction == 'outbound' && (
            <>
              <div className='flex items-center gap-1 text-gray-600 text-sm'>
                <span>Outbound Call</span>
                <span> - {duration} mins</span>
              </div>
            </>
          )}
        </div>
      </div>
      <span className='text-sm text-gray-600'>
        {dayjs(created_at).fromNow()}
      </span>
    </div>
  );
};
export default CallElement;
