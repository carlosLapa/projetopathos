import { Link } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { requestBackendLogin } from 'utils/requests';

import './styles.css';
import { useState } from 'react';

type FormData = {
  username: string;
  password: string;
};

/*Agora podemos usar os campos do type, que representa os dados do formulário, para parametrizar o useForm
  Depois a função onSubmit vai receber o atributo formData, do tipo FormData.
  Para o login propriamente dito, podemos utilizar esse tipo tb, dado que temos os mesmos atributos,

  Assim, na função onSubmit, chamamos a função "requestBackendLogin" (folder -> utils -> requests) e passamos como argumento o formData
  Sendo uma promise, implementamos a estrutura habitual .then e .catch
  */

const Login = () => {
  /* useState, para renderização condicional de erro de preenchimento */

  /* formState (desestruturado), para controlar o comportamento de validação do formulário. Como a função onde está implementado, 
  o useForm já está parametrizado com a FormData e, portanto, ligado à variável "formData", este vai detetar erros de preenchimento no campo de 
  input apropriados para cada um desses atributos. Depois ainda podemos usar o atributo "message" para fazer display da mensagem que definimos
  no "required"  
  */

  const [hasError, setHasError] = useState(false);

  const { register, handleSubmit, formState: { errors }, } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        setHasError(false);
        console.log('SUCESSO', response);
      })
      .catch((error) => {
        setHasError(true);
        console.log('ERRO');
      });
    console.log(formData);
  };

  /*Na tag do form -> "handleSubmit" will validate your inputs before invoking "onSubmit" */
  /*Baixo, já dentro do form no input -> register your input into the hook by invoking the "register" function */

  /*mb-4 -> "margin-bottom 4" - estilo direto do bootstrap */
  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      {hasError && <div className="alert alert-danger">Erro de Login!</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('username', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
              }
            })}
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-2">
          <input
            {...register('password', {
              required: 'Campo obrigatório',
            })}
            type="password"
            className="form-control base-input "
            placeholder="Password"
            name="password"
          />
          <div className="invalid-feedback d-block">
            {errors.password?.message}
          </div>
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
