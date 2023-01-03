import './styles.css';

import ResumoCard from 'components/ResumoCard';
import { Edificio } from 'types/edificio';

type Props = {
  edificio: Edificio;
};

const EdificioCrudCard = ( { edificio } : Props) => {
  return (
    <div className="base-card patologia-card">
      <div className="card-top-container">
        <img src={edificio.imgUrl} alt={edificio.nome} />
      </div>
      <div className="card-bottom-container">
        <h6>{edificio.nome}</h6>
        <p>
          <ResumoCard descricao={edificio.tipologia} />
        </p>
      </div>
    </div>
  );
};

export default EdificioCrudCard;
