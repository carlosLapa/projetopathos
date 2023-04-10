import { AxiosRequestConfig } from 'axios';
import { Anomalia } from 'types/anomalia';
import { requestBackend } from 'util/requests';

import './styles.css';
import ResumoCard from 'components/ResumoCard';
import { Link } from 'react-router-dom';

type Props = {
  anomalia: Anomalia;
  onDelete: Function;
};

const AnomaliaCrudCard = ({ anomalia, onDelete }: Props) => {
  const handleDelete = (anomaliaId: number) => {
    /**
     * Janela de confirmação antes de apagar. Se for falso, interrompemos o método e não apaga
     */
    if (!window.confirm('Tem certeza que deseja apagar?')) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/anomalias/${anomaliaId}`,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      onDelete();
    });
  };

  return (
    <div className="base-card edificio-crud-card">
      <div className="edificio-crud-card-top-container">
        <img src={anomalia.img} alt="Imagem" />
      </div>
      <div className="edificio-crud-card-description">
        <div className="edificio-crud-card-bottom-container">
          <h6>{anomalia.tipologia}</h6>
          <hr></hr>
          <ResumoCard descricao={anomalia.descricao} />
        </div>
      </div>
      <div className="edificio-crud-card-buttons-container">
        <button
          onClick={() => handleDelete(anomalia.id)}
          className="btn btn-outline-danger edificio-crud-card-button edificio-crud-card-button-first"
        >
          EXCLUIR
        </button>
        <Link to={`/admin/anomalias/${anomalia.id}`}>
          <button className="btn btn-outline-secondary edificio-crud-card-button">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AnomaliaCrudCard;
