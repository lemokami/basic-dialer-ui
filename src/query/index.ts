import AXIOS from '../helpers/axios';
import { callActivityType } from '../types';

export const getCallActivities = async () => {
  const res = await AXIOS.get('/activities');
  return res.data;
};

export const getUnArchivedCallActivities = async () => {
  const res = await AXIOS.get('/activities');
  return res.data?.filter(
    (call: callActivityType) =>
      call.from && call.to && call.direction && !call.is_archived
  );
};

export const getArchivedCallActivities = async () => {
  const res = await AXIOS.get('/activities');
  return res.data?.filter(
    (call: callActivityType) =>
      call.from && call.to && call.direction && call.is_archived
  );
};

export const getCallActivity = async (id: string) => {
  const res = await AXIOS.get(`/activities/${id}`);
  return res.data;
};

export const archiveCalls = async (ids: string[] = []) => {
  const res = await Promise.all(
    ids.map((id) => AXIOS.patch(`/activities/${id}`, { is_archived: true }))
  );

  return res;
};

export const unArchiveAllCalls = async () => {
  const res = await AXIOS.patch('/reset');
  return res.data;
};

export const unArchiveCall = async (id: string) => {
  const res = await AXIOS.patch(`/activities/${id}`, { is_archived: false });
  return res.data;
};
