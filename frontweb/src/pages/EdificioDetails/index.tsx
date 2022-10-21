import { ReactComponent as ArrowIcon } from 'assets/images/arrow.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edificio } from 'types/edificio';
import { BASE_URL } from 'utils/requests';

import './styles.css';

const EdificioDetails = () => {
  const [edificio, setEdificio] = useState<Edificio>();

  /*
  Chamada de API assíncrona -> ou seja, dispara enquanto a app roda e só num momento posterior chegará a resposta dessa requisição
  Como controlamos a chegada da requisição? Através de uma Promise, neste caso .then
  Esse ".then", executa algo ao receber a requisição. Pode ser uma função, ou uma expressão lambda.
  Definimos então um argumento com um determinado nome, normalmente será "response" para implementar uma expressão lambda neste caso,
  e depois escrevemos o que queremos executar.

  React Hooks -> Depois, é necessário controlar os momentos em que a chamada e a sequente cadeia de comandos/funções executam.
  que vão permitir guardar o estado do "edificio" (em memória) e depois utilizamos conforme a necessidade.

  useState -> Para armazenar o estado de um componente (ver acima)
  Será uma constante com 2 elementos, onde recebemos o estado e onde atualizamos o valor do mesmo e onde parametrizamos o tipo do estado (Edificio)
  Depois utilizamos na response abaixo para atualizar.

  useEffect -> 2 argumentos. 1 função para executar (quando o componente for montado/renderizado) e 1 lista de dependencias 
  (lista de objetos que queremos observar, quando é alterada, a função roda novamente - nova renderização)
  */

  useEffect(() => {
    axios.get(BASE_URL + '/edificios/2')
    .then((response) => {
      setEdificio(response.data);
    });
  }, []);

  return (
    <div className="edificio-details-container">
      <div className="base-card edificio-details-card">
        <Link to="/edificios">
          <div className="go-back-container">
            <ArrowIcon />
            <h2>Voltar</h2>
          </div>
        </Link>
        <div className="row">
          <div className="col-xl-6">
            <div className="img-container">
              <img
                src={edificio?.imgUrl}
                alt={edificio?.nome}
              />
            </div>
            <div className="name-typology-container">
              <h1>{edificio?.nome}</h1>
              <h3>{edificio?.tipologia}</h3>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="description-container">
              <h2>{edificio?.localizacao}</h2>
              <p>
              <h2>{edificio?.utilizacao}</h2>

              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdificioDetails;
