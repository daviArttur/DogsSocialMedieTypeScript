import React from 'react';

// Router
import { useNavigate } from 'react-router-dom';

// Components
import Label from '../tagComponents/Label';
import Input from '../tagComponents/Input';
import Button from '../tagComponents/Button';

// Hooks
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFecth';

// Helper
import Error from '../helper/Error';

// Api
import { PHOTO_POST } from '../../api';

// Styles
import styles from './UserPhotoPost.module.scss';

const UserPhotoPost = () => {
  const name = useForm('default');
  const weight = useForm('default');
  const age = useForm('default');
  const [img, setImg] = React.useState({});

  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  async function handleSubmit() {
    const validate = (name.validate(), weight.validate(), age.validate());
    if (validate) {
      const token = window.localStorage.getItem('token');

      const formData = new FormData();
      formData.append('img', img.raw);
      formData.append('peso', weight.value);
      formData.append('nome', name.value);
      formData.append('idade', age.value);

      const { url, options } = PHOTO_POST(formData, token);
      const { response } = await request(url, options);
      if (response.ok) navigate('/mypage/feed');
    }
  }

  return (
    <section className={styles.container}>
      <form className={styles.form}>
        <Label forType="name">Nome</Label>
        <Input type="text" id="name" {...name} />

        <Label forType="">Peso</Label>
        <Input type="number" {...weight} />

        <Label forType="">Idade</Label>
        <Input type="number" {...age} />

        <input
          className={styles.inputImg}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />

        <Error error={error}> {error} </Error>

        <Button paramOnClick={handleSubmit} loading={loading}>
          {loading ? 'Carregando...' : 'Enviar'}
        </Button>
      </form>

      <div>
        {img && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${img.preview})` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
