import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import List from './List';

const Edificios = () => {
  return (
    /**
     * 1a Rota - de listagem
     * 2a Rota - de formulário/ficha do edificio
     */
    <Switch>
      <Route path="/admin/edificios" exact>
        <List />
      </Route>
      <Route path="/admin/edificios/:edificioId">
        <Form />
      </Route>
    </Switch>
  );
};

export default Edificios;
