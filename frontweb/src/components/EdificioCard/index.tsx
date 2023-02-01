import './styles.css';

import ResumoCard from 'components/ResumoCard';
import { Edificio } from 'types/edificio';

type Props = {
  edificio: Edificio;
};

const EdificioCard = ( { edificio } : Props) => {
  return (
    <div className="base-card patologia-card">
      <div className="card-top-container">
        <img src={edificio.imgUrl} alt={edificio.name} />
      </div>
      <div className="card-bottom-container">
        <h6>{edificio.name}</h6>
        <p>
          <ResumoCard descricao={edificio.tipologia} />
        </p>
      </div>
    </div>
  );
};

export default EdificioCard;
