import React from 'react';

// Api
import { PASSWORD_LOST } from '../../api';

// Styles
import stylesGlobal from '../../App.module.scss';
import styles from './LoginLost.module.scss';

// Components
import Input from '../tagComponents/Input';
import Button from '../tagComponents/Button';
import Label from '../tagComponents/Label';

// Hooks
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFecth';

const LoginLost = () => {
  const login = useForm('default');

  const { data, loading, request } = useFetch();

  const replaceURL = window.location.href.replace('lost', 'reset');

  async function sendEmail() {
    const { url, options } = PASSWORD_LOST({
      login: login.value,
      url: replaceURL,
    });
    await request(url, options);
  }

  const verify = login.value === '';

  return (
    <section className={styles.container}>
      <h1 className={stylesGlobal.title}>Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: 'green' }}> {data}</p>
      ) : (
        <form>
          <Label>Email / Usuário</Label>
          <Input className={styles.input} {...login} />

          <Button paramOnClick={sendEmail} loading={loading} disabled={verify}>
            Enviar Email
          </Button>
        </form>
      )}
    </section>
  );
};

export default LoginLost;
