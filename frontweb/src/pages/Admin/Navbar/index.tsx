import { NavLink } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <NavLink to="/admin/edificios" className="admin-nav-item ">
            <p>Edifícios</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/anomalias" className="admin-nav-item">
            <p>Anomalias</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className="admin-nav-item">
            <p>Utilizadores</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
