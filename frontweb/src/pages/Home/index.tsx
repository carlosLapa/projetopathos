import { ReactComponent as MainImage } from 'assets/images/homepage.svg';
import ButtonIcon from 'components/ButtonIcon';
import { Link } from 'react-router-dom';
import { hasAnyRoles } from 'util/requests';
import './styles.css';

const Home = () => {
  return (
    <>
      <div className="home-container">
        <h1>Resultado = {hasAnyRoles(['ROLE_ADMIN']) ? 'sim' : 'não'}</h1>
        <div className="base-card home-card">
          <div className="home-content-container">
            <div>
              <h1>Patologias na construção</h1>
              <p>
                Repositório de informação sobre as causas, abordagens, aplicação
                de materiais e tratamento.
              </p>
            </div>
            <div>
              <Link to="/edificios">
                <ButtonIcon text="Iniciar busca" />
              </Link>
            </div>
          </div>
          <div className="home-image-container">
            <MainImage />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
