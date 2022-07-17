import React from 'react';

// Router
import { useParams } from 'react-router-dom';

// Helper
import Error from '../helper/Error';
import Loading from '../helper/Loading';

// Components
import PhotoContent from './PhotoContent';

// APi
import { PHOTO_GET } from '../../api';

// Hooks
import useFetch from '../../Hooks/useFecth';

const Photo = () => {
  const { id } = useParams();

  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    async function callPhoto() {
      const { url, options } = PHOTO_GET(id);
      await request(url, options);
    }
    callPhoto();
  }, [request, id]);

  if (error) return <Error />;
  if (loading) return <Loading />;
  if (data) return <PhotoContent single={true} id={id} />;
};

export default Photo;
