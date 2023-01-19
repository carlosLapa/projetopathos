import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import EdificioCrudCard from 'pages/Admin/Edificios/EdificioCrudCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edificio } from 'types/edificio';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

const List = () => {
  const [page, setPage] = useState<SpringPage<Edificio>>();

  useEffect(() => {
    getEdificios();
  }, []);

  const getEdificios = () => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/edificios',
      params: {
        page: 0,
        size: 20,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  };

  /**
   * No Link abaixo (do botão adicionar/criar, no form temos que diferenciar entre a rota para criar e para editar)
   * A palavra "create" casa com a rota :/edificioId, temos somente que diferenciar posteriormente
   */

  /**
   * Padrão de projetos Observer - a função onDelete()
   */
  return (
    <div className="edificio-crud-container">
      <div className="edificio-crud-bar-container">
        <Link to="/admin/edificios/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR / CRIAR
          </button>
        </Link>
        <div className="base-card edificio-filter-container">Search bar</div>
      </div>
      <div className="row">
        {page?.content.map((edificio) => (
          <div key={edificio.id} className="col-sm-6 col-md-12">
            <EdificioCrudCard
              edificio={edificio}
              onDelete={() => getEdificios()}
            />
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default List;
