import './styles.css';

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <a href="link" className="admin-nav-item active">
            <p>Edifícios</p>
          </a>
        </li>
        <li>
          <a href="link" className="admin-nav-item">
            <p>Anomalias</p>
          </a>
        </li>
        <li>
          <a href="link" className="admin-nav-item">
            <p>Utilizadores</p>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
