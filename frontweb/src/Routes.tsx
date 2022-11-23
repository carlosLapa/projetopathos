import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import Admin from 'pages/Admin';
import Catalogo from 'pages/Catalogo';
import EdificioDetails from 'pages/EdificioDetails';
import Auth from 'pages/Admin/Auth';
import history from 'util/history';

/*com o Router, juntamente com o argumento "history", permite registar uma forma de fazer redirecionamentos através 
da utilização do arquivo history.ts, criado na folder util  */

const Routes = () => {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/edificios" exact>
          <Catalogo />
        </Route>
        <Route path="/edificios/:edificioId">
          <EdificioDetails />
        </Route>
        <Redirect from="/admin/auth" to="/admin/auth/login" exact />
        <Route path="/admin/auth">
          <Auth />
        </Route>
        <Redirect from="/admin" to="/admin/edificios" exact />
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
