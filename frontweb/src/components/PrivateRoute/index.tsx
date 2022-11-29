import { Redirect, Route } from 'react-router-dom';
import { hasAnyRoles, isAuthenticated, Role } from 'util/requests';

type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[];
};

/**
 * Componente que devolve um Route, do router-dom, que por sua vez contém o path e
 * o render, função que testa se está autenticado, se sim, renderiza os children, se não, redireciona para o login
 *
 * Mas para melhorar a experiencia do utilizador, vamos incrementar o redirect
 * no render, colocamos um argumento, location
 * no redirect, colocamos uma expressão com um objeto
 *
 * Acrescentamos testes para as permissões, do mais restrito para o mais "livre"
 * Testamos então se o user está autenticado (se não, direcciona para o login) e depois caso esteja, 
 * testamos o role que possui (se não, direciona para a pagina geral dos edificios - que todos podem aceder),
 * caso tenha o role (neste admin), renderiza o children.
 * 
 */

const PrivateRoute = ({ children, path, roles = [] }: Props) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: '/admin/auth/login',
              state: { from: location },
            }}
          />
        ) : !hasAnyRoles(roles) ? (
          <Redirect to="/admin/edificios" />
        ) : (
          <>{children}</>
        )
      }
    />
  );
};

export default PrivateRoute;
