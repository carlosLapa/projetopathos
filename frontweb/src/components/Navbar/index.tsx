import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import history from 'util/history';
import { AuthContext } from 'AuthContext';
import { getTokenData, isAuthenticated } from 'util/auth';
import { removeAuthData } from 'util/storage';

import 'bootstrap/js/src/collapse.js';
import './styles.css';

const Navbar = () => {

  /**Referencia para o contexto global */
  const { authContextData, setAuthContextData } = useContext(AuthContext); 

  /**useEffect para carregar os dados do local storage e alterar, consoante a situação, os estados de autenticação */
  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  /**função "Handler" para definir o que acontece após o Logout 
   *  o preventDefault evita a navegação do link 
   *  o token é removido
   *  o estado de autenticação é definido para false
   *  o método do history, .replace, leva-nos para a rota raíz, a homepage
  */
  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary main-nav">
      <div className="container-fluid">
        <Link to="/" className="nav-logo-text">
          <h4>Ferreira Lapa</h4>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#ferreiralapa-navbar"
          aria-controls="ferreiralapa-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="ferreiralapa-navbar">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <NavLink to="/" activeClassName="active" exact>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/edificios" activeClassName="active">
                EDIFICIOS
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>
        {/* renderização condicional - consoante o estado de autenticação, renderiza o username (email) e o Logout (se true), ou Login (se false)
         *  depois temos o evento "onClick" que recebe a função criada por nós , "handleLogoutClick" */}
        <div className="nav-login-logout">
          {authContextData.authenticated ? (
            <>
              <span className="nav-username">{authContextData.tokenData?.user_name}</span>
              <a href="#logout" onClick={handleLogoutClick}>
                LOGOUT
              </a>
            </>
          ) : (
            <Link to="/admin/auth">LOGIN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
