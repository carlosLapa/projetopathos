import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from 'pages/Home';
import Navbar from 'components/Navbar';
import Admin from 'pages/Admin';
import Catalogo from 'pages/Catalogo';
import EdificioDetails from 'pages/EdificioDetails';

const Routes = () => {
  return (
    <BrowserRouter>
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
        <Redirect from="/admin" to="/admin/edificios" exact />
        <Route path="/admin">
          <Admin />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
