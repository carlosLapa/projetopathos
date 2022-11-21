import { Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './User';

import './styles.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <Switch>
          <Route path="/admin/edificios">
            <h1>Edificio CRUD</h1>
          </Route>
          <Route path="/admin/anomalias">
            <h1>Anomalia CRUD</h1>
          </Route>
          <Route path="/admin/users">
            <Users />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
