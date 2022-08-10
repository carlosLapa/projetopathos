import './styles.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md bg-primary main-nav">
      <div className="container-fluid">
        <a href="link" className="nav-logo-text">
          <h4>Repositório de Patologias</h4>
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav offset-md-2 main-menu">
            <li>
              <a href="link" className="active">HOME</a>
            </li>
            <li>
              <a href="link">PATOLOGIAS</a>
            </li>
            <li>
              <a href="link">EXEMPLOS</a>
            </li>
            <li>
              <a href="link">ADMIN</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
