import { Link } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';

import './styles.css';

/*mb-4 -> "margin-bottom 4" - estilo direto do bootstrap */

const Login = () => {
  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      <form>
        <div className="mb-4">
          <input
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
        </div>
        <div className="mb-2">
          <input
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
