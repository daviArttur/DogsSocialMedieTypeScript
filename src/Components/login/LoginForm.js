import React from 'react';

// Context Api
import { UserContext } from '../../UserContext';

// Styles
import styles from '../../App.module.scss';
import stylesButton from '../tagComponents/Button.module.scss';
import stylesForm from './LoginForm.module.scss';

// Hooks
import useFetch from '../../Hooks/useFecth';
import useForm from '../../Hooks/useForm';

// Router
import { Link } from 'react-router-dom';

// Api
import { TOKEN_POST } from '../../api';

// Helper
import Error from '../helper/Error';

// Components
import Input from '../tagComponents/Input';
import Label from '../tagComponents/Label';
import Button from '../tagComponents/Button';

const LoginForm = () => {
  const { callUser } = React.useContext(UserContext);
  const username = useForm('default');
  const password = useForm('default');

  const { loading, error, request } = useFetch();

  async function handleSubmit() {
    const types = username.validate() && password.validate();

    const values = {
      username: username.value,
      password: password.value,
    };

    if (types) {
      const { url, options } = TOKEN_POST(values);
      const { json } = await request(url, options);
      window.localStorage.setItem('token', json.token);
      callUser(json.token);
    }
  }

  return (
    <div style={{ maxWidth: '480px' }}>
      <section className={styles.form}>
        <h1 className={styles.title}>Login</h1>

        <form className={styles.animeLeft}>
          <Label forType="email">Usuário</Label>
          <Input type="email" id="email" {...username} />
          <Label forType="password">Senha</Label>
          <Input type="password" id="password" {...password} />
          <Button
            style={{ marginTop: '1rem' }}
            paramOnClick={handleSubmit}
            loading={loading}
          >
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>
          <Error error={error}>{error}</Error>
        </form>
      </section>

      <Link to="/login/lost" className={stylesForm.lost}>
        Perdeu a senha?
      </Link>

      <div className={stylesForm.cadastry}>
        <h2 className={stylesForm.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesButton.button} to="/login/cadastry">
          Cadastro
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
