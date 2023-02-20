import { useForm } from 'react-hook-form';
import ButtonIcon from 'components/ButtonIcon';
import { requestBackend } from 'util/requests';
import { User } from 'types/user';
import { AxiosRequestConfig } from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import './styles.css';

/**
 * 
 * @returns Precisa de levar um role, o de OPERATOR, ao efetuar o POST!
 * Provavelmente teremos que implementar outro endpoint que não necessite de permissões
 */

const RegisterUser = () => {

  const { register, handleSubmit } = useForm<User>();

  const history = useHistory();

  const onSubmit = (formData : User) => {
    console.log(formData);
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/users',
      data: formData,
      withCredentials: true,
    };

    requestBackend(config)
    .then(() => {
      toast.info('Utilizador registado com sucesso!')
      history.push('/admin/auth/login');
    })
    .catch(() => {
      toast.error('Erro ao registar Utilizador')
      history.push('/admin/auth/login');
    });
  };
 
  return (
    <div className="base-card register-user-card">
      <h1>DADOS PARA REGISTO</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('email')}
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="email"
          />
        </div>
        <div className="mb-4">
          <input
            {...register('password')}
            type="password"
            className="form-control base-input "
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="mb-4">
          <input
            {...register('firstName')}
            type="text"
            className="form-control base-input"
            placeholder="Nome"
            name="firstName"
          />
        </div>
        <div className="mb-4">
          <input
            {...register('lastName')}
            type="text"
            className="form-control base-input"
            placeholder="Apelido"
            name="lastName"
          />
        </div>
        <div className="mb-4">
          <input
            {...register('contact')}
            type="text"
            className="form-control base-input"
            placeholder="Telefone/Telemóvel"
            name="contact"
          />
        </div>
        <div className="login-submit">
          <ButtonIcon text="REGISTAR" />
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
