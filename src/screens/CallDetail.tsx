import { useParams } from 'react-router-dom';
import BaseLayout from '../layouts';
import { useEffect } from 'react';
import AXIOS from '../helpers/axios';

const CallDetail = () => {
  const params = useParams();

  useEffect(() => {
    AXIOS.get(`/activities/${params.id}`)
      .then((res) => res.data)
      .then((data) => console.log(data));
  }, [params.id]);

  return <BaseLayout>Detail</BaseLayout>;
};
export default CallDetail;
