import './styles.css';

import ResumoCard from 'components/ResumoCard';
import { Edificio } from 'types/edificio';
import AnomaliaBadge from '../AnomaliaBadge';

type Props = {
  edificio: Edificio;
};

const EdificioCrudCard = ({ edificio }: Props) => {
  return (
    <div className="base-card edificio-crud-card">
      <div className="edificio-crud-card-top-container">
        <img src={edificio.imgUrl} alt={edificio.nome} />
      </div>
      <div className="edificio-crud-card-description">
        <div className="edificio-crud-card-bottom-container">
          <h6>{edificio.nome}</h6>
          <ResumoCard descricao={edificio.tipologia} />
        </div>
        <div className="edificio-crud-card-anomalia-container">
          {edificio.anomalias.map((anomalia) => (
            <AnomaliaBadge name={anomalia.descricao} key={anomalia.id} />
          ))}
        </div>
      </div>
      <div className="edificio-crud-card-buttons-container">
        <button className="btn btn-outline-danger edificio-crud-card-button edificio-crud-card-button-first">EXCLUIR</button>
        <button className="btn btn-outline-secondary edificio-crud-card-button">EDITAR</button>
      </div>
    </div>
  );
};

export default EdificioCrudCard;
