import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'util/requests';

type Props = {
  children: React.ReactNode;
  path: string;
};

/*
Componente que devolve um Route, do router-dom, que por sua vez contém o path e 
o render, função que testa se está autenticado, se sim, renderiza os children, se não, redireciona para o login 
*/
const PrivateRoute = ({ children, path }: Props) => {
  return (
    <Route
      path={path}
      render={() =>
        isAuthenticated() ? <>{children}</> : <Redirect to="/admin/auth/login" />
      }
    />
  );
};

export default PrivateRoute;
