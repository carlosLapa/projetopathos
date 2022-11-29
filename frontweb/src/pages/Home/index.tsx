import { ReactComponent as MainImage } from 'assets/images/homepage.svg';
import ButtonIcon from 'components/ButtonIcon';
import { Link } from 'react-router-dom';

import './styles.css';

const Home = () => {
  return (
    <>
      <div className="home-container">
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
