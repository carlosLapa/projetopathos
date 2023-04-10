import { useCallback, useEffect, useState } from 'react';
import { Anomalia } from 'types/anomalia';
import { SpringPage } from 'types/vendor/spring';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';

import './styles.css';
import { Link } from 'react-router-dom';
import Pagination from 'components/Pagination';
import AnomaliaCrudCard from '../AnomaliaCrudCard';

type ControlComponentsData = {
  activePage: number;
  //filterData: AnomaliaFilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Anomalia>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      //filterData: { name: '', anomalia: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      //filterData: controlComponentsData.filterData,
    });
  };

  const getAnomalias = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/anomalias',
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        //name: controlComponentsData.filterData.name,
        //anomaliaId: controlComponentsData.filterData.anomalia?.id,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getAnomalias();
  }, [getAnomalias]);

  return (
    <div className="anomalia-crud-container">
      <div className="anomalia-crud-bar-container">
        <Link to="/admin/anomalias/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR / CRIAR
          </button>
        </Link>
      </div>
      <div className="row">
        {page?.content.map((anomalia) => (
          <div key={anomalia.id} className="col-sm-6 col-md-12">
            <AnomaliaCrudCard anomalia={anomalia} onDelete={getAnomalias} />
          </div>
        ))}
      </div>
      <Pagination
        forcePage={page?.number}
        pageCount={page ? page.totalPages : 0}
        range={3}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default List;
