import { Link } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';

import './styles.css';

type FormData = {
  username: string;
  password: string;
};

/*Agora podemos usar os campos do type, que representa os dados do formulário, para parametrizar o useForm
  Depois a função onSubmit vai receber o atributo formData, do tipo FormData.*/

const Login = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  /*na tag do form -> "handleSubmit" will validate your inputs before invoking "onSubmit" */
  /*abaixo, já dentro do form no input -> register your input into the hook by invoking the "register" function */

  /*mb-4 -> "margin-bottom 4" - estilo direto do bootstrap */
  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username')}
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="mb-2">
          <input
            {...register('password')}
            type="password"
            className="form-control base-input "
            placeholder="Password"
            name="password"
          />
        </div>
        <Link to="/admin/auth/recover" className="login-link-recover">
          Esqueci a senha
        </Link>
        <div className="login-submit">
          <ButtonIcon text="Efetuar login" />
        </div>
        <div className="signup-container">
          <span className="not-registered">Não está registado?</span>
          <Link to="/admin/auth/register" className="login-link-register">
            REGISTAR
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
