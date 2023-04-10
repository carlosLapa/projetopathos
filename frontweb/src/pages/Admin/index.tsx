import { Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './Users';
import PrivateRoute from 'components/PrivateRoute';
import Edificios from './Edificios';

import './styles.css';
import Anomalias from './Anomalias';

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <Switch>
          <PrivateRoute path="/admin/edificios">
            <Edificios />
          </PrivateRoute>
          <PrivateRoute path="/admin/anomalias">
            <Anomalias />
          </PrivateRoute>
          <PrivateRoute path="/admin/users" roles={['ROLE_ADMIN']}>
            <Users />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
