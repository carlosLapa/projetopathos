import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
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
                Repositório de informação sobre abordagens, tratamentos e
                aplicação de materiais, relativas a patologias na construção
              </p>
            </div>
            <div>
              <Link to="/patologias">
                <ButtonIcon text="Iniciar busca"/>
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
