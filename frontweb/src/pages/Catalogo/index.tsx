import axios from 'axios';
import EdificioCard from 'components/EdificioCard';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edificio } from 'types/edificio';
import { AxiosParams } from 'types/vendor/axios';
import { SpringPage } from 'types/vendor/spring';
import { BASE_URL } from 'utils/requests';

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

  useEffect(() => {
    const params: AxiosParams = {
      method: 'GET',
      url: `${BASE_URL}/edificios`,
      params: {
        page: 0,
        size: 12,
      },
    };

    axios(params).then((response) => {
      setPage(response.data);
      console.log(page);
    });
  }, []);

/* Renderizar dinamicamente os cards do edificio
Através do "page" (que é uma SpringPage do tipo EDIFICIO), temos acesso ao atributo "content", que contém a lista de edificios

Quando o "page" tem o "?", é quando o "useState" está indefinido, ou seja, ainda não existe ou pode não ser retornado aquando a requisição
A repetição de cada <div> é feita através da função de alta ordem "map". 

Percorre a lista e faz uma operação em cada elemento da mesma. Tem uma função que pega um elemento da lista (x ou neste caso, edificio)
e faz algo com o mesmo. No corpo da função colocamos o jsx (tudo o que está dentro da <div>).

Quando renderizamos uma coleção/array de elementos, é exigência do react colocar em cada elemento, o atributo "key", que tem q possuir um valor único, 
para cada elemento a renderizar, de modo a evitar a repetição. Assim colocamos o id de cada edificio. 
*/
  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Edifícios intervencionados</h1>
      </div>

      <div className="row">
        {page?.content.map((edificio) => {
          return (
            <div className="col-sm-6 col-lg-4 col-xl-6" key={edificio.id}>
              <Link to="edificios/1">
                <EdificioCard edificio={edificio} />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="row">
        <Pagination />
      </div>
    </div>
  );
};

export default Catalogo;
