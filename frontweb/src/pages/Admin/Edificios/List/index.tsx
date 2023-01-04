import EdificioCrudCard from 'pages/Admin/Edificios/EdificioCrudCard';
import { Link } from 'react-router-dom';

import './styles.css';

const List = () => {
  const edificio = {
    id: 1,
    localizacao: 'Aveiro',
    tipologia: 'Prédio',
    nome: 'Edificio do Sol',
    utilizacao: 'Habitação',
    arquitetura: 'Moderna',
    piso: 3,
    fracao: '2A',
    imgUrl:
      'https://www.ferreiralapa.com/wp-content/uploads/2021/09/3-1-1024x768.jpg',
    date: '2022-04-14T10:00:00Z',
    createdAt: '2023-01-02T15:12:18.921225Z',
    anomalias: [
      {
        id: 2,
        consequente: 'Não',
        inconsequente: 'Sim',
        date: '2022-04-14T10:00:00Z',
        descricao: 'Não causou patologias',
        edificios: [],
      },
      {
        id: 1,
        consequente: 'Não',
        inconsequente: 'Sim',
        date: '2022-04-14T10:00:00Z',
        descricao: 'Não causou patologias',
        edificios: [],
      },
      {
        id: 3,
        consequente: 'Não',
        inconsequente: 'Sim',
        date: '2022-04-14T10:00:00Z',
        descricao: 'Não causou patologias',
        edificios: [],
      },
    ],
  };

  /**
   * No Link abaixo (do botão adicionar/criar, no form temos que diferenciar entre a rota para criar e para editar)
   * A palavra "create" casa com a rota :/edificioId, temos somente que diferenciar posteriormente
   */
  return (
    <>
      <div className="edificio-crud-bar-container">
        <Link to="/admin/edificios/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR / CRIAR
          </button>
        </Link>
        <div className="base-card edificio-filter-container">Search bar</div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-12">
          <EdificioCrudCard edificio={edificio} />
        </div>
        <div className="col-sm-6 col-md-12">
          <EdificioCrudCard edificio={edificio} />
        </div>
        <div className="col-sm-6 col-md-12">
          <EdificioCrudCard edificio={edificio} />
        </div>
      </div>
    </>
  );
};

export default List;
