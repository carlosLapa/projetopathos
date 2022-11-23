import { Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './User';
import PrivateRoute from 'components/PrivateRoute';

import './styles.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <Switch>
          <PrivateRoute path="/admin/edificios">
            <h1>Edificio CRUD</h1>
          </PrivateRoute>
          <PrivateRoute path="/admin/anomalias">
            <h1>Anomalia CRUD</h1>
          </PrivateRoute>
          <PrivateRoute path="/admin/users">
            <Users />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
