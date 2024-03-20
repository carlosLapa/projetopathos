import { AxiosRequestConfig } from 'axios';
import EdificioCard from 'components/EdificioCard';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edificio } from 'types/edificio';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import CardLoader from './CardLoader';

import './styles.css';

const Catalogo = () => {

  
  /*
  useState para a paginação de edificios, que armazena a página q chega do Backend, e que depois vai preencher a tela e depois poder atualizá-la;
  A SpringPage <T> do tipo genérico (criada na pasta "vendor"), que terá uma lista [], que neste caso vai receber o tipo Edificio, permite "casar"
  a info que nos chega do Backend, com a info que vamos tratar e mostrar no Frontend;

  useEffect para efetuar a requisição somente quando entramos na página, com 2 argumentos:
  a função, com o AxiosParams, que recebem o metodo, url e queryParams. A data aqui, como é um método GET, não tem corpo (além de que está como opcional, ?)
  e ainda as dependencias []
  !Cuidado na questão da dependência [] no final da response. Pois, cada vez que é detetada uma mudança na page, a requisição é efetuada novamente
  o que pode dar azo a um ciclo infinito! Então por enquanto deixamos vazia.

  depois a requisição axios já chama os params definidos anteriormente.
  */
  const [page, setPage] = useState<SpringPage<Edificio>>();

  /*
  Estado - boleano - que define se está a carregar uma renderização de algum elemento, ou não. Neste caso os loaders da página de edificios.
  Não tem parâmetros, apenas o valor inicial do isLoading (boolean false), significando que não está a carregar aquando da montagem do componente e 
  antes da requisição. 
  Também antes da requisição do axios (requestBackend()), mudamos o estado (true), para dizer que está a carregar.
  O "finally" executa uma função depois que resolver a "promise". Neste caso, vai alterar novamente o setIsLoading para "false", para o estado
  em que não está a carregar.
  */

  const [isLoading, setIsLoading] = useState(false);

  const getEdificios = (pageNumber: number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/edificios',
      params: {
        page: pageNumber,
        size: 6,
      },
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getEdificios(0);
  }, []);

  /* Renderizar dinamicamente os cards do edificio
Através do "page" (que, neste caso, é uma SpringPage do tipo EDIFICIO), temos acesso ao atributo "content", que contém a lista de edificios

Quando o "page" tem o "?", é quando o "useState" está indefinido, ou seja, ainda não existe ou pode não ser retornado aquando a requisição
A repetição de cada <div> é feita através da função de alta ordem "map". 

Percorre a lista e faz uma operação em cada elemento da mesma. Tem uma função que pega um elemento da lista (x ou neste caso, edificio)
e faz algo com o mesmo. No corpo da função colocamos o jsx (tudo o que está dentro da <div>).

Quando renderizamos uma coleção/array de elementos, é exigência do react colocar em cada elemento, o atributo "key", que tem q possuir um valor único, 
para cada elemento a renderizar, de modo a evitar a repetição. Assim colocamos o id de cada edificio. 

Aplicamos uma renderização condicional ternária para renderizar a página de edificios.
*/
  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Edifícios intervencionados</h1>
      </div>

      <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content.map((edificio) => {
            return (
              <div className="col-sm-6 col-lg-4 col-xl-6" key={edificio.id}>
                <Link to={`/edificios/${edificio.id}`}>
                  <EdificioCard edificio={edificio} />
                </Link>
              </div>
            );
          })
        )}
      </div>

      <div className="row">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={getEdificios}
        />
      </div>
    </div>
  );
};

export default Catalogo;
