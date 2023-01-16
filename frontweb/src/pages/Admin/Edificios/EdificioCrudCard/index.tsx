import './styles.css';

import ResumoCard from 'components/ResumoCard';
import { Edificio } from 'types/edificio';
import AnomaliaBadge from '../AnomaliaBadge';
import { Link } from 'react-router-dom';

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
        <div className="edificio-crud-anomalia-container">
          {edificio.anomalias.map((anomalia) => (
            <AnomaliaBadge descricao={anomalia.descricao} key={anomalia.id} />
          ))}
        </div>
      </div>
      <div className="edificio-crud-card-buttons-container">
        <button className="btn btn-outline-danger edificio-crud-card-button edificio-crud-card-button-first">
          EXCLUIR
        </button>
        <Link to={`/admin/edificios/${edificio.id}`}>
          <button className="btn btn-outline-secondary edificio-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EdificioCrudCard;
