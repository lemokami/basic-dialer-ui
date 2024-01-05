import {
  PhoneArrowDownLeftIcon,
  PhoneArrowUpRightIcon,
  PhoneXMarkIcon,
} from '@heroicons/react/24/solid';
import { FC } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { callActivityType } from '../types';
import FooterIcon from './FooterIcon';
import {
  ArrowPathIcon,
  InformationCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveCalls, unArchiveCall } from '../query';
import VoiceMailIcon from '../assets/icons/VoiceMail';

dayjs.extend(relativeTime);

interface Props extends callActivityType {
  expanded: boolean;
  setExpanded: () => void;
}

const CallElement: FC<Props> = ({
  id,
  call_type,
  from,
  direction,
  duration,
  created_at,
  is_archived,
  expanded = false,
  setExpanded,
}) => {
  const queryClient = useQueryClient();

  const archiveCallMutation = useMutation({
    mutationFn: async () => await archiveCalls([id]),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['activities/unarchived'],
      });
    },
  });

  const unArchiveCallMutation = useMutation({
    mutationFn: async () => await unArchiveCall(id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['activities/archived'],
      });
    },
  });

  const handleArchiveCall = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    archiveCallMutation.mutate();
    e.stopPropagation();
  };

  const handleUnArchiveCall = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    unArchiveCallMutation.mutate();
    e.stopPropagation();
  };

  return (
    <div
      onClick={setExpanded}
      className={`rounded-xl overflow-hidden flex flex-col gap-4 bg-white/50 transition-all cursor-pointer  ${
        expanded ? 'p-4 pb-2' : 'p-3 py-4'
      }`}>
      <div className='rounded-xl flex justify-between'>
        <div className='flex items-start gap-3'>
          {direction == 'inbound' && call_type == 'missed' && (
            <PhoneXMarkIcon className='h-5 text-red-500 mt-1' />
          )}
          {direction == 'inbound' && call_type == 'answered' && (
            <PhoneArrowDownLeftIcon className='h-5 text-green-500 mt-1' />
          )}

          {direction == 'inbound' && call_type == 'voicemail' && (
            <VoiceMailIcon className='h-5 text-green-500 mt-1' />
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

      {expanded && (
        <div className='border-t-2 flex items-center justify-center gap-4'>
          <Link to={`/call/${id}`}>
            <FooterIcon
              icon={<InformationCircleIcon className='h-5' />}
              name='More Info'
            />
          </Link>

          {is_archived ? (
            <button onClick={handleUnArchiveCall}>
              <FooterIcon
                icon={<ArrowPathIcon className='h-5' />}
                name='UnArchive'
              />
            </button>
          ) : (
            <button onClick={handleArchiveCall}>
              <FooterIcon icon={<TrashIcon className='h-5' />} name='Archive' />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default CallElement;
