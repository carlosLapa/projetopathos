import './styles.css';

import EdificioImg from 'assets/images/edificio.png';
import ResumoCard from 'components/ResumoCard';

const PatologiaCard = () => {
  return (
    <div className="base-card patologia-card">
      <div className="card-top-container">
        <img src={EdificioImg} alt="Patologia" />
      </div>
      <div className="card-bottom-container">
        <h6>Tipo de patologia</h6>
        <p>
          <ResumoCard />
        </p>
      </div>
    </div>
  );
};

export default PatologiaCard;
