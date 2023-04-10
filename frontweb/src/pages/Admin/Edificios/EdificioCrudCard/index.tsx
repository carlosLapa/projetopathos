import ResumoCard from 'components/ResumoCard';
import { Edificio } from 'types/edificio';
import AnomaliaBadge from '../AnomaliaBadge';
import { Link } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

import './styles.css';

/**
 * No Props acrescentámos mais uma prop, que consiste no evento onDelete, que consiste numa função.
 * Depois, estando assim disponível, podemos chamá-la na função onde for pertinente, neste caso será no 
 * pedido ao backend, requestBackend(), para que, sempre que seja apagado um Edificio, 
 * o componente List "saiba" que o evento ocorreu, pois está a ser !observado! (uma vez que a função está inscrita nesse mesmo componente) 
 * e então atualiza e renderiza o novo estado da lista, aquando a função getEdificios é chamada ao BE.
 */
type Props = {
  edificio: Edificio;
  onDelete: Function;
};

const EdificioCrudCard = ({ edificio, onDelete }: Props) => {
  const handleDelete = (edificioId: number) => {

    /**
     * Janela de confirmação antes de apagar. Se for falso, interrompemos o método e não apaga
     */
    if (!window.confirm("Tem certeza que deseja apagar?")) {
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/edificios/${edificioId}`,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      onDelete();
    });
  };

  return (
    <div className="base-card edificio-crud-card">
      <div className="edificio-crud-card-top-container">
        <img src={edificio.imgUrl} alt={edificio.name} />
      </div>
      <div className="edificio-crud-card-description">
        <div className="edificio-crud-card-bottom-container">
          <h6>{edificio.name}</h6>
          <ResumoCard descricao={edificio.tipologia} />
        </div>
        <div className="edificio-crud-anomalia-container">
          {edificio.anomalias.map((anomalia) => (
            <AnomaliaBadge tipologia={anomalia.tipologia} key={anomalia.id} />
          ))}
        </div>
      </div>
      <div className="edificio-crud-card-buttons-container">
        <button 
        onClick={() => handleDelete(edificio.id)}
        className="btn btn-outline-danger edificio-crud-card-button edificio-crud-card-button-first">
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
