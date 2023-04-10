import { Route, Switch } from 'react-router-dom';
import List from './List';

const Anomalias = () => {
  return (
    /**
     * 1a Rota - de listagem
     * 2a Rota - de formulário/ficha do edificio
     */
    <Switch>
      <Route path="/admin/anomalias" exact>
      <List />
      </Route>
      <Route path="/admin/anomalias/:anomaliaId">
        Formulário
      </Route>
    </Switch>
  );
};

export default Anomalias;