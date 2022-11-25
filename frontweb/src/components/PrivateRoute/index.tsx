import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'util/requests';

type Props = {
  children: React.ReactNode;
  path: string;
};

/** 
 * Componente que devolve um Route, do router-dom, que por sua vez contém o path e 
 * o render, função que testa se está autenticado, se sim, renderiza os children, se não, redireciona para o login 
 * 
 * Mas para melhorar a experiencia do utilizador, vamos incrementar o redirect
 * no render, colocamos um argumento, location
 * no redirect, colocamos uma expressão com um objeto 
*/

const PrivateRoute = ({ children, path }: Props) => {
  return (
    <Route
      path={path}
      render={({location}) =>
        isAuthenticated() ? <>{children}</> : <Redirect to={{
          pathname: "/admin/auth/login",
          state: {from: location}
        }} />
      }
    />
  );
};

export default PrivateRoute;
