import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import EdificioFilter, { EdificioFilterData } from 'components/EdificioFilter';
import EdificioCrudCard from 'pages/Admin/Edificios/EdificioCrudCard';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edificio } from 'types/edificio';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';

import './styles.css';

/**
 * É necessário criar 2 componentes (filhos - filtro e paginação) de controlo nesta página, a parte da paginação e a parte dos filtros
 * para por sua vez controlarem a listagem e o que consta na mesma.
 * Para facilitar a comunicação entre estes 3 componentes, procedemos a uma refatoração antes de aplicar os filtros
 * Assim, vamos querer manter um novo estado, para guardar os dados desses componentes que controlam a listagem.
 * Então criámos o type abaixo - dados dos componentes de controlo. Que vem tanto do componente Pagination e do
 *
 * Depois criámos o useState que mantem o estado dos dados de todos os componentes q fazem algum controlo da listagem.
 * Quando disparar o evento onChange do Pagination,ao invés de chamar o Pagination, que por sua vez chamaria o getEdificio,
 * chama antes um numero referente à pagina ativa (q vem do estado original), através da função handlePageChange.
 *
 * o type ControlComponentsData serve para definir o tipo do nosso estado inicial do nosso componente que armazena os dados dos componentes
 * de controlo, que são o da Pagination e ainda os do Filtro.
 */

type ControlComponentsData = {
  activePage: number;
  filterData: EdificioFilterData;
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Edificio>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { nome: '', anomalia: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  /**
   * Ao efetuar um filtro, queremos voltar pra 1a pagina - então definimos o activePage pra 0
   */
  const handleSubmitFilter = (data: EdificioFilterData) => {
    setControlComponentsData({
      activePage: 0,
      filterData: data,
    });
  };

  /**
   * Na requisição, o getEdificios recebe a página do BE, ao fazer o Get, e passa como parâmetro o numero de página.
   * Permitirá disparar o evento onChange na mudança de página.
   * No useEffect, disparado aquando o render da página, o getEdificios já fornece então a página.
   *
   * Para evitar loop infinito, temos que usar o hook useCallback, que guarda e verifica se a referencia nas dependencias é a mesma,
   * caso seja, não roda novamente
   */
  const getEdificios = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/edificios',
      params: {
        page: controlComponentsData.activePage,
        size: 3,
        name: controlComponentsData.filterData.nome,
        anomaliaId: controlComponentsData.filterData.anomalia?.id,
      },
    };

    requestBackend(config).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  /**
   * o método para requisição ao BE, passou também para este useEffect, pois quando o componente é montado, a lógica de requisição é executada
   * e busca a página 0 por padrão, salva-a para o estado do componente (setPage) e tem a dependência que "observa" quando ocorrem mudanças
   * no activePage (acima) e efetua o refresh
   */
  useEffect(() => {
    getEdificios();
  }, [getEdificios]);

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
        <EdificioFilter onSubmitFilter={handleSubmitFilter} />
      </div>
      <div className="row">
        {page?.content.map((edificio) => (
          <div key={edificio.id} className="col-sm-6 col-md-12">
            <EdificioCrudCard edificio={edificio} onDelete={getEdificios} />
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

/**
 * no onChange, dentro do Pagination acima, estamos "apenas" a passar a referência da funação getEdificios,
 * pois recebe um número e não retorna nada, contemplando a assinatura da função definida no Props no componente Pagination
 * e na sua configuração, no Pagination, já foi chamada passando o argumento e, assim, só precisamos agora de passar a referência da mesma.
 */

export default List;
