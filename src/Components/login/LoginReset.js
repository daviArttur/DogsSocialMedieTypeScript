import React from 'react';

// Api
import { PASSWORD_RESET } from '../../api';

// Router
import { useNavigate } from 'react-router-dom';

// Helper
import Error from '../helper/Error';

// Components
import Input from '../tagComponents/Input';
import Button from '../tagComponents/Button';
import Label from '../tagComponents/Label';

// Styles
import stylesGlobal from '../../App.module.scss';
import styles from './LoginReset.module.scss';

// Hooks
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFecth';

const LoginReset = () => {
  const [login, setLogin] = React.useState('');
  const [key, setKey] = React.useState('');
  const password = useForm('default');
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
      const { response } = await request(url, options);

      if (response.ok) navigate('/login');
    }
  }

  return (
    <section className={styles.container}>
      <h1 className={stylesGlobal.title}>Resete a Senha</h1>
      <form>
        <Label forType={'password'}>Nova Senha</Label>
        <Input type="password" name="password" id="password" {...password} />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button paramOnClick={handleSubmit}>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
};
export default LoginReset;
